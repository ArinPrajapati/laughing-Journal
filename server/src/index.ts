import express, { Express } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB";
import sanitizeMiddleware from "./middleware/sanitizeInput";
import routes from "./routes";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8800;

// loading of configs
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeMiddleware);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Yes, I am alive, I am working fine");
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
