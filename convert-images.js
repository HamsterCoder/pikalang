import sharp from 'sharp';
import { globby } from 'globby';

const TARGET_WIDTH = 1000;
const TARGET_HEIGHT = 1000;
const TARGET_QUALITY_UNSPLASH = 70;
const TARGET_QUALITY_ORIG = 80;

const toAssetPath = (image, rawDir, ext) =>
    image.replace(`/${rawDir}/`, '/assets/').replace(/\.jpg$/, ext);

// 1. Compress JPGS with sharp (mozjpeg encoder)
// 2. Convert JPGS to WEBP with sharp
async function prepareOriginalImages() {
    const images = await globby(['public/assets-raw-orig/**.jpg']);

    await Promise.all(
        images.map(async (image) => {
            await sharp(image)
                .jpeg({ quality: TARGET_QUALITY_ORIG, mozjpeg: true })
                .toFile(toAssetPath(image, 'assets-raw-orig', '.jpg'));

            await sharp(image)
                .webp({ quality: TARGET_QUALITY_ORIG })
                .toFile(toAssetPath(image, 'assets-raw-orig', '.webp'));
        }),
    );

    console.log('Converted original images to webp:', images);
}

// 1. Crop & Resize & Compress JPGS with sharp (mozjpeg encoder)
// 2. Crop & Resize & Convert JPGS to WEBP with sharp
async function prepareUnsplashImages() {
    const unsplashImages = await globby(['public/assets-raw/**.jpg']);

    await Promise.all(
        unsplashImages.map(async (image) => {
            const resized = sharp(image).resize({
                width: TARGET_WIDTH,
                height: TARGET_HEIGHT,
            });

            await resized
                .clone()
                .jpeg({ quality: TARGET_QUALITY_UNSPLASH, mozjpeg: true })
                .toFile(toAssetPath(image, 'assets-raw', '.jpg'));

            await resized
                .clone()
                .webp({ quality: TARGET_QUALITY_UNSPLASH })
                .toFile(toAssetPath(image, 'assets-raw', '.webp'));
        }),
    );

    console.log('Converted unsplash images to webp:', unsplashImages);
}

await prepareOriginalImages();
await prepareUnsplashImages();
