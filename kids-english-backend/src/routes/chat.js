const router = require("express").Router();
const controller = require("../controllers/chat.controller");
const { validateChat } = require("../middleware/validate");

router.post("/", validateChat, controller.chat);

module.exports = router;
