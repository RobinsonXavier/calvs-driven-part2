import { prisma } from "@/config";
import { TicketType, Ticket, TicketStatus } from "@prisma/client";

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

async function findTicketById(ticketId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId
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

async function updateStatusTicket(status: TicketStatus, ticketId: number): Promise<Ticket> {
  return prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status
    }
  });
}

export type ticketCreateData = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

const ticketRepository = {
  findAllTycketTypes,
  findTicket,
  findTicketType,
  createTicket,
  findTicketById,
  updateStatusTicket
};

export default ticketRepository;
