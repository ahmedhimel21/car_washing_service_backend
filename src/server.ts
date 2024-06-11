import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import config from "./app/config";

let server: Server;

async function main() {
  await mongoose.connect(config.db_url as string);
  server = app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}

main();

process.on("unhandledRejection", () => {
  console.log(`👿 unhandledRejection detected, shuting down`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`👿 uncaughtException detected, shuting down...`);
  process.exit(1);
});
