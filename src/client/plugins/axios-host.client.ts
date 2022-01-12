import type { Plugin } from "@nuxt/types"

const axiosHost: Plugin = ({ $axios }) => {
  $axios.defaults.baseURL = window.location.origin
}

export default axiosHost
