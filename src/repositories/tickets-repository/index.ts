import { prisma } from "@/config";
import { TicketType, Ticket } from "@prisma/client";
import { func } from "joi";

async function findAllTycketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true
    }
  });
}

const ticketRepository = {
  findAllTycketTypes,
  findTicket
};

export default ticketRepository;
