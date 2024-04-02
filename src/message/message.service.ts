import { db } from "../utils/db.server";


type MessageWrite = {
  email: string;
  phoneNumber: string;
  message: string;
};

export const listMessages = async (): Promise<MessageWrite[]> => {
  return db.message.findMany({
    select: {
      id: true,
      email: true,
      phoneNumber: true,
      message: true,
    },
  });
};


export const createMessage = async (messages: MessageWrite): Promise<MessageWrite> => {
  const { email, phoneNumber, message } = messages;

  return db.message.create({
      data: {
          email,
          phoneNumber,
          message
    }
  });
};

