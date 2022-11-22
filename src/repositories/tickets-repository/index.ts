import { prisma } from "@/config";
import { TicketType, Ticket } from "@prisma/client";

async function findAllTycketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTicketType(ticketTypeId: number): Promise<TicketType> {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId
    }
  });
}

async function findTicket(enrollmentId: number): Promise<Ticket & {
  TicketType: TicketType;
}> {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true
    }
  });
}

async function createTicket(ticketData: ticketCreateData ): Promise<Ticket> {
  return prisma.ticket.create({
    data: ticketData
  });
}

export type ticketCreateData = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

const ticketRepository = {
  findAllTycketTypes,
  findTicket,
  findTicketType,
  createTicket
};

export default ticketRepository;
