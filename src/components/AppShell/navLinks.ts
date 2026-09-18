import type { LucideIcon } from 'lucide-react';
import { BookOpen, BookText, MessagesSquare } from 'lucide-react';

export interface AppNavLink {
    to: string;
    /** Key into the I18N dictionary. */
    labelKey: string;
    icon: LucideIcon;
    disabled?: boolean;
}

/**
 * The application's top-level destinations, shared by the desktop nav and the
 * mobile dock so the two can never drift apart.
 */
export const appNavLinks: AppNavLink[] = [
    {
        to: '/path/',
        labelKey: 'lesson-path-heading',
        icon: BookOpen,
    },
    {
        to: '/conversations/',
        labelKey: 'conversation-list-heading',
        icon: MessagesSquare,
    },
    {
        to: '/words/',
        labelKey: 'word-list-heading',
        icon: BookText,
        disabled: true,
    },
];
