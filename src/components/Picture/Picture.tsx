import { FunctionComponent } from 'react';
import { styled } from 'styled-components';
import { PictureImage } from '@components/Picture/PictureImage';

export interface PictureProps {
    image: string;
    selected?: boolean;
    onSelect?: (image: string) => void;
}

const Container = styled.div`
    width: 200px;
    height: 200px;
    padding: 10px;

    border-radius: 8px;
    border: 1px solid var(--primary-accent, #eee);

    transition: background 0.2s ease-in;

    &[data-selected='true'] {
        background-color: var(--primary-accent, #fff);
    }

    &[data-selectable='true'] {
        cursor: pointer;
    }

    &[data-selectable='true']&:hover {
        background-color: var(--primary-accent, #fff);
    }
`;

export const Picture: FunctionComponent<PictureProps> = ({
    image,
    selected,
    onSelect,
}) => {
    function onClick() {
        onSelect?.(image);
    }

    return (
        <Container
            data-selectable={typeof onSelect !== 'undefined'}
            data-selected={selected}
            onClick={onClick}
        >
            <PictureImage image={image} />
        </Container>
    );
};
