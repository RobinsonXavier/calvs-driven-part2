import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findTicketPaymentByTicketId(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

async function createTicketPayment(paymentBody: paymentCreateData): Promise<Payment> {
  return prisma.payment.create({
    data: paymentBody
  });
}

export type paymentCreateData = Omit<Payment, "id" | "createdAt" | "updatedAt">;

const paymentRepository = {
  findTicketPaymentByTicketId,
  createTicketPayment
};

export default paymentRepository;
