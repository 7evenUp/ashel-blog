import { createRouter } from "./context";
import { z } from "zod";

export const postsRouter = createRouter()
  .query("getAll", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma?.post.findMany();
    },
  })
  .query("getPublished", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.post.findMany({
        where: {
          published: true
        }
      })
    }
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
  .mutation("update", {
    input: z.object({
      id: z.number(),
      title: z.string(),
      desc: z.string(),
      content: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const res = await ctx.prisma.post.update({
        where: {
          id: input.id
        },
        data: {
          title: input.title,
          desc: input.desc,
          content: input.content,
        }
      })

      return res
    }
  })
  .mutation("publish", {
    input: z.object({
      id: z.number(),
      title: z.string(),
      desc: z.string(),
      content: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const res = await ctx.prisma.post.update({
        where: {
          id: input.id
        },
        data: {
          desc: input.desc,
          title: input.title,
          content: input.content,
          published: true,
          publishedAt: new Date(Date.now())
        }
      })

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
