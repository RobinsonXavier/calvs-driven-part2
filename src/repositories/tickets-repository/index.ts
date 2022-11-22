import { prisma } from "@/config";
import { TicketType, Ticket } from "@prisma/client";
import { func } from "joi";

async function findAllTycketTypes() {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  findAllTycketTypes,
};

export default ticketRepository;
