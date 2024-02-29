import { ChallengeDescription } from '@components/Challenge/types';
import { LessonDescription } from '@components/Lesson/Lesson';
import { emulateLatency } from '@utils/emulateLatency';

import {
    challenges as challenges1,
    description as description1,
} from '../lessons/srb-ru/lesson-1-ru';
import {
    challenges as challenges2,
    description as description2,
} from '../lessons/srb-ru/lesson-2-ru';
import {
    challenges as challenges3,
    description as description3,
} from '../lessons/srb-ru/lesson-3-ru';
import {
    challenges as challenges4,
    description as description4,
} from '../lessons/srb-ru/lesson-4-ru';
import {
    challenges as challenges5,
    description as description5,
} from '../lessons/srb-ru/lesson-5-ru';
import {
    challenges as challenges6,
    description as description6,
} from '../lessons/srb-ru/lesson-6-ru';
import {
    challenges as challenges7,
    description as description7,
} from '../lessons/srb-ru/lesson-7-ru';
import {
    challenges as challenges8,
    description as description8,
} from '../lessons/srb-ru/lesson-8-ru';
import {
    challenges as challenges9,
    description as description9,
} from '../lessons/srb-ru/lesson-9-ru';
import {
    challenges as challenges10,
    description as description10,
} from '../lessons/srb-ru/lesson-10-ru';

import { sections } from '../lessons/srb-ru/sections';

const lessonsMap: Record<string, ChallengeDescription[]> = {
    [description1.id]: challenges1,
    [description2.id]: challenges2,
    [description3.id]: challenges3,
    [description4.id]: challenges4,
    [description5.id]: challenges5,
    [description6.id]: challenges6,
    [description7.id]: challenges7,
    [description8.id]: challenges8,
    [description9.id]: challenges9,
    [description10.id]: challenges10,
};

const descriptionMap: Record<string, LessonDescription> = {
    [description1.id]: description1,
    [description2.id]: description2,
    [description3.id]: description3,
    [description4.id]: description4,
    [description5.id]: description5,
    [description6.id]: description6,
    [description7.id]: description7,
    [description8.id]: description8,
    [description9.id]: description9,
    [description10.id]: description10,
};

const lessons: LessonDescription[] = [
    description1,
    description2,
    description3,
    description4,
    description5,
    description6,
    description7,
    description8,
    description9,
    description10,
];
const lessonDescriptions = lessons;

export function getLessonDescriptionById(
    lessonTopic: string,
    lessonId: string,
) {
    return descriptionMap[`${lessonTopic}/${lessonId}`];
}

export function isLessonIdValid(
    lessonTopic: string,
    lessonId: string,
): boolean {
    return typeof lessonsMap[`${lessonTopic}/${lessonId}`] !== 'undefined';
}

export function getLessonById(lessonTopic: string, lessonId: string) {
    return lessonsMap[`${lessonTopic}/${lessonId}`];
}

function getLocalStoragePath(username: string) {
    return `${username}/lessons_progress`;
}

interface SavedLessonProgress {
    recommendedTries: number;
    currentTries: number;
}

interface DisplayedLessonProgress {
    progress: number;
}

export interface LessonListItem
    extends LessonDescription,
        DisplayedLessonProgress {}

export interface SectionDescription {
    name: string;
    displayName: string;
    lessons: LessonListItem[];
}

function computeLessonProgress(
    progressData: Record<string, SavedLessonProgress> | null,
    lessonId: string,
) {
    const lessonProgress = progressData?.[lessonId];

    return lessonProgress
        ? Math.min(
              (lessonProgress.currentTries / lessonProgress.recommendedTries) *
                  100,
              100,
          )
        : 0;
}

export async function listLessons(
    username: string,
): Promise<SectionDescription[]> {
    if (import.meta.env.DEV) {
        await emulateLatency();
    }

    let lessons: LessonListItem[];
    let progressData: Record<string, SavedLessonProgress> | null;
    let preparedSections: SectionDescription[];

    try {
        progressData = JSON.parse(
            localStorage.getItem(getLocalStoragePath(username)) ?? 'null',
        );

        lessons = lessonDescriptions.map((lesson) => {
            return {
                ...lesson,
                progress: computeLessonProgress(progressData, lesson.id),
            };
        });

        const lessonListItemMap: Record<string, LessonListItem> = {};

        lessons.forEach((lessonDescription) => {
            lessonListItemMap[lessonDescription.id] = lessonDescription;
        });

        preparedSections = sections.map(({ name, displayName, lessonIds }) => {
            const sectionLessons = lessonIds.map(
                (lessonId) => lessonListItemMap[lessonId],
            );

            return {
                name,
                displayName,
                lessons: sectionLessons,
            };
        });
    } catch (error) {
        console.log(error);
        return Promise.reject('api.listLessons request failed');
    }

    return Promise.resolve(preparedSections);
}

/**
 * This function is called when the user completes a lesson and updates the number of tries
 * @param username - current username (for future use in a real API)
 * @param id - lesson id to save progress for
 * @returns
 */
export async function saveLessonProgress(
    username: string,
    id: string,
): Promise<void> {
    let progressData: Record<string, SavedLessonProgress> | null;

    try {
        progressData = JSON.parse(
            localStorage.getItem(getLocalStoragePath(username)) ?? 'null',
        );

        const updatedProgressData = progressData ?? {};

        updatedProgressData[id] = updatedProgressData[id] ?? {
            recommendedTries: 4,
            currentTries: 0,
        };
        updatedProgressData[id].currentTries += 1;

        localStorage.setItem(
            getLocalStoragePath(username),
            JSON.stringify(updatedProgressData),
        );
    } catch (error) {
        console.log(error);
        return Promise.reject('api.saveLessonProgress request failed');
    }

    return Promise.resolve();
}
