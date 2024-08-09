import { Router } from "express";
import criminalsController from "../controllers/criminals.controller";

const routes = () => {
  const router = Router();
  const controller = new criminalsController();

  router.get("/", controller.list);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
};

export default routes;
