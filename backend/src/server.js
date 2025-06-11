import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./Middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionRoute.js";

dotenv.config();
const app = express();

app.use(rateLimiter);
app.use(express.json());

app.use((req,res,next) =>{
    console.log("Hey we hit a req, the methods is", req.method)
    next();

})

const PORT = process.env.PORT;

app.get("/", (req, res)=>{
res.send("Its Working");
});

app.use("/api/transactions", transactionsRoute);
initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is Running on Port:", PORT);
    });
});
