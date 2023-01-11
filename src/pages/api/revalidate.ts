import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";

const revalidateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, secret } = req.query

  if (secret !== env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    await res.revalidate(`/blog/${id}`)
    // await res.revalidate(`/admin/blog/${id}`)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
};

export default revalidateHandler;
