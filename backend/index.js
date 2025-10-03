import express from "express"
import cookieParser from 'cookie-parser';
import {ConnectMongoDB} from './config/db.js'
import userRouter from './routes/User.routes.js'
import PaymentLinkRouter from './routes/PaymentLink.routes.js'
import Transaction from './routes/Transaction.routes.js'


const app = express()
app.use(cookieParser())
app.use(express.json());

app.use('/smipay/api/user',userRouter);
app.use('/smipay/api',PaymentLinkRouter);
app.use('/smipay/api',Transaction);

app.listen(process.env.PORT, () => {
    ConnectMongoDB();
    console.log(`Example app listening on port ${process.env.PORT}`)
})
