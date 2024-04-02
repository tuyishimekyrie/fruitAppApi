import { db } from "../utils/db.server";

type ProductWrite = {
  title: string;
  price: number;
  image: string;
  stock: number;
};

export const listProducts = async (): Promise<ProductWrite[]> => {
  return db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      image: true,
      stock: true,
    },
  });
};

// export const getBook = async (id: number): Promise<BookRead | null> => {
//   return db.book.findUnique({
//     where: {
//       id,
//     },
//     select: {
//       id: true,
//       title: true,
//       isFiction: true,
//       datePublished: true,
//       author: {
//         select: {
//           id: true,
//           firstName: true,
//           lastName: true,
//         },
//       },
//     },
//   });
// };

export const createProduct = async (product: ProductWrite): Promise<ProductWrite> => {
  const { title, price, image, stock } = product;

  return db.product.create({
    data: {
      title,
      price,
      image,
      stock,
    },
  });
};

export const updateProduct = async (
  product: ProductWrite,
  id: number
): Promise<ProductWrite> => {
  const { title, price, image, stock } = product;
  return db.product.update({
    where: {
      id,
    },
    data: {
      title,
      price,
      image,
      stock: stock > 0 ? stock - 1 : 0,
    },
  });
};
