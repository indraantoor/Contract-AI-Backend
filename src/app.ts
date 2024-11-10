import dotenv from "dotenv";
dotenv.config();

import MongoStore from "connect-mongo";
import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import "./config/passport";

// routes
import authRoute from "./routes/auth";
import contractsRoute from "./routes/contract";

const app = express();

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI!,
    }),
    cookie: {
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/contracts", contractsRoute);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
