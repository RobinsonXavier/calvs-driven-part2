import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import ticketService from "@/services/tickets-service";
import httpStatus from "http-status";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketService.listAllTycketTypes();
    console.log(result);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { enrollmentId } = req.query;

  try {
    const result = await ticketService.listAllTycketTypes();
    console.log(result);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
