import { createRouter } from "./context";
import { z } from "zod";

export const postsRouter = createRouter()
  .mutation("createPost", {
    input: z.object({
      title: z.string()
    }),
    resolve: async ({ input, ctx }) => {
      console.log('inside tRPC resolver')
      const res = await ctx.prisma?.post.create({ data: { title: input.title }})
      console.log(res)
    }
  })
