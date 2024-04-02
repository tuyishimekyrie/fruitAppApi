import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { messageRouter } from "./message/message.router";
import { productRouter } from "./product/product.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/messages",messageRouter)
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
