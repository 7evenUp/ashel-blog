import { createRouter } from "./context";
import { z } from "zod";

export const postsRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma?.post.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string()
    }),
    resolve: async ({ input, ctx }) => {
      console.log('inside tRPC resolver')
      const res = await ctx.prisma.post.create({ data: { title: input.title || '' }})
      console.log(res)
      return res
    }
  })
  .mutation("delete", {
    input: z.object({
      id: z.number()
    }),
    resolve: async ({ input, ctx }) => {
      const deletedPost = await ctx.prisma.post.delete({
        where: {
          id: input.id
        }
      })
      console.log('DELETED POST IS:', deletedPost)
      return deletedPost
    }
  })