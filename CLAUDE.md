# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pikalang is a client-only React + TypeScript app (Vite) for learning Serbian, with the UI currently in Russian. It deploys to GitHub Pages at `https://hamstercoder.github.io/pikalang/` on every push to `main` (`.github/workflows/default.yml` runs `npm run build` and publishes `dist/`).

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

## Architecture

**Routing** (`src/routes/App.tsx`): uses `createHashRouter` (hash routing, needed for GitHub Pages). `vite.config.ts` sets `base: '/pikalang/'`. `AppModesLayout` wraps the `/lessons/` and `/conversations/` lists with the header. Lesson pages (`/lessons/:lessonTopic/:lessonId/`) and conversation pages are top-level routes without that layout. `App` also provides `EnvContext` (`mobile` is true when `#root` width ≤ 840px, via ResizeObserver), the MUI theme, and a React Query client.

**No backend.** Everything in `src/api/` imitates an async API on top of `localStorage` and statically imported lesson data. Functions return Promises, and list/get calls add fake latency in dev (`emulateLatency`). They take a `username` argument (currently always `'default'`) so a real API can replace them later. localStorage keys:

- `<username>`: `UserData` (xp)
- `<username>/lessons_progress`: per-lesson `{recommendedTries: 4, currentTries}`. Progress is `currentTries / recommendedTries`.
- `<username>/conversations_progress`

**Lessons are data in TypeScript files.** Each `src/lessons/srb-ru/lesson-N-ru.ts` exports a `description: LessonDescription` (whose `id` is `"<topic>/<name>"` and must match the URL params) and `challenges: ChallengeDescription[]`. To add a lesson:

1. Create the lesson file.
2. Import it in `src/api/lessons.ts` and add it to `lessonsMap`, `descriptionMap`, and the `lessons` array. This is manual, with no auto-discovery.
3. Add its id to a section in `src/lessons/srb-ru/sections.ts`. Sections control the order in the lesson list, and a lesson unlocks only once the previous lesson in its section reaches 100% progress.

`src/lessons/srb-en/` is not wired into the API.

**Challenges** (`src/components/Challenge/`): `ChallengeDescription` is a discriminated union on `ChallengeType` (`QUESTION_CHIPS`, `WORD_PICTURE`, `TRANSLATE_CHIPS`, `INSERT_CHIPS`). Each component exports its own `*Data` type. `Challenge.tsx` picks the component using type guards. A new challenge type needs an enum value, a union member in `types.ts`, a component, and a branch in `Challenge.tsx`. `InsertChips` sentences mark blanks with braces, e.g. `'Ja {razumem} srpski.'`. `Lesson.tsx` runs the flow (optional help screen → shuffled challenges → completion) with a reducer, then saves lesson progress and XP.

**Lesson help / verbs**: a `LessonDescription.help` of type `'conjugation'` renders `ConjugationTable`. Verb data lives in `src/lessons/srb-ru/verbs/` and is imported directly by `ConjugationTable.tsx`.

**Images**: challenges refer to images by bare name (e.g. `'tomato'`). `Picture` loads `assets/<name>.webp` / `.jpg` from `public/assets/`. Raw sources belong in `public/assets-raw-orig/` (original 1000×1000 JPEGs) or `public/assets-raw/` (Unsplash, which gets resized/cropped). `convert-images.js` compresses them into `public/assets/`. `src/dictionary/serbian-course.ts` maps Serbian words to en/ru translations for picture challenges.

**i18n**: `src/components/I18N/I18N.tsx` holds a hardcoded en/ru dictionary keyed by text key. Call sites currently pass `I18NLangs.RU`. Lesson content strings (hints, display names) are written directly in Russian.

## Conventions

- Use path aliases (`@components`, `@api`, `@utils`, `@routes`, `@hooks`, `@lessons`, `@conversations-data`, `@dictionary`, `@themes`) instead of relative imports; ESLint has a `no-restricted-imports` warning for `../`. Aliases are defined in both `vite.config.ts` and `tsconfig.json` and must be kept in sync.
- ESLint uses flat config in `eslint.config.js` (ESLint 10); there is no `.eslintrc.cjs`.
- A `.tsx` file may only export components: `react-refresh/only-export-components` is an error. Anything else shared between components goes in a `.ts` file next to it — route loaders in `<Route>.loader.ts`, enums and prop types in `types.ts`, shared styled-components in `<Component>.styles.ts`, React contexts in their own module (e.g. `routes/EnvContext.ts`).
- Import MUI icons from the `@mui/icons-material` barrel, not `@mui/icons-material/<Icon>`: that package has no `exports` map, so a deep import resolves to CommonJS and Vite 8 hands back a namespace object instead of the component.
- Styling mixes MUI components with `styled-components`.
- `index.html` is an EJS template: Google Analytics is only included when `env.PROD` is set.
