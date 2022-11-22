import { notFoundError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

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
const ticketService = {
  listAllTycketTypes,
  getTicket
};

export default ticketService;
