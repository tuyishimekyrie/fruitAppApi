import { db } from "../src/utils/db.server";
import { PrismaClient } from "@prisma/client";

type Product = {
  title: string;
  price: number;
  image: string;
  stock: number;
};


type Message = {
  email: string;
  phoneNumber: string;
  message: string;
};

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create messages
    const message1 = await prisma.message.create({
      data: {
        email: "example1@example.com",
        phoneNumber: "+123456789",
        message: "This is message 1",
      },
    });

    const message2 = await prisma.message.create({
      data: {
        email: "example2@example.com",
        phoneNumber: "+987654321",
        message: "This is message 2",
      },
    });

    // Create products
    const product1 = await prisma.product.create({
      data: {
        title: "Mango",
        price: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWtgqTpKA5WugKJ2EIOMk-xFYZtqTXNq3_xA&usqp=CAU",
        stock: 10,
      },
    });

    const product2 = await prisma.product.create({
      data: {
        title: "Tomato",
        price: 200,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpEPR4m3x_IRE3Forqk4YCfKrASj7PRYJjNA&usqp=CAU",
        stock: 20,
      },
    });

    console.log("Data seeded successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
