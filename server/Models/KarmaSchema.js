const Joi = require("joi");
const mongoose = require("mongoose");

const KarmaSchema = new mongoose.Schema({
  proposition: String,
  weight: Number
});

const Karma = mongoose.model("Karma", KarmaSchema);

function validateKarma(k) {
  const schema = Joi.object({
    proposition: Joi.string()
      .min(5)
      .required(),
    weight: Joi.number()
  });
  return schema.validate(k);
}

exports.Karma = Karma;
exports.validate = validateKarma;
