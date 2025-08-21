import Joi from "joi";

const allowedGameNames = [
  "Story Introduction",
  "Checkpoint Quiz",
  "Fluency Game",
  "Matching Game",
  "Word Swap",
  "Sentence Creator",
  "Drag and Drop Sorting",
  "Story Sequencing Puzzle",
  "Story Sequence MCQs",
  "Verb Hunt",
  "Passage Intro",
  "Clean or Hurt",
  "Masdar City",
  "Masdar City Summary",
  "Tricky Words",
  "Read to Rescue",
  "Pollution Police",
  "Tap the Word",
  "Dress On Cat"
];

const allowedLessons = [
  "Amina's Choice",
  "Eco Heroes of UAE",
  "The Fat Cat and the Rat"
];

const allowedPronunciation = ["Poor", "Average", "Good", "Excellent"];
const allowedSpeed = ["Slow", "Normal", "Fast"];
const allowedIntonation = ["Fair", "Varied", "Expressive"];

export const fluencyGames = ["Fluency Game", "Masdar City", "Read to Rescue"];

const progressValidator = {
  upsert: Joi.object({
    childId: Joi.number().required(),
    gameName: Joi.string()
      .valid(...allowedGameNames)
      .required()
      .messages({
        "any.only": `gameName must be one of: ${allowedGameNames.join(", ")}`
      }),
    lesson: Joi.string()
      .valid(...allowedLessons)
      .required()
      .messages({
        "any.only": `lesson must be one of: ${allowedLessons.join(", ")}`
      }),
    completed: Joi.boolean().required(),
    // correctAnswers: Joi.number().min(0).required(),
    // totalQuestions: Joi.number().min(1).required(),

    // 📌 Conditional validation:
    // completed: Joi.boolean().when("gameName", {
    //   is: "Fluency Game",
    //   then: Joi.forbidden(), // ❌ Not allowed for Fluency Game
    //   otherwise: Joi.required()
    // }),

    correctAnswers: Joi.number().min(0).when("gameName", {
      is: Joi.string().valid(...fluencyGames,  "Pollution Police", "Masdar City Summary"),
      then: Joi.forbidden(),
      otherwise: Joi.required()
    }),

    totalQuestions: Joi.number().min(1).when("gameName", {
      is: Joi.string().valid(...fluencyGames, "Pollution Police", "Masdar City Summary"),
      then: Joi.forbidden(),
      otherwise: Joi.required()
    }),

    // For Fluency Game only
    pronunciation: Joi.string().valid(...allowedPronunciation).when("gameName", {
      is: Joi.string().valid(...fluencyGames),
      then: Joi.required(),
      otherwise: Joi.forbidden()
    }),
    speed: Joi.string().valid(...allowedSpeed).when("gameName", {
      is: Joi.string().valid(...fluencyGames),
      then: Joi.required(),
      otherwise: Joi.forbidden()
    }),
    intonation: Joi.string().valid(...allowedIntonation).when("gameName", {
      is: Joi.string().valid(...fluencyGames),
      then: Joi.required(),
      otherwise: Joi.forbidden()
    }),
    paragraph: Joi.string().valid().when("gameName", {
      is: Joi.string().valid("Pollution Police", "Masdar City Summary"),
      then: Joi.required(),
      otherwise: Joi.forbidden()
    }),
  }),
};

export default progressValidator;