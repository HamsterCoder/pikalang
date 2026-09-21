import { ConversationDescription, api } from '@api/conversations';

export interface ConversationListLoaderData {
    conversationsList: ConversationDescription[];
}

export const loader = async (): Promise<ConversationListLoaderData> => {
    // If an error happens inside the loader, we will go to the route error screen
    // While the route is loading, the previous route is showing
    // TODO how to show loader??
    const conversationsList = await api.listConversations('default');

    // throw new Error('Could not load conversations');

    return { conversationsList };
};
