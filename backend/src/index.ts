import express from "express";
import { json } from "body-parser";

import authRoutes from "./routes/authRoutes";

const app = express();
app.use(json());

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
