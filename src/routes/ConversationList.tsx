import { FunctionComponent } from 'react';
import { styled } from 'styled-components';
import { Link, useLoaderData } from 'react-router';
import { Button } from '@components/ui/Button';
import { Card, CardActions, CardContent } from '@components/ui/Card';

import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { EllipsisHeading } from '@components/EllipsisHeading';
import { CardList, CardListItem } from '@components/CardList';
import type { ConversationListLoaderData } from '@routes/ConversationList.loader';

// TODO create conversations layout (lesson cards are no good)
// TODO show if conversation is completed or not
// TODO * add logic that conversations can only be completed in order

const Item = styled(Link)`
    text-decoration: none;
`;

const ConversationCard = styled(Card)`
    width: 100%;
    min-height: 100%;
`;

export const ConversationList: FunctionComponent = () => {
    const { conversationsList } = useLoaderData() as ConversationListLoaderData;

    return (
        <CardList>
            {conversationsList.map((conversation) => (
                <CardListItem key={conversation.id}>
                    <Item to={`/conversations/${conversation.id}`}>
                        <ConversationCard>
                            <CardContent>
                                <EllipsisHeading size="s" gutter>
                                    {conversation.displayName}
                                </EllipsisHeading>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="text"
                                    size="small"
                                    data-lesson-id={conversation.id}
                                >
                                    <I18N
                                        textKey="lesson-list-practice-button"
                                        lang={I18NLangs.RU}
                                    ></I18N>
                                </Button>
                            </CardActions>
                        </ConversationCard>
                    </Item>
                </CardListItem>
            ))}
        </CardList>
    );
};
