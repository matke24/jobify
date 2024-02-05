import { StatusCode } from "../enum/index.js";

export interface ErrorType extends Error {
  statusCode: StatusCode;
}
