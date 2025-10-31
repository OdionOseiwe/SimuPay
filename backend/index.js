import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";

import { ConnectMongoDB } from "./config/db.js";
import userRouter from "./routes/User.routes.js";
import PaymentLinkRouter from "./routes/PaymentLink.routes.js";
import TransactionRouter from "./routes/Transaction.routes.js";
import WalletRouter from "./routes/Wallet.routes.js";

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// const app = express()
// const __dirname = path.resolve();

// cors configuration
// formally the frontend is running on localhost:3000 and backend on localhost:5000
// so the browser will block the request from frontend to backend due to CORS policy
// to avoid this we need to enable CORS on the backend and allow the frontend to access the backend
// by setting origin to frontend url and credentials to true to allow cookies to be sent with the request
app.use(cors({origin:"http://localhost:5173", credentials:true})) // So the frontend can access the backend with cookies 

app.use(cookieParser())
app.use(express.json());


app.use('/simupay/api/user',userRouter);
app.use('/simupay/api',PaymentLinkRouter);
app.use('/simupay/api',TransactionRouter);
app.use('/simupay/api/wallet',WalletRouter);



// serving static files in production
// So the express server can serve the react frontend
// normally the react frontend is built and served by a separate server
// but in production we can serve the built react frontend with the express server
// by using express.static middleware to serve the static files from the build folder
if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = join(__dirname, "frontend", "build");

  // Serve React static files
  app.use(express.static(frontendBuildPath));

  // Catch-all: send index.html for any unknown route
  app.get("/*", (req, res) => {
    res.sendFile(join(frontendBuildPath, "index.html"));
  });

  // Optional: set CSP headers to allow Google Fonts
  app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; img-src 'self' data:;"
    );
    next();
  });
}


app.listen(process.env.PORT, () => {
    ConnectMongoDB();
    console.log(`Example app listening on port ${process.env.PORT}`)
})
