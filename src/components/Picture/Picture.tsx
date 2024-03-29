import { FunctionComponent } from 'react';
import { styled } from 'styled-components';
import { englishSerbianDictionary } from '../../dictionary/serbian-course';

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

const Image = styled.img`
    width: 100%;
    height: 100%;

    object-fit: cover;
`;

export const Picture: FunctionComponent<PictureProps> = ({
    image,
    selected,
    onSelect,
}) => {
    function onClick() {
        onSelect && onSelect(image);
    }

    return (
        <Container
            data-selectable={typeof onSelect !== 'undefined'}
            data-selected={selected}
            onClick={onClick}
        >
            <picture>
                <source srcSet={`assets/${image}.webp`} type="image/webp" />
                <source srcSet={`assets/${image}.jpg`} type="image/jpg" />
                <Image
                    src={`assets/${image}.jpg`}
                    alt={image}
                    title={englishSerbianDictionary[image.replace(/-/g, ' ')]}
                />
            </picture>
        </Container>
    );
};
