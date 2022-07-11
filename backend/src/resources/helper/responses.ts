import { Response } from "express";
import { ValidationError } from "yup";

export const sendInternalServerError = (res: Response) => {
  res.status(500).send({
    status: "error",
    data: {},
    message: "Internal server error",
  });
};

export const sendAuthorizationError = (
  res: Response,
  message: string = "User is not authorized to perform this type of action"
) => {
  res.status(401).send({
    status: "error",
    message: message,
    data: {},
  });
};

export const sendValidationError = (res: Response, error: ValidationError) => {
  res.status(400).send({
    status: "error",
    message: "Invalid data",
    data: error.errors,
  });
};

export const sendDuplicateError = (res: Response, message: string) => {
  res.status(409).send({
    status: "error",
    message: message,
    data: {},
  });
};

export const sendSuccess = (res: Response, message: string, data: any) => {
  res.status(200).send({
    status: "success",
    message: message,
    data: data,
  });
};

export const sendNotFound = (res: Response, message: string) => {
  res.status(404).send({
    status: "error",
    message: message,
    data: {},
  });
};

export const sendCreatedSuccessfully = (
  res: Response,
  message: string,
  data: any
) => {
  res.status(201).send({ status: "success", message: message, data: data });
};

export const sendForbidden = (res: Response, message: string) => {
  res.status(403).send({ status: "error", message: message, data: {} });
};
