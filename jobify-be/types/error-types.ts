import { StatusCode } from "../enum/status-code";

export interface ErrorType extends Error {
  statusCode: StatusCode;
}
