import { Router } from "express";
import crimesController from "../controllers/crimes.controller";

const routes = () => {
  const router = Router();
  const controller = new crimesController();

  router.get("/", controller.list);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
};

export default routes;
