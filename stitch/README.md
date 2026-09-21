# Stitch designs

Design exports from [Stitch](https://stitch.withgoogle.com/), kept as the
reference the UI was built against.

These are standalone Tailwind pages that are never built or served — the app
itself uses styled-components and the tokens in `src/themes/tokens.ts`. Open
them in a browser to compare against the real screens.

| File                                                 | Screen                                                                                          |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `lesson-list.html`                                   | Lesson list and app shell, built in `src/components/LessonPath/` and `src/components/AppShell/` |
| `lesson-1.html`, `lesson-1-mobile.html`              | Chip challenges, built in `src/components/LessonView/`                                          |
| `lesson-2.html`, `lesson-2-mobile.html`              | Picture challenges, built in `src/components/LessonView/`                                       |
| `learn-new-words.html`, `learn-new-word-mobile.html` | The new-word card, built in `src/components/WordLesson/WordCard.tsx`                            |
| `matching-words.html`, `matching-words-mobile.html`  | The timed matching round, built in `src/components/WordLesson/MatchBoard.tsx`                   |
| `error-screen.html`                                  | The dead end for a lesson or page that is not there, built in `src/components/ErrorScreen/`     |
| `error-mascot.png`, `success-mascot.png`             | The two pika illustrations, source for `src/assets/mascot-lost.webp` and `mascot-happy.webp`    |

The lesson designs show a mascot, audio buttons, a hearts counter and a combo
bonus. Nothing backs those yet, so they are left out; the skip button is real
and counts as a wrong answer. The picture options carry no captions either:
the learner is matching a Serbian word to a picture, so naming the pictures
would answer the challenge for them.

The error design's top bar carries the lesson chrome — a close button, the
streak and the hearts — which says nothing when the lesson it belongs to does
not exist, so the screen keeps only the mascot, the message and the way back.
Its mobile export was identical to the desktop one, so only the one file is
kept.

The mascots ship as PNGs on an opaque white square. The app uses webp cut-outs of them instead: the white was flood-filled from the edges, which the drawing's own dark outline stops, so the cream fur, the map and the confetti keep their pixels while the background goes transparent and the aura behind the art can show through. Re-cut them from these PNGs rather than editing the webp files.

The word designs drop the same unbacked pieces — hearts, the streak flame, the
combo XP banner and every audio control — and put a star tally and a stopwatch
in their place, which are the things the word lesson actually counts. The
matching tiles keep the mockup's hotkey badges and the gender line under the
Serbian word; the translation tiles carry no second line, because the category
labels in the mockup ("food & bakery", "dairy") are not data we hold.
