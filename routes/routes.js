import express from "express";
import { checkStatus, claimByMemberId } from "../services/member.js";
import { createEvent, getEvent, getEvents } from "../services/event.js";

const router = express.Router();

router.post("/claim", claimByMemberId);
router.get("/status", checkStatus);
router.post("/add-event", createEvent);
router.get("/get-event", getEvent);
router.get("/events", getEvents);

export default router;
