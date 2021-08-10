import { connect } from "mongoose"

// Change env var depending on deployment.
export default async () => {
  await connect(process.env.NUXT_ENV_MONGODB_LOCAL_URI!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
}
