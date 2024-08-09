import { Request, Response } from "express";
import db from "../database/prisma.connection";

class criminalsController {
  public async list(req: Request, res: Response) {
    try {
      const criminals = await db.criminals.findMany();

      return res
        .status(200)
        .json({ success: true, msg: "List criminals", data: criminals });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }
  public async create(req: Request, res: Response) {
    const { name } = req.body;
    try {
      await db.criminals.create({
        data: {
          name,
        },
      });
      return res.status(200).json({ success: true, msg: "Criminals created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const criminal = await db.criminals.findUnique({
        where: {
          id,
        },
      });
      if (!criminal) {
        return res
          .status(404)
          .json({ success: false, msg: "Criminal not found" });
      }
      if (name) {
        await db.criminals.update({
          where: {
            id,
          },
          data: {
            name,
          },
        });
        return res.status(200).json({ success: true, msg: "Criminal updated" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const criminal = await db.criminals.findUnique({
        where: {
          id,
        },
      });
      if (!criminal) {
        return res
          .status(404)
          .json({ success: false, msg: "Criminal not found" });
      }
      await db.criminals.delete({
        where: {
          id,
        },
      });
      return res.status(200).json({ success: true, msg: "Criminal deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }
}

export default criminalsController;
