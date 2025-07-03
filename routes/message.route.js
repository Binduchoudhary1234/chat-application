import express from 'express';
import {
  sendMessage,
  getSentMessages,
  getConversation,
  getMessagesByUser
} from '../controllers/message.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/sent', protect, getSentMessages);
router.get('/conversation/:userId', protect, getConversation);
router.get('/user/:userId', protect, getMessagesByUser); // optional

export default router;
