import type { LucideIcon } from 'lucide-react';
import { BookOpen, MessagesSquare, Utensils, Zap } from 'lucide-react';

/**
 * The milestone icon per lesson topic, with a `default` for unknown ones.
 *
 * Look it up inline (`topicIcons[topic] ?? topicIcons.default`) rather than
 * through a helper: `react-hooks/static-components` reads a call that returns a
 * component as creating one during render.
 */
export const topicIcons: Record<string, LucideIcon> = {
    default: BookOpen,
    conversation: MessagesSquare,
    food: Utensils,
    verb: Zap,
};
