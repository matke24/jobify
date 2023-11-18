import { StatusCode } from "../enum/status-code.js";

export class NotFoundError extends Error {
  private statusCode: StatusCode;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = StatusCode.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  private statusCode: StatusCode;
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCode.BAD_REQUEST;
  }
}

export class UnauthenticatedError extends Error {
  private statusCode: StatusCode;
  constructor(message: string) {
    super(message);
    this.name = "UnauthenticatedError";
    this.statusCode = StatusCode.UNAUTHORIZED;
  }
}

export class UnauthorizedError extends Error {
  private statusCode: StatusCode;
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = StatusCode.FORBIDDEN;
  }
}
