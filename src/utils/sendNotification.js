// utils/sendNotification.js
import axios from "axios";
import { baseURl } from "../Api/url";

export const sendNotification = async ({ title, body, dataName }) => {
  try {
    const payload = {
      topic: "livetv",
      channel_id: "livetv",
      sound: "play",
      title,
      body,
      data: { name: dataName },
    };

    const res = await axios.post(`${baseURl}api/send-notification`, payload);
    return { success: true, message: res.data.message };
  } catch (err) {
    console.error("Notification error:", err);
    return {
      success: false,
      message: err.response?.data?.message || "Something went wrong!",
    };
  }
};
