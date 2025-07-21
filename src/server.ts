import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import path from "path";
import router from "./routes";
import fs from "fs";

const server = express();

dotenv.config();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(passport.initialize());

const uploadDir = path.resolve("./uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
server.use(router);

server.listen(process.env.PORT, () => {
  console.log("Server on");
});
