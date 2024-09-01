import { Router } from "express";
import {
  getNotifications,
  readNotification,
} from "../controllers/notifications.js"
const notificationRouter = new Router();

notificationRouter.get("/notifications/:userId", getNotifications);
notificationRouter.post("/notifications/read", readNotification);

export default notificationRouter;
