import { prisma } from "@/config";

async function findTicketPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

const paymentRepository = {
  findTicketPaymentByTicketId
};

export default paymentRepository;
