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
import { DialogDescription, api } from '@api/dialogs';

// TODO create dialogs layout (lesson cards are no good)
// TODO show if dialog is completed or not
// TODO * add logic that dialogs can only be completed in order
// TODO investigate what is fast refresh warning

interface DialogListLoaderData {
    dialogsList: DialogDescription[];
}

export const loader = async (): Promise<DialogListLoaderData> => {
    // TODO handle error
    const dialogsList = await api.getDialogs('default');
    return { dialogsList };
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

export const DialogList: FunctionComponent = () => {
    const { dialogsList } = useLoaderData() as DialogListLoaderData;

    return (
        <>
            {dialogsList.map((dialog) => (
                <Item key={dialog.id} to={`/dialogs/${dialog.id}`}>
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
                                {dialog.displayName}
                            </EllipsisTypography>
                        </CardContent>
                        <CardActions sx={{ flexShrink: 0 }}>
                            <Button size="small" data-lesson-id={dialog.id}>
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
