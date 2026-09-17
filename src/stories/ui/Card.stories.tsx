import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card, CardActions, CardContent } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text/Text';

const meta = {
    title: 'UI/Card',
    component: Card,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The layout used by the conversation list. */
export const WithActions: Story = {
    render: () => (
        <Card style={{ maxWidth: '320px' }}>
            <CardContent>
                <Heading size="s" gutter>
                    Na pijaci
                </Heading>
                <Text type="secondary" withMargin={false}>
                    Диалог на рынке
                </Text>
            </CardContent>
            <CardActions>
                <Button variant="text" size="small">
                    Начать
                </Button>
            </CardActions>
        </Card>
    ),
};

export const ContentOnly: Story = {
    render: () => (
        <Card style={{ maxWidth: '320px' }}>
            <CardContent>
                <Text type="primary" withMargin={false}>
                    Карточка без действий.
                </Text>
            </CardContent>
        </Card>
    ),
};
