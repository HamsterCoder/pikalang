import { Params, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '@mui/material';

import { ConversationData, ConversationEntry, api } from '@api/conversations';
import { HeaderContainer } from '@components/Header/Header';
import { I18N, I18NLangs } from '@components/I18N/I18N';

// TODO mobile layout

interface ConversationLoaderParams {
    params: Params<string>;
}

interface ConversationLoaderResponse {
    conversationData: ConversationData;
}
// FIX investigate fast refresh problem
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

interface ConversationItemProps {
    className?: string;
    phrase: ConversationEntry;
    align: string;
}

const BodyContainer = styled.div`
    padding: 0 2rem;
    margin-bottom: 1rem;
`;

const ConversationContainer = styled.div`
    max-width: 840px;
`;

const ConversationItem = styled(
    ({ className, align, phrase }: ConversationItemProps) => (
        <div className={className} data-align={align}>
            <div data-child="original">
                <Typography variant="dialog" color="currentcolor">
                    {phrase.text}
                </Typography>

                <Typography variant="text_primary" color="currentcolor">
                    {phrase.actorName}
                </Typography>
            </div>

            <div data-child="translation">
                <Typography variant="dialog" color="currentcolor">
                    {phrase.textTranslation}
                </Typography>

                <Typography variant="text_primary" color="currentcolor">
                    {phrase.actorNameTranslation}
                </Typography>
            </div>
        </div>
    ),
)`
    display: flex;

    margin-bottom: 20px;

    & > [data-child='translation'] {
        transition:
            opacity,
            transform 0.2s ease-in;

        opacity: 0;
        visibility: hidden;
    }

    &[data-align='left'] > [data-child='translation'] {
        transform: translateX(-1rem);
    }

    &[data-align='right'] > [data-child='translation'] {
        transform: translateX(1rem);
    }

    & > [data-child='original']:hover + [data-child='translation'] {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
    }

    & > [data-child] {
        padding: 0.25rem 0.5rem;
        margin-right: 1rem;
        width: fit-content;
        border: 2px solid transparent;
        border-radius: 1rem;
    }

    &[data-align='left'] > [data-child='original'] {
        background-color: var(--primary-accent);
        color: var(--inverted-text-color);
    }

    &[data-align='right'] {
        flex-direction: row-reverse;
    }

    &[data-align='right'] > [data-child='original'] {
        border-color: var(--primary-accent);
        color: var(--text-color);
    }

    & > [data-child='translation'] {
        background-color: var(--hint-color);
        color: var(--inverted-text-color);
    }
`;

export const Conversation = () => {
    const { conversationData } = useLoaderData() as ConversationLoaderResponse;

    return (
        <div>
            <HeaderContainer>
                <Typography variant="heading_l" color="currentcolor">
                    {conversationData.displayName} /{' '}
                    {conversationData.displayNameTranslation}
                </Typography>
            </HeaderContainer>
            <BodyContainer>
                <Typography variant="heading_m" gutterBottom>
                    <I18N
                        textKey="conversation-prompt"
                        lang={I18NLangs.RU}
                    ></I18N>
                </Typography>
                <ConversationContainer>
                    {conversationData.data.map((phrase, index) => {
                        return (
                            <ConversationItem
                                key={index}
                                phrase={phrase}
                                align={phrase.actorId === 1 ? 'left' : 'right'}
                            />
                        );
                    })}
                </ConversationContainer>
            </BodyContainer>
        </div>
    );
};
