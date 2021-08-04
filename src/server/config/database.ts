import { connect } from "mongoose"

class Connection {
  constructor () {
    // Change env var depending on deployment.
    connect(process.env.NUXT_ENV_MONGODB_LOCAL_URI!, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
  }
}

// Export a new connection so we never accidentally create multiple at once.
export default new Connection()
