const Joi = require("joi");

const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.string().max(255).required(),
  color: Joi.string().max(255).required(),
  duration: Joi.number().integer().required(),
})

const userSchema = Joi.object({
    email: Joi.string().email().max(255).required(),
    firstname: Joi.string().max(255).required(),
    lastname: Joi.string().max(255).required(),
    city: Joi.string().max(255).required(),
    language: Joi.string().max(255).required(),
  })

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration} = req.body;

  const { error } = movieSchema.validate(
    {title, director, year, color, duration}, 
    {abortEarly: false}
  )
  if (error) {
    res.status(422).json({ validationErrors: error.details})
  } else {
    next();
  }
}

const validateUser = (req, res, next) => {
    const { email, firstname, lastname, city, language } = req.body;
  
    const { error } = userSchema.validate(
      {email, firstname, lastname, city, language}, 
      {abortEarly: false}
    )
    if (error) {
      res.status(422).json({ validationErrors: error.details})
    } else {
      next();
    }
  }

module.exports = {validateMovie, validateUser}