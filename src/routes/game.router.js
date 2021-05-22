const router = require("express").Router();

const {
  findAll,
  findOne,
  create,
  update,
  remove,
} = require("../controllers/game.controller");

router.get("/all", findAll);
router.get("/:id", findOne);
router.post("/create", create);
router.put("/update/:id", update);
router.delete("/remove/:id", remove);

module.exports = router;
