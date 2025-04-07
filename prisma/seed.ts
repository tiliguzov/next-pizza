import { hashSync } from 'bcrypt';
import { prisma } from './prisma-client';
import { ingredients, categories, products } from './constants';
import { Prisma } from '@prisma/client';

const randomDecimalNumber = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(700, 2000),
    pizzaType,
    size,
  } as Prisma.ProductVariationUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Pepperoni Fresh',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Cheese',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Chorizo Fresh',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productVariation.createMany({
    data: [
      // Pepperoni Fresh
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Cheese
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Chorizo Fresh
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // Other products
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalPrice: 0,
        token: '111111',
      },
      {
        userId: 2,
        totalPrice: 0,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productVariationId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl: 'https://i.ibb.co/QFhFb2k0/Chat-GPT-Image-7-2025-09-27-09.png',
      },
      {
        previewImageUrl: 'https://i.ibb.co/fGnWFZQk/Chat-GPT-Image-7-2025-09-33-10.png',
      },
      {
        previewImageUrl: 'https://i.ibb.co/mrWCq4Md/Chat-GPT-Image-7-2025-09-40-09.png',
      },
      {
        previewImageUrl: 'https://i.ibb.co/fVKngx3f/Chat-GPT-Image-7-2025-09-49-14.png',
      },
      {
        previewImageUrl: 'https://i.ibb.co/RTmCfbbR/Chat-GPT-Image-7-2025-09-51-17.png',
      },
      {
        previewImageUrl: 'https://i.ibb.co/4nT9y82j/Chat-GPT-Image-7-2025-09-53-34.png',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl: 'https://i.ibb.co/mVDFnSzs/Chat-GPT-Image-7-2025-10-15-23.png',
      },
      {
        storyId: 1,
        sourceUrl: 'https://i.ibb.co/GQD6JvMn/Chat-GPT-Image-7-2025-10-19-03.png',
      },
      {
        storyId: 1,
        sourceUrl: 'https://i.ibb.co/CprCPN7P/Chat-GPT-Image-7-2025-10-24-00.png',
      },
      {
        storyId: 1,
        sourceUrl: 'https://i.ibb.co/7xG7WM7M/Chat-GPT-Image-7-2025-10-09-47.png',
      },
      {
        storyId: 1,
        sourceUrl: 'https://i.ibb.co/1fh1QHpj/Chat-GPT-Image-7-2025-10-09-48.png',
      },
      {
        storyId: 2,
        sourceUrl: 'https://i.ibb.co/v6XWcRKP/Chat-GPT-Image-7-2025-10-30-53.png',
      },
      {
        storyId: 2,
        sourceUrl: 'https://i.ibb.co/tpJW4WQ1/Chat-GPT-Image-7-2025-10-33-28.png',
      },
      {
        storyId: 3,
        sourceUrl: 'https://i.ibb.co/Xrn7SzCR/Chat-GPT-Image-7-2025-10-36-22.png',
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariation" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
