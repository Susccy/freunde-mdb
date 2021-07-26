import mongoose from 'mongoose'

class Connection {
  constructor () {
    const uri = process.env.NUXT_ENV_MONGODB_LOCAL_URI!
    mongoose.connect(uri, err => {
      err ? console.error(err) : console.log("Connected to MongoDB")
    })
  }
}

export default new Connection()
