import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from "zod";
import { zValidator } from "@hono/zod-validator"

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
    return c.json({
        message: 'Hello Next.js!',
    })
});

app.post('/', zValidator('json',z.object({
    name: z.string(),
    dni: z.number(),
})),(c) => {
    const {name,dni} = c.req.valid('json');
    return c.json({
        message: `See ya ${name}`
    })
})


app.get('/bye', (c) => {
    return c.json({
        bye: "see yaA",
        xd: c.req.method
    })
})

export const GET = handle(app)
export const POST = handle(app)