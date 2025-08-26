"use strict";
// src/resources/gameProgress/lessonGameMap.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedGameNames = exports.allowedLessons = exports.lessonGameMap = void 0;
exports.lessonGameMap = {
    "Amina's Choice": [
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
    ],
    "Eco Heroes of UAE": [
        "Passage Intro",
        "Clean or Hurt",
        "Masdar City",
        "Masdar City Summary",
        "Tricky Words",
        "Read to Rescue",
        "Pollution Police",
    ],
    "The Fat Cat and the Rat": [
        "Tap the Word",
        "Dress On Cat",
        "Cat Trick Quest",
    ],
};
// Helper arrays (derived automatically)
exports.allowedLessons = Object.keys(exports.lessonGameMap);
exports.allowedGameNames = Object.values(exports.lessonGameMap).flat();
