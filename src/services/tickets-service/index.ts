import { notFoundError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository, { ticketCreateData } from "@/repositories/tickets-repository";
import { TicketType, TicketStatus } from "@prisma/client";

async function listAllTycketTypes(): Promise<TicketType[]> {
  const result = await ticketRepository.findAllTycketTypes();

  if (!result) {
    throw notFoundError();
  }
    
  return result;
}

async function getTicket(userId: number) {
  //criei uma função no enrollment repository pra me ajudar aqui, espero que n tenha problema
  const checkEnrollment = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!checkEnrollment) {
    throw notFoundError();
  }

  const result = await ticketRepository.findTicket(checkEnrollment.id);

  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function createNewTicket(userId: number, ticketTypeId: number) {
  const checkEnrollment = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!checkEnrollment) {
    throw notFoundError();
  }

  const ticketData: ticketCreateData = {
    ticketTypeId,
    enrollmentId: checkEnrollment.id,
    status: TicketStatus.RESERVED
  };

  await ticketRepository.createTicket(ticketData);

  const result = await ticketRepository.findTicket(checkEnrollment.id);

  return result;
}

export type ticketTypeIdBody = {
  ticketTypeId: number
};

const ticketService = {
  listAllTycketTypes,
  getTicket,
  createNewTicket
};

export default ticketService;
