import { Router } from "express";
import { registerRouter } from "./registerRouter";
import { loginRouter } from "./loginRouter";
import { usersRouter } from "./usersRouter";
import { chatRouter } from "./chatRouter";
import { otherInfoRouter } from "./otherInfoRouter";

const router = Router();

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/users", usersRouter);
router.use("/chats", chatRouter);
router.use("/otherInfo", otherInfoRouter);

export default router;
