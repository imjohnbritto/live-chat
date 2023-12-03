import { Router, Request, Response, NextFunction } from "express";
import { otherInfoServices } from "../services";
import { getErrorResponse, getSuccessResponse, logger } from "../utils";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const info = await otherInfoServices.saveInfo(req.body);
    if (info) {
      return res.status(200).json(getSuccessResponse(200, "Info Saved", info));
    } else {
      res.status(400).json(getErrorResponse(400, "Info Not Saved"));
    }
  } catch (e) {
    res.status(400).json(getErrorResponse(400, "Something went wrong!"));
  }
});

router.get("/", async (req: Request, res: Response) => {
  const info = await otherInfoServices.getInfo();
  if (info) {
    return res.status(200).json(getSuccessResponse(200, "Info Data", info));
  } else {
    res.status(401).json(getErrorResponse(401, "Info Not Found"));
  }
});

export const otherInfoRouter = router;
