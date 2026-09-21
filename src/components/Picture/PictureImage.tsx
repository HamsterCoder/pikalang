import { styled } from 'styled-components';

import { englishSerbianDictionary } from '@dictionary/serbian-course';

export interface PictureImageProps {
    /** The bare asset name, e.g. `tomato` or `sweet-pepper`. */
    image: string;
    className?: string;
}

const Image = styled.img`
    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;
`;

/**
 * The image itself, with the webp/jpg pair `convert-images.js` writes into
 * `public/assets/`. Framing and selection belong to whatever renders it.
 */
export const PictureImage = ({ image, className }: PictureImageProps) => {
    return (
        <picture className={className}>
            <source srcSet={`assets/${image}.webp`} type="image/webp" />
            <source srcSet={`assets/${image}.jpg`} type="image/jpg" />
            <Image
                src={`assets/${image}.jpg`}
                alt={image}
                title={englishSerbianDictionary[image.replace(/-/g, ' ')]}
            />
        </picture>
    );
};
