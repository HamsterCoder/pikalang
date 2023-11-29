import { Params, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '@mui/material';

import { ConversationData, ConversationEntry, api } from '@api/conversations';
import { HeaderContainer } from '@components/Header/Header';
import { HintTooltip } from '@components/HintTooltip';
import { I18N, I18NLangs } from '@components/I18N/I18N';

// TODO mobile layout

interface ConversationLoaderParams {
    params: Params<string>;
}

interface ConversationLoaderResponse {
    conversationData: ConversationData;
}
// FIX inverstigate fast refresh problem
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
    padding: 0 40px;
    margin-bottom: 20px;
`;

const ConversationContainer = styled.div`
    max-width: 800px;
`;

const ConversationItem = styled(
    ({ className, align, phrase }: ConversationItemProps) => (
        <div className={className} data-align={align}>
            <div data-child="original">
                <Typography variant="body1">{phrase.text}</Typography>

                <Typography variant="body2">{phrase.actorName}</Typography>
            </div>

            <div data-child="translation">
                <Typography variant="body1">
                    {phrase.textTranslation}
                </Typography>

                <Typography variant="body2">
                    {phrase.actorNameTranslation}
                </Typography>
            </div>
        </div>
    ),
)`
    display: flex;

    margin-bottom: 20px;

    & > [data-child='translation'] {
        transition: opacity 0.1s ease-in;
        opacity: 0;
    }

    &:hover > [data-child='translation'] {
        opacity: 1;
    }

    & > [data-child] {
        padding: 4px 8px;
        margin-right: 10px;
        width: fit-content;
        border: 2px solid transparent;
        border-radius: 10px;
    }

    &[data-align='left'] {
    }

    &[data-align='left'] > [data-child='original'] {
        background-color: var(--primary-accent);
        color: var(--secondary-text);
    }

    &[data-align='right'] {
        flex-direction: row-reverse;
    }

    &[data-align='right'] > [data-child='original'] {
        border-color: var(--primary-accent);
        color: var(--primary-text);
    }

    & > [data-child='translation'] {
        background-color: var(--hint-color);
        color: var(--secondary-text);
    }
`;

export const Conversation = () => {
    const { conversationData } = useLoaderData() as ConversationLoaderResponse;

    return (
        <div>
            <HeaderContainer>
                <Typography variant="h4">
                    {conversationData.displayName}
                    <HintTooltip
                        text={conversationData.displayNameTranslation}
                    />
                </Typography>
            </HeaderContainer>
            <BodyContainer>
                <Typography variant="h5" gutterBottom>
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
