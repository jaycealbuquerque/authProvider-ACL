import express from 'express'
import { routes } from './http/controller/users/routes'

import { env } from './env'

const app = express()

app.use(express.json())

app.use(routes)

app.listen(env.PORT, () => console.log('🚀 Server Running!'))

console.log(env)
