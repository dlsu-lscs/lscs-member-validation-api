import { validateMemberbyID } from "./auth.js";
import pool from "../config/connectdb.js";

export const checkStatus = async function (req, res) {
  const { studentId } = req.query;

  try {
    const result = await validateMemberbyID(parseInt(studentId));

    if (!result) {
      return res.status(404).send({ message: "Member not found." });
    }

    const {
      id,
      email,
      full_name,
      committee_name,
      position_name,
      division_name,
    } = result;

    let scanned_at = new Date();

    scanned_at = scanned_at.toLocaleString("en-US", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return res.status(200).send({
      member_details: {
        id,
        email,
        full_name,
        committee_name,
        position_name,
        division_name,
      },
      scanned_at: scanned_at,
    });
  } catch (err) {
    console.error("Error during member validation:", err.message);
    res.status(500).send({ message: "Error validating member." });
  }
};

export const claimByMemberId = async function (req, res) {
  const { studentId, event } = req.body;
  try {
    const result = await validateMemberbyID(parseInt(studentId));

    if (!result) {
      return res.status(404).json({ message: "Member not found." });
    }

    const {
      id,
      email,
      full_name,
      committee_name,
      position_name,
      division_name,
      error,
    } = result;

    pool.query(
      `INSERT INTO general_scans (student_id, scanned_at, event) VALUES (?, NOW(), ?)`,
      [studentId, event],
      (insertErr) => {
        if (insertErr) {
          console.error("Insert process error:", insertErr.message);
          return res.status(500).json({
            message: "Error inserting data into DB",
            error: insertErr.message,
          });
        }

        return res.status(200).json({
          member_details: {
            id,
            email,
            full_name,
            committee_name,
            position_name,
            division_name,
          },
          claim: `Member claim recorded at ${event}`,
          event: event,
        });
      },
    );
  } catch (err) {
    console.error("Error during member validation:", err.message);
    res
      .status(500)
      .json({ message: "Error validating member.", error: err.message });
  }
};
