import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketPayment, postTicketPayment } from "@/controllers";
const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("", getTicketPayment)
  .post("/process", postTicketPayment);

export { paymentRouter };

