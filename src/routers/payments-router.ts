import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketPayment } from "@/controllers";
const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("", getTicketPayment);

export { paymentRouter };

