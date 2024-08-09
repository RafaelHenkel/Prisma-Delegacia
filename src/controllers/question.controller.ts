import { Request, Response } from "express";
import db from "../database/prisma.connection";

class questionController {
  public async criminalQuestion(req: Request, res: Response) {
    const { criminalsId } = req.params;
    try {
      const question = await db.crimes.findMany({
        where: {
          criminalsId,
        },
      });
      return res.status(200).json({ success: true, data: question });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }

  public async gunQuestion(req: Request, res: Response) {
    const { crimesId } = req.params;
    try {
      const question = await db.guns.findMany({
        where: {
          crimesId,
        },
      });
      return res.status(200).json({ success: true, data: question });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }
}

export default questionController;
