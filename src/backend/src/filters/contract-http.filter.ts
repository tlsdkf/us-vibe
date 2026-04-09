import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from "@nestjs/common";
import type { Response } from "express";

@Catch(HttpException)
export class ContractHttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const res = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const payload = exception.getResponse();

    if (this.isContractError(payload)) {
      res.status(status).json({
        code: payload.code,
        message: payload.message
      });
      return;
    }

    const raw =
      typeof payload === "object" && payload !== null && "message" in payload
        ? (payload as { message: unknown }).message
        : payload;
    const message = Array.isArray(raw) ? raw.join("; ") : String(raw);

    res.status(status).json({
      code: `HTTP_${status}`,
      message
    });
  }

  private isContractError(
    payload: string | object
  ): payload is { code: string; message: string } {
    if (typeof payload !== "object" || payload === null) return false;
    const o = payload as Record<string, unknown>;
    return typeof o.code === "string" && typeof o.message === "string";
  }
}
