import { useLoaderData } from 'react-router';
import styled from 'styled-components';

import { ConversationEntry } from '@api/conversations';
import { BaseHeader, HeaderContainer } from '@components/Header/Header.styles';
import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text/Text';
import type { ConversationLoaderResponse } from '@routes/Conversation.loader';
import { EnvContext } from '@routes/EnvContext';
import { useContext } from 'react';

// TODO mobile layout
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
                <Text type="dialog" color="currentColor">
                    {phrase.text}
                </Text>

                <Text type="primary" color="currentColor" withMargin={false}>
                    {phrase.actorName}
                </Text>
            </div>

            <div data-child="translation">
                <Text type="dialog" color="currentColor">
                    {phrase.textTranslation}
                </Text>

                <Text type="primary" color="currentColor" withMargin={false}>
                    {phrase.actorNameTranslation}
                </Text>
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

    const { mobile } = useContext(EnvContext);

    return (
        <div>
            <HeaderContainer>
                <BaseHeader>
                    <Heading size="l" color="inverted" mobile={mobile}>
                        {conversationData.displayName} /{' '}
                        {conversationData.displayNameTranslation}
                    </Heading>
                </BaseHeader>
            </HeaderContainer>
            <BodyContainer>
                {/* // TODO use Prompt component from Challenge? */}
                <Heading size="m" color="default" sx={{ marginBottom: '1rem' }}>
                    <I18N
                        textKey="conversation-prompt"
                        lang={I18NLangs.RU}
                    ></I18N>
                </Heading>
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
