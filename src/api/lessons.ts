import { ChallengeDescription } from '@components/Challenge/types';
import { LessonDescription } from '@components/Lesson/Lesson';

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

const lessonsMap: Record<string, ChallengeDescription[]> = {
    [description1.id]: challenges1,
    [description2.id]: challenges2,
    [description3.id]: challenges3,
    [description4.id]: challenges4,
    [description5.id]: challenges5,
    [description6.id]: challenges6,
    [description7.id]: challenges7,
    [description8.id]: challenges8,
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
];

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

export function getLessonsDescriptions(): LessonDescription[] {
    return lessons;
}
