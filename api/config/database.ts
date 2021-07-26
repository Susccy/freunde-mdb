import mongoose from 'mongoose'

class Connection {
  constructor() {
    const uri = process.env.NUXT_ENV_MONGODB_LOCAL_URI!
    mongoose.connect(uri, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Connected to MongoDB');
      }
    })
  }
}

export default new Connection()
