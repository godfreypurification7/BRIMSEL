const router = require("express").Router();
const controller = require("../controllers/progress.controller");
const { validateChildId } = require("../middleware/validate");

router.get("/:childId", validateChildId, controller.getProgress);
router.post("/:childId/reset", validateChildId, controller.resetProgress);

module.exports = router;