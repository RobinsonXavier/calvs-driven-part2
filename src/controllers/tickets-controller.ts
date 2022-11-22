import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import ticketService from "@/services/tickets-service";
import httpStatus from "http-status";
import { validateTicketTypeId } from "@/schemas/tickets-schema";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketService.listAllTycketTypes();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const result = await ticketService.getTicket(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const userId = req.userId;

  const checkTicketTypeId = validateTicketTypeId(ticketTypeId);

  if (!checkTicketTypeId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const result = await ticketService.createNewTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
