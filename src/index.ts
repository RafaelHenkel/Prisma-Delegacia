import express from "express";
import * as dotenv from "dotenv";
import criminalsRoutes from "./routes/criminals.routes";
import gunsRoutes from "./routes/guns.routes";
import crimesRoutes from "./routes/crimes.routes";
import questionsRoutes from "./routes/questions.routes";

dotenv.config();

const app = express();
app.use(express.json());

//ROUTES
app.use("/criminals", criminalsRoutes());
app.use("/guns", gunsRoutes());
app.use("/crimes", crimesRoutes());
app.use("/questions", questionsRoutes());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}...`);
});
