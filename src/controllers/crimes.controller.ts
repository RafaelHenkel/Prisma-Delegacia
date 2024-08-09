import { Request, Response } from "express";
import db from "../database/prisma.connection";

class crimesController {
  public async list(req: Request, res: Response) {
    try {
      const crimes = await db.crimes.findMany();

      return res
        .status(200)
        .json({ success: true, msg: "List crimes", data: crimes });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }

  public async create(req: Request, res: Response) {
    const { description, criminalsId } = req.body;
    try {
      await db.crimes.create({
        data: {
          description,
          criminalsId,
        },
      });
      return res.status(200).json({ success: true, msg: "Crimes created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { description } = req.body;
    try {
      const crime = await db.crimes.findUnique({
        where: {
          id,
        },
      });
      if (!crime) {
        return res.status(404).json({ success: false, msg: "Crime not found" });
      }
      if (description) {
        await db.crimes.update({
          where: {
            id,
          },
          data: {
            description,
          },
        });

        return res.status(200).json({ success: true, msg: "Crime updated" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const crime = await db.crimes.findUnique({
        where: {
          id,
        },
      });
      if (!crime) {
        return res.status(404).json({ success: false, msg: "Crime not found" });
      }
      await db.crimes.delete({
        where: {
          id,
        },
      });
      return res.status(200).json({ success: true, msg: "Crime deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "Database error" });
    }
  }
}

export default crimesController;
