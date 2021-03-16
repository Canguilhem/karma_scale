const express = require("express");
const { Karma, validate } = require("../Models/KarmaSchema");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
  try {
    const karma = await Karma.find().sort();
    res.send(karma);
  } catch (err) {
    console.log(err.message);
  }
});

// POST Validate_Input>400 -> Construct Object -> Post -> return posted object
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);
    let karma = new Karma({
      proposition: req.body.proposition,
      weight: req.body.weight
    });
    karma = await karma.save();
    res.status(201).send(karma);
  } catch (error) {
    console.log(error);
  }
});

// PUT LookUp>404 -> Validate>400 -> Update -> Return updated object
router.put("/:id", async (req, res) => {
  try {
    // Validate Req.body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);
    // UPDATE FIRST METHOD:
    const karma = await Karma.findByIdAndUpdate(
      req.params.id,
      {
        proposition: req.body.proposition,
        weight: req.body.weight
      },
      { new: true, useFindAndModify: false }
    );
    if (!karma)
      return res.status(404).send(`Karma with id: ${req.params.id} not found`);
    res.send(karma);
  } catch (error) {
    console.log(error.message);
  }
});

// Delete LookUp>404 -> Delete -> Return deleted object
router.delete("/:id", async (req, res) => {
  const karma = await Karma.findByIdAndRemove(req.params.id, {
    useFindAndModify: false
  });
  if (!karma)
    return res.status(404).send(`Karma with id: ${req.params.id} not found`);
  res.send({
    msg: "Karma deleted",
    data: karma
  });
});

module.exports = router;
