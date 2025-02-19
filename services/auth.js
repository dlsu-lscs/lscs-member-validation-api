import axios from "axios";

// sends request to central auth for member validity
export const validateMemberbyID = async function (studentId) {
  try {
    const res = await axios({
      method: "post",
      url: "https://auth.app.dlsu-lscs.org/member-id",
      headers: {
        Authorization: `Bearer ${process.env.LSCS_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        id: studentId,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.res ? err.res.data : err.message);
  }
};

export const validateMemberbyEmail = async function (email) {
  try {
    const res = await axios({
      method: "post",
      url: "https://auth.app.dlsu-lscs.org/member-id",
      headers: {
        Authorization: `Bearer ${process.env.LSCS_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        email: email,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.res ? err.res.data : err.message);
  }
};
