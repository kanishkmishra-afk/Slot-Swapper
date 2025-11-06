import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js';
import eventRouter from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
dotenv.config()
const app = express();
const PORT = 3000;
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/api/user",userRoutes)
app.use("/api/eventRoutes",eventRouter)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB()
});