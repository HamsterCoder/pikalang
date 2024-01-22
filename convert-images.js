import sharp from 'sharp';
import { globby } from 'globby';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';

const TARGET_WIDTH = 1000;
const TARGET_HEIGHT = 1000;
const TARGET_QUALITY_UNSPLASH = 70;
const TARGET_QUALITY_ORIG = 80;

// 1. Compress JPGS with imagemin
// 2. Convert JPGS to WEBP with sharp
async function prepareOriginalImages() {
    const images = await globby(['public/assets-raw-orig/**.jpg']);

    await Promise.all(
        images.map(async (image) => {
            return await sharp(image)
                .webp({ quality: TARGET_QUALITY_ORIG })
                .toFile(
                    image
                        .replace('/assets-raw-orig/', '/assets/')
                        .replace('.jpg', '.webp'),
                );
        }),
    );

    await Promise.all(
        images.map(async (image) => {
            return imagemin([image], {
                destination: './public/assets/',
                plugins: [imageminMozjpeg({ quality: TARGET_QUALITY_ORIG })],
            });
        }),
    );

    console.log('Converted original images to webp:', images);
}

// 1. Crop & Resize JPGS with sharp, Compress JPGS with imagemin
// 2. Crop & Resize & Convert JPGS to WEBP with sharp

async function prepareUnsplashImages() {
    const unsplashImages = await globby(['public/assets-raw/**.jpg']);

    await Promise.all(
        unsplashImages.map(async (image) => {
            await sharp(image)
                .resize({ width: TARGET_WIDTH, height: TARGET_HEIGHT })
                .toFile(image.replace('/assets-raw/', '/assets/temp/'));

            await imagemin([image.replace('/assets-raw/', '/assets/temp/')], {
                destination: './public/assets/',
                plugins: [
                    imageminMozjpeg({ quality: TARGET_QUALITY_UNSPLASH }),
                ],
            });

            return await sharp(image)
                .resize({ width: TARGET_WIDTH, height: TARGET_HEIGHT })
                .webp({ quality: TARGET_QUALITY_UNSPLASH })
                .toFile(
                    image
                        .replace('/assets-raw/', '/assets/')
                        .replace('.jpg', '.webp'),
                );
        }),
    );

    console.log('Converted unsplash images to webp:', unsplashImages);
}

await prepareOriginalImages();
await prepareUnsplashImages();

// Experiments
// Example for a single image
// WEBP
// await sharp('public/assets-raw/blueberry-copy.jpg')
//     .resize({ width: TARGET_WIDTH, height: TARGET_HEIGHT })
//     .webp({ quality: TARGET_QUALITY })
//     .toFile('public/assets/blueberry-copy.webp');
// // JPEG 1
// await sharp('public/assets-raw/blueberry-copy.jpg')
//     .resize({ width: TARGET_WIDTH, height: TARGET_HEIGHT })
//     .jpeg({ quality: TARGET_QUALITY })
//     .toFile('public/assets/blueberry-copy-sharp.jpg');

// // JPEG 2
// await imagemin(['./public/assets-raw/blueberry-copy.jpg'], {
//     destination: './public/assets/temp',
//     plugins: [imageminMozjpeg({quality: TARGET_QUALITY })],
// });

// await sharp('public/assets/temp/blueberry-copy.jpg')
//     .resize({ width: TARGET_WIDTH, height: TARGET_HEIGHT })
//     .toFile('public/assets/blueberry-copy-moz-sharp.jpg');

// JPEG 3 Best JPEG way so far
// await sharp('public/assets-raw/blueberry-copy.jpg')
//     .resize({ width: TARGET_WIDTH, height: TARGET_HEIGHT })
//     .toFile('public/assets/temp/blueberry-copy-sharp.jpg');

// await imagemin(['./public/assets/temp/blueberry-copy-sharp.jpg'], {
//     destination: './public/assets/sharp-moz/',
//     plugins: [imageminMozjpeg({ quality: TARGET_QUALITY })],
// });
