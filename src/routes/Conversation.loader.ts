import { Params } from 'react-router';

import { ConversationData, api } from '@api/conversations';

interface ConversationLoaderParams {
    params: Params<string>;
}

export interface ConversationLoaderResponse {
    conversationData: ConversationData;
}

export const loader = async ({
    params: { conversationId },
}: ConversationLoaderParams): Promise<ConversationLoaderResponse> => {
    if (typeof conversationId === 'undefined') {
        throw new Error(`Conversation ${conversationId} could not be found.`);
    }

    const conversationData = await api.getConversation(
        'default',
        conversationId,
    );

    return { conversationData };
};
