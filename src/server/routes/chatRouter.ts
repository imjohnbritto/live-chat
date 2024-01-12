import { Router, Request, Response, NextFunction } from "express";
import { chatServices } from "../services";
import { getErrorResponse, getSuccessResponse, logger } from "../utils";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const chatList = await chatServices.getChat(req.body);
  if (chatList) {
    return res.status(200).json(getSuccessResponse(200, "Chat List", chatList));
  } else {
    res.status(401).json(getErrorResponse(401, "Chat Not Found"));
  }
});

router.post("/delete", async (req: Request, res: Response) => {
  const chatList = await chatServices.deleteChat(req.body);
  if (chatList) {
    return res
      .status(200)
      .json(getSuccessResponse(200, "Chat deleted", chatList));
  } else {
    res.status(401).json(getErrorResponse(401, "Chat Not Found"));
  }
});

export const chatRouter = router;
