import express from "express";
import {
  createContact,
  deleteAContact,
  getAContact,
  getAllContact,
  updateContactStatus,
} from "../controllers/contactCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const contactRouter = express.Router();

contactRouter.post("/", authMiddleware, createContact);
contactRouter.get("/:id", authMiddleware, isAdmin, getAContact);  // restrictTo("admin", "user")
contactRouter.get("/", getAllContact);
contactRouter.delete("/:id", authMiddleware, isAdmin, deleteAContact);
contactRouter.put("/:id", authMiddleware, isAdmin, updateContactStatus);

export default contactRouter;
