import { date, number, object, string } from "yup";

export const detailsSchema = object({
  username: string().required().trim(),
  name: string().required().trim(),
  surname: string().required().trim(),
  height: number().required().positive(),
  weight: number().required().positive(),
  birthdate: date().required().min("1940-01-01"),
  sex: number().required().min(0).max(1),
  email: string().email().required().trim(),
  goalWeight: number().positive().required(),
}).noUnknown(true);

export const detailsUpdateSchema = object({
  username: string().optional().trim(),
  name: string().optional().trim(),
  surname: string().optional().trim(),
  height: number().optional().positive(),
  weight: number().optional().positive(),
  birthdate: date().optional().min("1940-01-01"),
  sex: number().optional().min(0).max(1),
  email: string().email().optional().trim(),
  goalWeight: number().positive().optional(),
}).noUnknown(true);

export const goalsSchema = object({
  calories: number().optional().positive(),
  proteins: number().required().positive(),
  carbs: number().required().positive(),
  fats: number().required().positive(),
  fiber: number().required().positive(),
  salt: number().required().positive(),
})
  .noUnknown(true)
  .strict();
export const goalsUpdateSchema = object({
  calories: number().optional().positive(),
  proteins: number().optional().positive(),
  carbs: number().optional().positive(),
  fats: number().optional().positive(),
  fiber: number().optional().positive(),
  salt: number().optional().positive(),
})
  .noUnknown(true)
  .strict();

export const passwordSchema = string().required();
export const sessionIdSchema = string().required();
export const headersSchema = object({
  authorization: string()
    .required()
    .transform((val, _) => {
      return val.split(" ")[1] || val;
    })
    .test(
      "is valid bearer token",
      `Authorization header does not containt valid bearer token`,
      (val, _) => {
        return !!val;
      }
    ),
});

export const passwordUpdateSchema = object({
  oldPassword: string().required(),
  newPassword: string().required(),
});

export const registerSchema = object({
  password: string().required(),
  details: detailsSchema.required(),
  goals: goalsSchema.optional(),
});

export const updateRequestSchema = object({
  headers: headersSchema.required(),
  body: object({
    details: detailsUpdateSchema.optional(),
    goals: goalsSchema.optional(),
  }),
});

export const loginSchema = object({
  password: string().required(),
  email: string().required(),
});
