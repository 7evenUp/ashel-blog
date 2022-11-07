// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const gallery = async (req: NextApiRequest, res: NextApiResponse) => {
  const photos = await prisma.photo.findMany()
  res.status(200).json(photos);
};

export default gallery;
