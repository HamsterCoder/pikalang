import type { WordTopicDescription } from '@words/types';

import { topic as vegetables } from '@words/srb-ru/vegetables';
import { topic as fruit } from '@words/srb-ru/fruit';
import { topic as berries } from '@words/srb-ru/berries';
import { topic as kitchenware } from '@words/srb-ru/kitchenware';

/**
 * The order the topics appear in the library. Like `@lessons/srb-ru/sections`,
 * this is written by hand: there is no auto-discovery.
 */
export const topics: WordTopicDescription[] = [
    vegetables,
    fruit,
    berries,
    kitchenware,
];
