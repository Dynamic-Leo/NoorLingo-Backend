// src/resources/gameProgress/lessonGameMap.ts

export const lessonGameMap: Record<string, string[]> = {
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
export const allowedLessons = Object.keys(lessonGameMap);
export const allowedGameNames = Object.values(lessonGameMap).flat();
