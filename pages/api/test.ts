// This is an example of how to access a session from an API route
import { Code } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"



export default async (req: NextApiRequest, res: NextApiResponse) => {
  let body = JSON.parse(req.body)
  console.log(body)
  res.send({Code:0})

  res.send({ code: 0, cdn: process.env.CDN, pong:true})
}
