import { paymentBodyData } from "@/protocols";
import Joi from "joi";

const getPaymentQuerySchema = Joi.object<getPaymentQueryType>({
  ticketId: Joi.number().required(),
});

const getPaymentBodySchema = Joi.object<paymentBodyData>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().required()
  })
});

type getPaymentQueryType = {
    ticketId: number
};
function validatePaymentQuery(ticketId: number): number | boolean {
  const validation = getPaymentQuerySchema.validate({ ticketId });

  if (validation.error) {
    return false;
  }

  return ticketId;
}

function validatePaymentBody(body: paymentBodyData): paymentBodyData | boolean {
  const validation = getPaymentBodySchema.validate(body);
  
  if (validation.error) {
    return false;
  }
  
  return body;
}

export {
  validatePaymentQuery,
  validatePaymentBody
};
