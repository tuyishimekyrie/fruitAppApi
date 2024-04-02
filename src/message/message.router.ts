import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as MessageService from "./message.service";

export const messageRouter = express.Router();



// GET: List all the books
messageRouter.get("/", async (request: Request, response: Response) => {
  try {
    const messages = await MessageService.listMessages();
    return response.status(200).json(messages);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// POST: Post(Send) Data(Message)
messageRouter.post(
  "/",
  body("email").isString(),
  body("phoneNumber").isString(),
  body("message").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const message = request.body;
      const newMessage = await MessageService.createMessage(message);
      return response.status(201).json(newMessage);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

