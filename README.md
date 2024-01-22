## About

[Try me](https://hamstercoder.github.io/pikalang/)

This app came to be from my effort to learn Serbian. I quite enjoyed the experience of other language learning apps, but I haven't found any Serbian courses there. This app serves to help me and possibly other people learn and repeat some basic aspects of Serbian.

More lessons will be gradually added.

## Contibuting

-   If you have a lesson idea or feedback on current lessons, please open an issue or you can join our [telegram](https://t.me/+dnIZ_udnkhtiZjEy).
-   If you like to contribute full lessons or any other code improvements, please open a pull request

## Development

Starting a vite dev server:

```
npm ci
npm run dev
```

Starting storybook:

```
npm run storybook
```

Checking bundle size:

```
npx vite-bundle-visualizer
```

### Images

This project uses images from unsplash as well as original images.

-   Original images must be high quality 1000x1000 pixels JPEGS.
-   Original images are stored in `public/assets-raw-orig/`
-   Original images are then compressed for production with mozjpeg and sharp, to create jpg and webp assets.
-   Unsplash images are resized and cropped to 1000x1000, and the compressed with mozjpeg and sharp.
-   Unsplash images are stored in `public/assets-raw/`

Whenever new images are added run:

```
node convert-images.js
```

## Future plans

Further more, there are plans to grow this into a generic intrument for making language courses through writing lessons in json-style configs. However, the following issues must be adressed to achieve this:

-   Switching base language for courses [currently RU]
-   Creating courses for different target languages, [currently SRB]
