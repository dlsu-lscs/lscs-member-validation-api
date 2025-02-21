import lscscore from "lscs-core";
import pool from "../config/connectdb.js";

export const createEvent = async function(req, res) {
  const { email, event_name } = req.body;
  const lscs = new lscscore(process.env.LSCS_AUTH_KEY);

  try {
    const result = await lscs.findMemberByEmail(email);
    if (!result) {
      return res.status(404).send({ message: "Member not found." });
    }

    const { committee_name } = result;

    pool.query(
      `INSERT INTO events (event_name, committee) VALUES (?, ?)`,
      [event_name, committee_name],
      (insertErr) => {
        if (insertErr) {
          console.error("Insert process error:", insertErr.message);

          return res.status(500).json({
            message: "Error inserting data into DB",
            error: insertErr.message,
          });
        }

        return res.status(200).json({
          event_name,
          committee_name,
        });
      },
    );
  } catch (err) {
    console.error("Error during inserting record.", err.message);
    res
      .status(500)
      .json({ message: "Error during MYSQL insertion.", error: err.message });
  }
};

export const getEvent = async function(req, res) {
  const { id } = req.query;

  try {
    pool.query(
      `SELECT * FROM events WHERE id=?`,
      [id],
      async (insertErr, queryResult) => {
        if (insertErr) {
          console.error("Select process error:", insertErr.message);

          return res.status(500).json({
            message: "Error getting data from DB",
            error: insertErr.message,
          });
        }

        const committee = queryResult[0].committee;
        const event = queryResult[0].event_name;

        return res.status(200).json({
          event,
          committee,
        });
      },
    );
  } catch (err) {
    console.error("Error getting record.", err.message);
    res
      .status(500)
      .json({ message: "Error during MYSQL selection.", error: err.message });
  }
};

export const getEvents = async function(req, res) {
  try {
    pool.query(`SELECT * FROM events`, async (insertErr, queryResult) => {
      if (insertErr) {
        console.error("Select process error:", insertErr.message);

        return res.status(500).json({
          message: "Error getting data from DB",
          error: insertErr.message,
        });
      }

      return res.status(200).json(queryResult);
    });
  } catch (err) {
    console.error("Error getting records.", err.message);
    res
      .status(500)
      .json({ message: "Error during MYSQL selection.", error: err.message });
  }
};

export const deleteEvent = async function(req, res) {
  const { event } = req.body;

  try {
    pool.query(
      `DELETE FROM events WHERE event_name=?`,
      [event],
      (deleteErr) => {
        if (deleteErr) {
          console.error("Delete process error:", insertErr.message);

          return res.status(500).json({
            message: "Error deleting data into DB",
            error: deleteErr.message,
          });
        }

        return res.status(200).send({
          status: `${event} event deleted.`,
        });
      },
    );
  } catch (err) {
    console.error("Error during inserting record.", err.message);
    res
      .status(500)
      .json({ message: "Error during MYSQL insertion.", error: err.message });
  }
};
