import { Request, Response } from "express";
import { number, object, string, date } from "yup";
import prisma from "../client";
import {
  sendCreatedSuccessfully,
  sendNotFound,
  sendSuccess,
} from "./helper/responses";
import { getUserBySessionId } from "./user";
import { headersSchema } from "./helper/user-shemas";
import handleUsualErrors from "./helper/handleUsualErrors";

const MEAL_TYPES = [
  "breakfast",
  "morningsnack",
  "lunch",
  "afternoonsnack",
  "dinner",
];

const diaryEntrySchema = object({
  foodId: string().required(),
  grams: number().required(),
  date: date().required(),
  mealType: string().required().lowercase().oneOf(MEAL_TYPES),
});

const diaryEntryUpdateSchema = object({
  id: string().required(),
  foodId: string().optional(),
  grams: number().optional(),
  date: date().optional(),
  mealType: string().optional().oneOf(MEAL_TYPES),
});

export const get = async (req: Request, res: Response) => {
  // NOTE date stored in the database in in TZ 0, but our date is in TZ +2
  try {
    const date = new Date(req.params["date"] || "");
    const nextDay = new Date(new Date(date).setDate(date.getDate() + 1));
    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );

    const user = await getUserBySessionId(sessionId);

    const diary = await prisma.diaryEntry.findMany({
      where: {
        AND: [{ userId: user.id }, { date: { gte: date, lt: nextDay } }],
      },
      include: { food: true },
    });

    return sendSuccess(res, "Diary retreived successfully", diary);
  } catch (e: any) {
    handleUsualErrors(e, res);
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const data = await diaryEntrySchema.validate(req.body);

    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );

    const user = await getUserBySessionId(sessionId);

    const diaryEntry = await prisma.diaryEntry.create({
      data: { ...data, userId: user.id },
      include: { food: true },
    });

    return sendCreatedSuccessfully(
      res,
      "Food successfully added to diary",
      diaryEntry
    );
  } catch (e: any) {
    handleUsualErrors(e, res);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await diaryEntryUpdateSchema.validate(req.body);

    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );

    await getUserBySessionId(sessionId);

    await prisma.diaryEntry.update({
      where: { id: data.id },
      data: { ...data },
    });

    const diaryEntry = await prisma.diaryEntry.findUnique({
      where: { id: data.id },
    });

    return sendSuccess(res, "Food successfully added to diary", diaryEntry);
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      if (e.message === "No DiaryEntry found")
        return sendNotFound(res, e.message);
    }

    handleUsualErrors(e, res);
  }
};

export const deleteEntry = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"];
    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );

    await getUserBySessionId(sessionId);

    await prisma.diaryEntry.delete({
      where: { id: id },
    });

    return sendSuccess(res, "Entry successfully deleted from diary", {});
  } catch (e: any) {
    handleUsualErrors(e, res);
  }
};
