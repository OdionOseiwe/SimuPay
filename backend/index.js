import express from "express"
import {ConnectMongoDB} from './config/db.js'
import userRouter from './routes/User.routes.js'
import PaymentLinkRouter from './routes/PaymentLink.routes.js'


const port = 5000
const app = express()

app.use(express.json())
app.use('/smipay/api/user',userRouter)
app.use('/smipay/api/project',PaymentLinkRouter)

app.listen(port, () => {
    // ConnectMongoDB();
    console.log(`Example app listening on port ${port}`)
})
