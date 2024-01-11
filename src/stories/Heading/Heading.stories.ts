import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from '@components/Heading';

const meta = {
    title: 'Typography/Heading',
    component: Heading,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
    args: {
        size: 'l',
        children: 'Big Heading',
    },
};

export const Medium: Story = {
    args: {
        size: 'm',
        children: 'Medium Heading',
    },
};

export const Small: Story = {
    args: {
        size: 's',
        children: 'Small Heading',
    },
};

export const LargeMobile: Story = {
    args: {
        ...Large.args,
        mobile: true,
    },
};

export const MediumMobile: Story = {
    args: {
        ...Medium.args,
        mobile: true,
    },
};

export const SmallMobile: Story = {
    args: {
        ...Small.args,
        mobile: true,
    },
};

const accentBackground = { backgrounds: { default: 'accent' } };

export const LargeInverted: Story = {
    args: {
        ...Large.args,
        color: 'inverted',
    },
    parameters: {
        ...accentBackground,
    },
};

export const MediumInverted: Story = {
    args: {
        ...Medium.args,
        color: 'inverted',
    },
    parameters: {
        ...accentBackground,
    },
};

export const SmallInverted: Story = {
    args: {
        ...Small.args,
        color: 'inverted',
    },
    parameters: {
        ...accentBackground,
    },
};
