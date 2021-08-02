import mongoose from "mongoose"

class Connection {
  constructor () {
    const uri = process.env.NUXT_ENV_MONGODB_LOCAL_URI!
    mongoose.set("useNewUrlParser", true)
    mongoose.set("useFindAndModify", false)
    mongoose.set("useCreateIndex", true)
    mongoose.set("useUnifiedTopology", true)
    mongoose.connect(uri)
  }
}

export default new Connection()
