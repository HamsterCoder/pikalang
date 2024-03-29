import {
    data as data1,
    description as description1,
} from '../conversations-data/conversation-1-ru';
import { emulateLatency } from '@utils/emulateLatency';

export interface ConversationProgress {
    completed: boolean;
}

export interface ConversationEntry {
    actorId: number;
    actorName: string;
    actorNameTranslation: string;
    text: string;
    textTranslation: string;
}

export interface ConversationDescription extends ConversationProgress {
    id: number;
    displayName: string;
    displayNameTranslation: string;
}

export interface ConversationData extends ConversationDescription {
    data: ConversationEntry[];
}

const conversationDataMap: Record<string, ConversationEntry[]> = {
    '1': data1,
};

const conversationDescriptionsMap: Record<
    string,
    Omit<ConversationDescription, 'completed'>
> = {
    '1': description1,
};

const conversationDescriptions = Object.values(conversationDescriptionsMap);

function getLocalStoragePath(username: string) {
    return `${username}/conversations_progress`;
}

async function listConversations(
    username: string,
): Promise<ConversationDescription[]> {
    if (import.meta.env.DEV) {
        await emulateLatency();
    }

    let conversations: ConversationDescription[];
    let progressData: Record<string, ConversationProgress> | null;

    try {
        progressData = JSON.parse(
            localStorage.getItem(getLocalStoragePath(username)) ?? 'null',
        );

        conversations = conversationDescriptions.map((conversation) => {
            return {
                ...conversation,
                completed: progressData?.[conversation.id]?.completed ?? false,
            };
        });
    } catch (error) {
        console.log(error);
        return Promise.reject('api.listConversations request failed');
    }

    return Promise.resolve(conversations);
}

export interface ApiError {
    status: number;
    message: string;
    data?: unknown;
}

export function isApiError(error: any): error is ApiError {
    if (
        typeof error?.message !== 'undefined' &&
        typeof error?.status !== 'undefined' &&
        typeof error.status === 'number'
    ) {
        return true;
    } else {
        return false;
    }
}

async function getConversation(
    username: string,
    id: string,
): Promise<ConversationData> {
    if (import.meta.env.DEV) {
        await emulateLatency();
    }

    let conversation: ConversationData;
    let progressData: Record<string, ConversationProgress> | null;

    if (typeof id === 'undefined') {
        return Promise.reject({
            status: 400,
            message: `api.Conversation: Provide id to load conversation.`,
        } as ApiError);
    }

    try {
        progressData = JSON.parse(
            localStorage.getItem(getLocalStoragePath(username)) ?? 'null',
        );

        if (typeof conversationDescriptionsMap[id] === 'undefined') {
            return Promise.reject({
                status: 404,
                message: `api.Conversation: Conversation with id ${id} could not be found.`,
            } as ApiError);
        }

        conversation = {
            ...conversationDescriptionsMap[id],
            data: conversationDataMap[id],
            completed: progressData?.[id]?.completed ?? false,
        };
    } catch (error) {
        console.log(error);
        return Promise.reject({
            status: 500,
            message: `api.Conversation: Unexpected error occured.`,
            data: error,
        } as ApiError);
    }

    return Promise.resolve(conversation);
}

async function markConversationAsCompleted(
    username: string,
    id: string,
): Promise<void> {
    let progressData: Record<string, ConversationProgress>;

    try {
        progressData =
            JSON.parse(
                localStorage.getItem(getLocalStoragePath(username)) ?? 'null',
            ) ?? {};
        progressData[id] = { completed: true };

        localStorage.setItem(
            getLocalStoragePath(username),
            JSON.stringify(progressData),
        );
    } catch (error) {
        console.log(error);
        return Promise.reject('api.markConversationAsCompleted request failed');
    }

    return Promise.resolve();
}

export const api = {
    listConversations,
    getConversation,
    markConversationAsCompleted,
};
