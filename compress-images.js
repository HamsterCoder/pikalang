import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';

(async () => {
	let minificationResult = await imagemin(['./public/assets-raw-orig/*.jpg'], {
		destination: './public/assets',
		plugins: [
			imageminMozjpeg({ quality: 80 })
		]
	});

  console.log('Original images optimized by imagemin/mozjpeg');

  
  minificationResult = await imagemin(['./public/assets-raw/*.jpg'], {
		destination: './public/assets',
		plugins: [
			imageminMozjpeg({ quality: 70 })
		]
	});

	console.log('Web images optimized by imagemin/mozjpeg');
})();