import {
  headersSchema,
  loginSchema,
  passwordUpdateSchema,
  registerSchema,
  updateRequestSchema,
} from "./helper/user-shemas";
import { Request, Response } from "express";
import sha256 from "crypto-js/sha256";
import { ValidationError } from "yup";
import {
  sendAuthorizationError,
  sendCreatedSuccessfully,
  sendDuplicateError,
  sendInternalServerError,
  sendNotFound,
  sendSuccess,
  sendValidationError,
} from "./helper/responses";
import prisma from "../client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { v4 as uuid } from "uuid";
import { UserDetails } from ".prisma/client";
import handleUsualErrors from "./helper/handleUsualErrors";

export const register = async (req: Request, res: Response) => {
  try {
    const data = await registerSchema.validate(req.body);

    const userId = uuid();

    const t: any = [
      prisma.user.create({
        data: {
          id: userId,
          details: {
            create: { ...data.details },
          },
          credentials: {
            create: {
              email: data.details.email,
              passwordHash: String(sha256(data.password)),
            },
          },
        },
      }),
    ];

    if (data.goals) {
      t.push(
        prisma.userGoals.create({ data: { ...data.goals, userId: userId } })
      );
    }

    await prisma.$transaction(t);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { goals: Boolean(data.goals), details: true, Role: true },
      rejectOnNotFound: true,
    });

    const { id: sessionId } = await prisma.session.create({
      data: { userId: user.id },
    });

    return sendCreatedSuccessfully(res, "User created successfully", {
      sessionId,
      role: user.Role.name,
      user,
    });
  } catch (e: any) {
    if (e instanceof PrismaClientKnownRequestError && e.code === "P2002")
      return sendDuplicateError(res, "User with given email already exists");

    handleUsualErrors(e, res);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const {
      headers: { authorization: sessionId },
      body: data,
    } = await updateRequestSchema.validate(req);

    const { id: userId } = await getUserBySessionId(sessionId);

    await prisma.$transaction(async (prisma) => {
      await prisma.userDetails.update({
        where: { userId: userId },
        data: { ...data.details },
      });

      if (data.goals)
        await prisma.userGoals.upsert({
          where: { userId: userId },
          update: { ...data.goals },
          create: {
            ...data.goals,
            userId: userId,
          },
        });
      // TODO vyresit aby se nemusel email ukladat duplicitne
      if (data.details.email)
        await prisma.userCredentials.update({
          where: { userId: userId },
          data: { email: data.details.email },
        });
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { goals: Boolean(data.goals), details: Boolean(data.details) },
    });
    return sendSuccess(res, "User data successfully updated", user);
  } catch (e: any) {
    if (e instanceof PrismaClientKnownRequestError && e.code === "P2002")
      return sendDuplicateError(res, "User with given email already exists");

    handleUsualErrors(e, res);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );

    const user = await getUserBySessionId(sessionId);
    if (!user.goals) {
      if (!user.details) return sendInternalServerError(res);
      user.goals = { ...calculateGoals(user.details), userId: user.id };
    }

    return sendSuccess(res, "User successfully retreived", user);
  } catch (e: any) {
    handleUsualErrors(e, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { password, email } = await loginSchema.validate(req.body);

    const {
      userId,
      user: {
        Role: { name: roleName },
      },
    } = await prisma.userCredentials.findFirst({
      where: {
        AND: [{ email: email }, { passwordHash: String(sha256(password)) }],
      },
      include: {
        user: {
          include: { Role: true },
        },
      },
      rejectOnNotFound: true,
    });

    const { id: sessionId } = await prisma.session.create({
      data: { userId: userId },
    });

    return sendSuccess(res, "Login successfull", { sessionId, role: roleName });
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      if (e.message === "No UserCredentials found")
        return sendAuthorizationError(res, "Email and password does not match");
    }

    handleUsualErrors(e, res);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );

    await prisma.session.delete({ where: { id: sessionId } });

    return sendSuccess(res, "User logged out successfully", {});
  } catch (e: any) {
    if (e.code === "P2025")
      return sendSuccess(res, "User logged out successfully", {});

    handleUsualErrors(e, res);
  }
};

export async function updatePassword(req: Request, res: Response) {
  try {
    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );
    const { oldPassword, newPassword } = await passwordUpdateSchema.validate(
      req.body
    );

    const { id: userId } = await getUserBySessionId(sessionId);

    const { passwordHash } = await prisma.userCredentials.findUnique({
      where: { userId: userId },
      rejectOnNotFound: true,
    });

    if (passwordHash !== String(sha256(oldPassword)))
      return sendAuthorizationError(res, "Old user password does not match");

    await prisma.userCredentials.update({
      where: { userId: userId },
      data: { passwordHash: String(sha256(newPassword)) },
    });

    return sendSuccess(res, "User password changed successfully", {});
  } catch (e: any) {
    handleUsualErrors(e, res);
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );

    const { id: userId } = await getUserBySessionId(sessionId);

    await prisma.user.delete({ where: { id: userId } });
    return sendSuccess(res, "User deleted successfully", {});
  } catch (e: any) {
    handleUsualErrors(e, res);
  }
};

const calculateGoals = ({
  birthdate,
  weight,
  height,
  sex,
  goalWeight,
}: UserDetails) => {
  const age = Math.floor(
    (new Date().getTime() - new Date(birthdate).getTime()) / 3.15576e10
  );

  let calories: number =
    (10 * weight + 6.25 * height - 5 * age + sex * 166 - 161) * 1.5;

  if (goalWeight - weight > 7) calories += 750;
  else if (goalWeight - weight < -7) calories -= 750;
  else calories += ((goalWeight - weight) / 100) * 750;

  const caloriesWoProtein = calories - 2 * weight * 4;

  return {
    calories: calories,
    proteins: 2 * weight,
    carbs: Math.round((caloriesWoProtein / 4) * 0.7),
    fats: Math.round((caloriesWoProtein / 4) * 0.3),
    fiber: Math.round((weight / 100) * 40),
    salt: 2,
    deleted: null,
  };
};

export const getUserBySessionId = async (sessionId: string | undefined) => {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: { include: { details: true, goals: true, Role: true } } },
    rejectOnNotFound: true,
  });
  return session.user;
};
