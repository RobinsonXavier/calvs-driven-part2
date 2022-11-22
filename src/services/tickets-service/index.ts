import { notFoundError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";
import ticketRepository from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

async function listAllTycketTypes(): Promise<TicketType[]> {
  const result = await ticketRepository.findAllTycketTypes();

  if (!result) {
    throw notFoundError();
  }
    
  return result;
}

const ticketService = {
  listAllTycketTypes
};

export default ticketService;
