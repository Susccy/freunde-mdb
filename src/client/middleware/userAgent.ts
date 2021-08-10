import { Middleware } from "@nuxt/types"

const userAgent: Middleware = (context) => {
  context.userAgent = process.server
    ? (context.req.headers["user-agent"] as string | undefined)
    : navigator.userAgent
}

export default userAgent
