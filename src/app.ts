import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { userRoute } from './app/modules/user/user.route'
const app: Application = express()

//parse
app.use(express.json())
app.use(cors())


app.use('/api/users', userRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
