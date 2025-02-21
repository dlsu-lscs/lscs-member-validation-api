import express from "express";
import { checkStatus, claimByMemberId } from "../services/member.js";
import {
  createEvent,
  getEvent,
  getEvents,
  deleteEvent,
} from "../services/event.js";

const router = express.Router();

router.post("/claim", claimByMemberId);
router.get("/status", checkStatus);
router.post("/add-event", createEvent);
router.get("/event", getEvent);
router.get("/events", getEvents);
router.post("/delete-event", deleteEvent);

export default router;
