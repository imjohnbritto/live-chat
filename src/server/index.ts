import express, { Request, Response } from "express";
import { Server } from "http";
import next from "next";
import nextConfig from "../../next.config";
import apiRouter from "./routes";
import {
  connectToDatabase,
  disconnectFromDatabase,
  isProd,
  logger,
  getSessionOptions,
} from "./utils";
import session from "express-session";
import { Server as SocketServer } from "socket.io";
import { saveChat } from "./services/chatServices";

const port = 3000;
const dev = !isProd;
const nextApp = next({ dev, conf: nextConfig });
const handle = nextApp.getRequestHandler();
// const httpServer = http.createServer();

function gracefulShutdown(signal: string, server: Server) {
  process.on(signal, async () => {
    logger.info("Goodbye, got signal", signal);
    server.close();
    await disconnectFromDatabase();
    logger.info("My work here is done");
    process.exit(0);
  });
}

nextApp
  .prepare()
  .then(() => {
    const expressApp = express();

    // Add common middlewares
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: true }));
    // expressApp.use(authMiddleware());

    // Setup session
    expressApp.use(session(getSessionOptions()));
    if (isProd) {
      expressApp.set("trust proxy", 1);
    }

    // Add api handler
    expressApp.use("/api", apiRouter);

    // Add web handler
    expressApp.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    // Start server
    const server = expressApp.listen(port, async () => {
      await connectToDatabase();
      console.log(`> Ready on http://localhost:${port}`);
    });

    const io = new SocketServer(server, {
      cors: {
        origin: process.env.NEXTAUTH_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("message", (message) => {
        console.log("message: " + message);
        io.emit("message", message);
        saveChat(message);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });

    // Add listener for graceful shutdown
    const signals = ["SIGTERM", "SIGINT"];
    signals.forEach((signal) => gracefulShutdown(signal, server));
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
