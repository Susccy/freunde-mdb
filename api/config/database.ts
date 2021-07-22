import mongoose from 'mongoose'

class Connection {
  constructor() {
    const uri = process.env.NUXT_ENV_MONGODB_URI!
    mongoose.connect(uri, (err) => console.error(err!.message))
  }
}

export default new Connection()
