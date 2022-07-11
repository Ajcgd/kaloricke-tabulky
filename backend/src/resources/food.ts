import { object, string, number, ValidationError } from "yup";
import { Request, Response } from "express";
import prisma from "../client";
import {
  sendAuthorizationError,
  sendCreatedSuccessfully,
  sendDuplicateError,
  sendInternalServerError,
  sendNotFound,
  sendSuccess,
  sendValidationError,
} from "./helper/responses";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { headersSchema } from "./helper/user-shemas";
import { getUserBySessionId } from "./user";
import { Role } from ".prisma/client";

const foodSchema = object({
  name: string().required().trim(),
  description: string().default("Food").trim(),
  calories: number().required().min(0),
  proteins: number().required().min(0),
  carbs: number().required().min(0),
  fats: number().required().min(0),
  fiber: number().required().min(0),
  salt: number().required().min(0),
  imageLink: string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Incorrect image URL"
  ),
});

const foodUpdateSchema = object({
  name: string().optional().trim(),
  description: string().optional().trim(),
  calories: number().optional().min(0),
  proteins: number().optional().min(0),
  carbs: number().optional().min(0),
  fats: number().optional().min(0),
  fiber: number().optional().min(0),
  salt: number().optional().min(0),
  imageLink: string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Incorrect image URL"
  ),
});

const foodIdSchema = string().required().lowercase();

export const store = async (req: Request, res: Response) => {
  try {
    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );

    const user = await getUserBySessionId(sessionId);
    if (!user.Role.canCUDAnyFood && !user.Role.canCUDOwnFood)
      return sendAuthorizationError(res);

    const data = await foodSchema.validate(req.body);

    const food = await prisma.food.create({
      data: { ...data, id: data.name.toLowerCase(), creatorId: user.id },
    });
    return sendCreatedSuccessfully(res, "Food created successfully", food);
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    if (e instanceof PrismaClientKnownRequestError && e.code === "P2002")
      return sendDuplicateError(res, "Food with given name already exists");

    if (e.name === "NotFoundError") {
      if (e.message === "No Session found") return sendAuthorizationError(res);
    }

    console.log(e);
    return sendInternalServerError(res);
  }
};

export const getAll = async (_: Request, res: Response) => {
  try {
    const foods = await prisma.food.findMany({
      where: { deleted: null },
      orderBy: { name: "asc" },
    });
    return sendSuccess(res, "Foods retreived successfully", foods);
  } catch (e) {
    console.log(e);
    return sendInternalServerError(res);
  }
};

export const getById = async (req: Request, res: Response) => {
  const id = req.params["id"]!;
  try {
    const food = await prisma.food.findUnique({
      where: { id: id },
    });
    if (food === null || food.deleted)
      return sendNotFound(res, `Food with id ${id} not found`);

    return sendSuccess(res, "Food retreived successfully", food);
  } catch (e) {
    return sendInternalServerError(res);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const id = await foodIdSchema.validate(req.params["name"]);

    const food = await prisma.food.findFirst({
      where: {
        AND: [{ deleted: null }, { id: id }],
      },
      rejectOnNotFound: true,
    });

    return sendSuccess(res, "Foods retreived successfully", food);
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      if (e.message === "No Food found")
        return sendNotFound(res, "Food not found");
    }

    return sendInternalServerError(res);
  }
};

export const searchByName = async (req: Request, res: Response) => {
  try {
    const partOfId = req.params["name"]!.toLowerCase();

    const foods =
      partOfId === '""'
        ? await prisma.food.findMany({ orderBy: { name: "asc" } })
        : await prisma.food.findMany({
            where: {
              AND: [{ deleted: null }, { id: { contains: partOfId } }],
            },
            orderBy: { name: "asc" },
          });

    return sendSuccess(res, "Foods retreived successfully", foods);
  } catch (e) {
    console.log(e);
    return sendInternalServerError(res);
  }
};

const canUserUpdateAndDeleteFood = async (
  foodId: string,
  userId: string,
  userRole: Role
) => {
  if (userRole.canCUDAnyFood) return true;
  if (userRole.canCUDOwnFood) {
    const { creatorId } = await prisma.food.findUnique({
      where: { id: foodId },
      rejectOnNotFound: true,
    });
    return creatorId === userId;
  }
  return false;
};

export const update = async (req: Request, res: Response) => {
  try {
    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );
    const user = await getUserBySessionId(sessionId);

    const foodId = await foodIdSchema.validate(req.params["name"]);

    if (!(await canUserUpdateAndDeleteFood(foodId, user.id, user.Role)))
      return sendAuthorizationError(res);

    const data = await foodUpdateSchema.validate(req.body);
    const result = await prisma.food.update({
      where: { id: foodId },
      data: { ...data },
    });

    return sendSuccess(res, "Food updated successfully", result);
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    if (e instanceof PrismaClientKnownRequestError && e.code === "P2002")
      return sendDuplicateError(res, "Food with given name already exists");

    if (e.name === "NotFoundError") {
      if (e.message === "No Session found") return sendAuthorizationError(res);
    }

    return sendInternalServerError(res);
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const foodId = await foodIdSchema.validate(req.params["name"]);

    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );
    const user = await getUserBySessionId(sessionId);

    if (!(await canUserUpdateAndDeleteFood(foodId, user.id, user.Role)))
      return sendAuthorizationError(res);

    await prisma.food.delete({
      where: { id: foodId },
    });
    return sendSuccess(res, "Food deleted successfully", {});
  } catch (e: any) {
    if (e.name === "NotFoundError") return sendNotFound(res, "Food not found");

    console.log(e);
    return sendInternalServerError(res);
  }
};
