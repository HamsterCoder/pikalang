# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pikalang is a client-only React + TypeScript app (Vite) for learning Serbian, with the UI currently in Russian. It deploys to GitHub Pages at `https://hamstercoder.github.io/pikalang/` on every push to `main` (`.github/workflows/default.yml` runs `npm run build` and publishes `dist/`).

## Starting a session

Start every new chat by updating `main` before reading or changing any code:

```bash
git fetch origin main:main && git log --oneline HEAD..origin/main
```

If the current branch is behind `origin/main`, say so and rebase onto it before
making changes — never build on a stale tree. (`git fetch origin main:main`
updates the local `main` ref without checking it out, so it is safe to run from
a feature branch.)

## Commands

```bash
npm ci                    # install
npm run dev               # Vite dev server
npm run build             # tsc type-check + vite build
npm run lint              # eslint on src, --max-warnings 0 (warnings fail)
npm run tsc               # type-check only
npm run storybook         # Storybook on :6006
node convert-images.js    # regenerate public/assets/ after adding raw images
npx vite-bundle-visualizer
```

There is no test runner. Verify changes with `npm run build` and `npm run lint`.

Husky pre-commit runs lint-staged: prettier (single quotes, 4-space indent), then `eslint --fix` on staged ts/tsx.

## Git LFS

`*.jpg` and `*.webp` are stored in Git LFS (`.gitattributes`), and the husky `pre-push` hook fails without `git-lfs` installed. Without LFS, the files in `public/assets/` are just pointer text files, so images won't render locally. Run `git lfs install && git lfs pull` to fetch them.

## Pull requests

Before opening a pull request, always rebase the branch onto a freshly fetched `main`.

## Architecture

**Routing** (`src/routes/App.tsx`): uses `createHashRouter` (hash routing, needed for GitHub Pages). `vite.config.ts` sets `base: '/pikalang/'`. `AppLayout` wraps the `/lessons/` and `/conversations/` lists with the app shell. Lesson pages (`/lessons/:lessonTopic/:lessonId/`, rendered by `LessonView`) and conversation pages are top-level routes without that layout, since a lesson brings its own chrome. `App` also provides `EnvContext` (`mobile` is true when `#root` width ≤ 840px, via ResizeObserver), the MUI theme, and a React Query client.

**No backend.** Everything in `src/api/` imitates an async API on top of `localStorage` and statically imported lesson data. Functions return Promises, and list/get calls add fake latency in dev (`emulateLatency`). They take a `username` argument (currently always `'default'`) so a real API can replace them later. localStorage keys:

- `<username>`: `UserData` (xp)
- `<username>/lessons_progress`: per-lesson `{recommendedTries: 4, currentTries}`. Progress is `currentTries / recommendedTries`.
- `<username>/conversations_progress`

**Lessons are data in TypeScript files.** `src/lessons/types.ts` describes the shape of all of it — the lesson description, the challenge types and each challenge's `*Data` — so an author imports from one module. Each `src/lessons/srb-ru/lesson-N-ru.ts` exports a `description: LessonDescription` (whose `id` is `"<topic>/<name>"` and must match the URL params) and `challenges: ChallengeDescription[]`. To add a lesson:

1. Create the lesson file.
2. Import it in `src/api/lessons.ts` and add it to `lessonsMap`, `descriptionMap`, and the `lessons` array. This is manual, with no auto-discovery.
3. Add its id to a section in `src/lessons/srb-ru/sections.ts`. Sections control the order in the lesson list, and a lesson unlocks only once the previous lesson in its section reaches 100% progress.

`src/lessons/srb-en/` is not wired into the API.

**The lesson screen** (`src/components/LessonView/`): `LessonView` runs the flow (optional help screen → shuffled challenges → completion) with a reducer, then saves lesson progress and XP. `LessonTopBar` and `LessonFooter` are the chrome; which controls the footer offers is the whole difference between the help screen, an unanswered challenge, a checked one and the results.

