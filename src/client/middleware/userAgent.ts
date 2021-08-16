import { Middleware } from "@nuxt/types"

/**
 * Get client device type before every route change to set appropriate layout.
 * @param context Nuxt context object
 */
const userAgent: Middleware = (context) => {
  /**
   * Initial page request gets handled on server side (in SSR mode),
   * subsequent route requests on client side.
   * Hence we have to get the user agent info from either the http request or the browser navigator object.
   */
  context.userAgent = process.server
    ? (context.req.headers["user-agent"] as string | undefined)
    : navigator.userAgent
}

export default userAgent
