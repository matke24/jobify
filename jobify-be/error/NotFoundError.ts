import { StatusCode } from "../enum/status-code.js";

export class NotFoundError extends Error {
  private statusCode: StatusCode;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCode.NOT_FOUND;
  }
}
