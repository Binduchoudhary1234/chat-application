import Message from '../models/message.model.js';

// ========== SEND MESSAGE ==========
export const sendMessage = async (req, res) => {
  const { content, receiverId } = req.body;

  if (!content || !receiverId) {
    return res.status(400).json({ error: 'Content and receiverId are required' });
  }

  try {
    const message = await Message.create({
      sender: req.user.userId,
      receiver: receiverId,
      content,
    });

    res.status(201).json({
      message: 'Message sent successfully',
      data: message,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========== GET MESSAGES SENT BY LOGGED-IN USER ==========
export const getSentMessages = async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.user.userId })
      .populate('receiver', 'username email')
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========== GET CONVERSATION WITH A SPECIFIC USER ==========
export const getConversation = async (req, res) => {
  const otherUserId = req.params.userId;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.userId, receiver: otherUserId },
        { sender: otherUserId, receiver: req.user.userId },
      ],
    })
      .populate('sender', 'username')
      .populate('receiver', 'username')
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========== OPTIONAL: GET MESSAGES BY SPECIFIC USER ID ==========
export const getMessagesByUser = async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.params.userId })
      .populate('sender', 'username')
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
