import { createRouter } from "./context";
import { z } from "zod";

export const galleryRouter = createRouter()
  .query("getAll", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.photo.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      src: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const res = await ctx.prisma.photo.create({
        data: {
          title: input.title || "",
          src: input.src
        },
      });
      return res;
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ input, ctx }) => {
      const deletedPhoto = await ctx.prisma.photo.delete({
        where: {
          id: input.id,
        },
      });
      return deletedPhoto;
    },
  });
