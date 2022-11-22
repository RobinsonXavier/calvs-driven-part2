import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import paymentService from "@/services/payments-service";
import httpStatus from "http-status";

export async function getTicketPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const userId = req.userId;

  //trocar por Joi
  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
    
  try {
    const result = await paymentService.getTicketPayment(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.statusText === "UNAUTHORIZED") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
