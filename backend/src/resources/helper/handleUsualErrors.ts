import { Response } from "express";
import { ValidationError } from "yup";
import {
  sendValidationError,
  sendAuthorizationError,
  sendInternalServerError,
} from "./responses";

const handleUsualErrors = (e: any, res: Response) => {
  if (e instanceof ValidationError) {
    return sendValidationError(res, e);
  }

  if (e.name === "NotFoundError") {
    if (e.message === "No Session found") return sendAuthorizationError(res);
  }

  console.log(e);
  return sendInternalServerError(res);
};

export default handleUsualErrors;
