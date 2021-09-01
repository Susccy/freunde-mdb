import { connect } from "mongoose"

// Change env var depending on deployment.
export default async () => {
  await connect(process.env._MONGODB_URI!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
}
