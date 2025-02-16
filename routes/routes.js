import express from "express";
import { checkStatus, claimByMemberId } from "../services/member.js";

const router = express.Router();

router.post("/claim", claimByMemberId);
router.get("/status", checkStatus);

export default router;
