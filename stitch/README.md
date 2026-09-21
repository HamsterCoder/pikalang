# Stitch designs

Design exports from [Stitch](https://stitch.withgoogle.com/), kept as the
reference the UI was built against.

These are standalone Tailwind pages that are never built or served — the app
itself uses styled-components and the tokens in `src/themes/tokens.ts`. Open
them in a browser to compare against the real screens.

| File                                    | Screen                                                                                          |
| --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `lesson-list.html`                      | Lesson list and app shell, built in `src/components/LessonPath/` and `src/components/AppShell/` |
| `lesson-1.html`, `lesson-1-mobile.html` | Chip challenges, built in `src/components/LessonView/`                                          |
| `lesson-2.html`, `lesson-2-mobile.html` | Picture challenges, built in `src/components/LessonView/`                                       |

The lesson designs show a mascot, audio buttons, a hearts counter and a combo
bonus. Nothing backs those yet, so they are left out; the skip button is real
and counts as a wrong answer.
