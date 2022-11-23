import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import paymentService from "@/services/payments-service";
import { paymentBodyData } from "@/protocols";
import { validatePaymentQuery, validatePaymentBody } from "@/schemas/payments-schema";
import httpStatus from "http-status";

export async function getTicketPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const userId = req.userId;

  const checkTicketId = validatePaymentQuery(Number(ticketId));

  if (!checkTicketId) {
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

export async function postTicketPayment(req: AuthenticatedRequest, res: Response) {
  const body = req.body as paymentBodyData;
  const userId = req.userId;
    
  const checkBody = validatePaymentBody(body);

  if (!checkBody) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
      
  try {
    const result = await paymentService.postTicketPayment(body, userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.statusText === "UNAUTHORIZED") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
