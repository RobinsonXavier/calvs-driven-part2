import { ticketTypeIdBody } from "@/services/tickets-service";
import Joi from "joi";

const ticketTypeIdSchema = Joi.object<ticketTypeIdBody>({
  ticketTypeId: Joi.number().required(),
});

function validateTicketTypeId(ticketTypeId: number): number | false {
  const validation = ticketTypeIdSchema.validate({ ticketTypeId });

  if (validation.error) {
    return false;
  }

  return ticketTypeId;
}

export {
  validateTicketTypeId
};
