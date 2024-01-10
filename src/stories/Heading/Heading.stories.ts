import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from '@components/Heading';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Typography/Heading',
    component: Heading,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        // color: { control: 'color' },
    },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
        size: 'l',
        mobile: true,
        children: 'Big Heading',
    },
};

export const MediumMobile: Story = {
    args: {
        size: 'm',
        mobile: true,
        children: 'Medium Heading',
    },
};

export const SmallMobile: Story = {
    args: {
        size: 's',
        mobile: true,
        children: 'Small Heading',
    },
};
