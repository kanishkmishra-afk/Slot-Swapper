import express from "express";
import { getswappableSlots, getSwapRequest, registerEvent, swapRequest, swapResponse } from "../controller/eventController.js";
import { isAuth } from "../middleware/isAuth.js";

const eventRouter=express.Router()

eventRouter.get("/getSwappableSlot",getswappableSlots)
eventRouter.post("/swapRequest",swapRequest)
eventRouter.post("/swapResponse/:id",swapResponse)
eventRouter.get("/getSwapRequests",getSwapRequest)
eventRouter.post("/registerEvent",isAuth,registerEvent)

export default eventRouter