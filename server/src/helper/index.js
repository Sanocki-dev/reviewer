import Notification from "../models/Notifications.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const createNotification = async (params) => {
  try {
    // Create a notification
    const notification = new Notification({ ...params });
    await notification.save();
  } catch (error) {
    if (error.code === 11000) {
      console.log("Duplicate notification, not saved");
    }
  }
};

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString(); // 5-digit OTP

export const sendOTP = async (email) => {
  const OTP = generateOTP();

  try {
    const msg = {
      from: { email: process.env.SUPPORT_EMAIL, name: "R8Hub" }, // Your verified sender email
      personalizations: [
        {
          to: { email, name: "R8Hub" },
          dynamic_template_data: {
            otp: OTP,
          },
        },
      ],
      template_id: process.env.SENDGRID_TEMPLATE,
    };

    // Send the email
    // const response = await sgMail.send(msg);
    return OTP;
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};
