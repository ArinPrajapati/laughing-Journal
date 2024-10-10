import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 8800;
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Yes, I am alive, I am working fine");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
