import express from "express";
import { login, registerUser } from "../controller/userController.js";

const userRoutes=express.Router()

userRoutes.post("/registerUser",registerUser)
userRoutes.post("/login",login)


export default userRoutes