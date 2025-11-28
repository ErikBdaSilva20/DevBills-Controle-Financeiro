import { Category } from "@prisma/client";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../config/prisma";

export const getCategories = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {

  try {
    const categories: Category[] = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })

    res.send(categories)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
} 