The challenge components are **controlled**: each one renders the subject, collects an answer and reports it up, while the shell owns the check, the verdict and the move on. That is what lets all four types share one footer. An answer is a `string[]` whatever the type — the chosen words, one entry per blank, or the single chosen image — and `evaluate.ts` decides whether it is right, with the checking itself in `answers.ts`. A new challenge type needs an enum value and a union member in `src/lessons/types.ts`, a view, a branch in `ChallengeView.tsx`, and a case in `evaluate.ts`.

**Lesson help / verbs**: a `LessonDescription.help` of type `'conjugation'` renders `ConjugationTable`. Verb data lives in `src/lessons/srb-ru/verbs/` and is imported directly by `ConjugationTable.tsx`.

**Images**: challenges refer to images by bare name (e.g. `'tomato'`). `PictureImage` loads `assets/<name>.webp` / `.jpg` from `public/assets/`; framing and selection belong to whatever renders it. Raw sources belong in `public/assets-raw-orig/` (original 1000×1000 JPEGs) or `public/assets-raw/` (Unsplash, which gets resized/cropped). `convert-images.js` compresses them into `public/assets/`. `src/dictionary/serbian-course.ts` maps Serbian words to en/ru translations for picture challenges.

**i18n**: `src/components/I18N/I18N.tsx` holds a hardcoded en/ru dictionary keyed by text key. Call sites currently pass `I18NLangs.RU`. Lesson content strings (hints, display names) are written directly in Russian.

## Conventions

- Use path aliases (`@components`, `@api`, `@utils`, `@routes`, `@hooks`, `@lessons`, `@conversations-data`, `@dictionary`, `@themes`) instead of relative imports; ESLint has a `no-restricted-imports` warning for `../`. Aliases are defined in both `vite.config.ts` and `tsconfig.json` and must be kept in sync.
- ESLint uses flat config in `eslint.config.js` (ESLint 10); there is no `.eslintrc.cjs`.
- A `.tsx` file may only export components: `react-refresh/only-export-components` is an error. Anything else shared between components goes in a `.ts` file next to it — route loaders in `<Route>.loader.ts`, enums and prop types in `types.ts`, shared styled-components in `<Component>.styles.ts`, React contexts in their own module (e.g. `routes/EnvContext.ts`).
- **Design system**: `src/themes/tokens.ts` is the single source of truth for colours, the type scale, radii and shadows. Controls (buttons, chips, answer slots) use `radius.xl`; cards and panels use `radius.l`. The palette is anchored on the accent (hue 315, 55% saturation): status and reward colours are placed against those two numbers rather than picked at full saturation, and the neutrals carry the same hue at a whisper. A new colour that shouts louder than the brand is a bug. It is the styled-components theme (`${({ theme }) => theme.color.accent}`) and `src/themes/GlobalStyle.ts` also emits it as CSS custom properties (`var(--primary-accent)`) for plain CSS blocks. Restyling the app means editing the tokens, not the components.
- **Design in Storybook first.** Every new visual component gets a story in `src/stories/`, mirroring its folder, before it is wired into a screen — and so does every new variant, tone or state of an existing one. A story per state (empty, filled, locked, error) is what makes a component reviewable without playing through the app, and it is where we agree on the look. A component that only exists inside a route cannot be reviewed, so it is not done.
- **UI primitives** live in `src/components/ui/` (Button, IconButton, Fab, Chip, Card, Alert, ProgressBar, Spinner, Tooltip, Popover, TextLink). Build screens from these instead of styling raw elements; add a primitive plus a story when something is missing.
- Behaviour-only components (Tooltip, Popover) wrap [Radix](https://www.radix-ui.com/primitives) primitives, which handle positioning, focus, Escape and outside clicks. Everything visual is `styled-components`. Icons come from `lucide-react`.
- `Heading` and `Text` are the typography components; they take `size`/`type` plus `gutter`/`withMargin` rather than arbitrary style props.
- `index.html` is an EJS template: Google Analytics is only included when `env.PROD` is set.
