import { FunctionComponent } from 'react';
import { styled } from 'styled-components';
import { Link, useLoaderData } from 'react-router-dom';
import { Button, Card, CardActions, CardContent } from '@mui/material';

import { I18N, I18NLangs } from '@components/I18N/I18N';
import { ConversationDescription, api } from '@api/conversations';
import { EllipsisTypography } from '@components/EllispsisTypography';
import { CardList, CardListItem } from '@components/CardList';

// TODO create conversations layout (lesson cards are no good)
// TODO show if conversation is completed or not
// TODO * add logic that conversations can only be completed in order
// FIX investigate what is fast refresh warning

interface ConversationListLoaderData {
    conversationsList: ConversationDescription[];
}

export const loader = async (): Promise<ConversationListLoaderData> => {
    // TODO handle error
    const conversationsList = await api.listConversations('default');

    return { conversationsList };
};

const Item = styled(Link)`
    text-decoration: none;
`;

export const ConversationList: FunctionComponent = () => {
    const { conversationsList } = useLoaderData() as ConversationListLoaderData;

    return (
        <CardList>
            {conversationsList.map((conversation) => (
                <CardListItem key={conversation.id}>
                    <Item to={`/conversations/${conversation.id}`}>
                        <Card
                            sx={{
                                width: '100%',
                                minHeight: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <EllipsisTypography
                                    variant="heading_s"
                                    gutterBottom
                                >
                                    {conversation.displayName}
                                </EllipsisTypography>
                            </CardContent>
                            <CardActions sx={{ flexShrink: 0 }}>
                                <Button
                                    size="small"
                                    data-lesson-id={conversation.id}
                                >
                                    <I18N
                                        textKey="lesson-list-practice-button"
                                        lang={I18NLangs.RU}
                                    ></I18N>
                                </Button>
                            </CardActions>
                        </Card>
                    </Item>
                </CardListItem>
            ))}
        </CardList>
    );
};
