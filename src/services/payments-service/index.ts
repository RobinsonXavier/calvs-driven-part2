import { notFoundError, requestError } from "@/errors";
import paymentRepository, { paymentCreateData } from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { paymentBodyData } from "@/protocols";

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

async function postTicketPayment(body: paymentBodyData, userId: number) {
  const checkTicket = await ticketRepository.findTicketById(body.ticketId);

  if (!checkTicket) {
    throw notFoundError();
  }

  const checkEnrollment = await enrollmentRepository.findEnrollmentById(checkTicket.enrollmentId);

  if (checkEnrollment.userId !== userId) {
    throw requestError(401, "UNAUTHORIZED");
  }

  const ticketType = await ticketRepository.findTicketType(checkTicket.ticketTypeId);

  const lastThree: string = body.cardData.number.toString();
  const lastDigits: string = lastThree.substring(lastThree.length - 4);

  const paymentBody: paymentCreateData = {
    ticketId: body.ticketId,
    value: ticketType.price,
    cardIssuer: body.cardData.issuer,
    cardLastDigits: lastDigits
  };

  await paymentRepository.createTicketPayment(paymentBody);

  const result = await paymentRepository.findTicketPaymentByTicketId(body.ticketId);

  if (!result) {
    throw notFoundError();
  }

  await ticketRepository.updateStatusTicket("PAID", body.ticketId);

  return result;
}

const paymentService = {
  getTicketPayment,
  postTicketPayment
};

export default paymentService;
