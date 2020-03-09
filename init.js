import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";

const PORT = process.env.PORT || 3000;
const handleListening = () =>
  console.log(`✅Lisetning on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
