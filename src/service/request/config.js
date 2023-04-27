export const TIMEOUT = 10000
export let BASE_URL = ""

if (import.meta.env.DEV) {
  BASE_URL = import.meta.env.VITE_DEVELOPMENT
} else {
  BASE_URL = import.meta.env.VITE_PRODUCTION
}
