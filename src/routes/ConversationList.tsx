import { FunctionComponent } from 'react';
import { styled } from 'styled-components';
import { Link, useLoaderData } from 'react-router-dom';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';

import { I18N, I18NLangs } from '@components/I18N/I18N';
import { ConversationDescription, api } from '@api/conversations';

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
    margin-left: 20px;
    margin-bottom: 20px;

    text-decoration: none;
`;

const EllipsisTypography = styled(Typography)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ConversationList: FunctionComponent = () => {
    const { conversationsList } = useLoaderData() as ConversationListLoaderData;

    return (
        <>
            {conversationsList.map((conversation) => (
                <Item
                    key={conversation.id}
                    to={`/conversations/${conversation.id}`}
                >
                    <Card
                        sx={{
                            width: 230,
                            minHeight: 180,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <CardContent sx={{ flexGrow: 1 }}>
                            <EllipsisTypography variant="body1" gutterBottom>
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
            ))}
        </>
    );
};
