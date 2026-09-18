/**
 * Where a lesson sits on the learning path.
 *
 * `active` is the one unlocked lesson a section is currently pointing at: the
 * first one that has not reached full progress yet.
 */
export type LessonPathState = 'completed' | 'active' | 'locked';
