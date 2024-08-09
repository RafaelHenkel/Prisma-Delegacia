import { Router } from "express";
import questionsController from "../controllers/question.controller";

const routes = () => {
  const router = Router();
  const controller = new questionsController();

  router.get("/criminals/:id", controller.criminalQuestion);
  router.get("/guns/:id", controller.gunQuestion);

  return router;
};

export default routes;
