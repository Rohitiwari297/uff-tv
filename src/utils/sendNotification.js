import axios from "axios";
import { baseURl } from "../Api/url";

export const sendNotification = async ({ title, body, dataName, image, videoId, type }) => {

  console.log("Notification Title:", title);
  console.log("Notification Body:", body);

  try {
    const payload = {
      topic: "livetv",
      channel_id: "livetv",
      sound: "play",

      // Moved title/body/image inside notification object
        title,
        body,
        image,
      // Data payload (extra info for the app)
      data: {
        id: videoId,
        name: dataName,
        image,
        type,
      },
    };

    console.log("Payload sent to API:", payload);

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
