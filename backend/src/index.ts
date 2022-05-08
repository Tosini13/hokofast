import express, { NextFunction, Request, Response } from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import router from "./router";
import path from "path";
import { connectMongoose } from "./config/mongo";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

connectMongoose();

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
    "Access-Control-Allow-Headers":
      "accept, x-requested-with, origin, Content-Type, cookie, pragma, cache-control, x-access-token",
  });
  next();
});

app.use(express.urlencoded());
app.use(express.json());

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET,POST,PUT,DELETE"],
    allowedHeaders: ["Access-Control-Allow-Credentials"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use("/api", router);

// SERVE CLIENT

const CLIENT_PATH = process.env.CLIENT_PATH ?? "../client/build";
app.use(express.static(path.resolve(__dirname, CLIENT_PATH))); // ../../client/build

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, CLIENT_PATH, "index.html"));
});

server.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
