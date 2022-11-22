import { notFoundError, requestError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getTicketPayment(ticketId: number, userId: number) {
  const checkTicket = await ticketRepository.findTicketById(ticketId);

  if (!checkTicket) {
    throw notFoundError();
  }

  const checkEnrollment = await enrollmentRepository.findEnrollmentById(checkTicket.enrollmentId);

  if (checkEnrollment.userId !== userId) {
    throw requestError(401, "UNAUTHORIZED");
  }

  const result = await paymentRepository.findTicketPaymentByTicketId(ticketId);

  if (!result) {
    throw notFoundError();
  }
        
  return result;
}

const paymentService = {
  getTicketPayment
};

export default paymentService;
