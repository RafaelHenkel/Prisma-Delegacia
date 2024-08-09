import { Request, Response } from "express";
import db from "../database/prisma.connection";

class gunsController {
  public async list(req: Request, res: Response) {
    try {
      const guns = await db.guns.findMany();

      return res
        .status(200)
        .json({ success: true, msg: "List guns", data: guns });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }
  public async create(req: Request, res: Response) {
    const { name, crimesId } = req.body;
    try {
      await db.guns.create({
        data: {
          name,
          crimesId,
        },
      });
      return res.status(200).json({ success: true, msg: "Guns created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const gun = await db.guns.findUnique({
        where: {
          id,
        },
      });
      if (!gun) {
        return res.status(404).json({ success: false, msg: "Gun not found" });
      }
      if (name) {
        await db.guns.update({
          where: {
            id,
          },
          data: {
            name,
          },
        });
        return res.status(200).json({ success: true, msg: "Gun updated" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const gun = await db.guns.findUnique({
        where: {
          id,
        },
      });
      if (!gun) {
        return res.status(404).json({ success: false, msg: "Gun not found" });
      }
      await db.guns.delete({
        where: {
          id,
        },
      });
      return res.status(200).json({ success: true, msg: "Gun deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }
}

export default gunsController;
