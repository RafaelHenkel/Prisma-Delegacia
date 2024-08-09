import { Router } from "express";
import gunsController from "../controllers/guns.controller";

const routes = () => {
  const router = Router();
  const controller = new gunsController();

  router.get("/", controller.list);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
};

export default routes;
