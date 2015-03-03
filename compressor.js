var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); //Minify PNG, JPEG, GIF and SVG images
var imageResize = require('gulp-image-resize'); //canvia la grandaria de les imatges, necessita  GraphicsMagick or ImageMagick
var clean = require('gulp-clean');
function processImg (imatge) {
  //Funció que fa servir gulp per minificar i fer direrents resizes de la imatge
  //Quan fa unr esize de la imatge la guarda en diferents carpetes
 return gulp.src(imatge,{force: false})
          // compress and save
          .pipe(imagemin({optimizationLevel: 5}))
          .pipe(gulp.dest('images/og'))
          // save 300 x 200
          .pipe(imageResize({
            width: 300,
            height: 200,
            crop: false
          }))
          .pipe(gulp.dest('images/320'))
          // save 120 x 120
          .pipe(imageResize({
            width: 120,
            height: 120,
            crop: false
          }))
          .pipe(gulp.dest('images/120'))
          // save 48 x 48
          .pipe(imageResize({
            width: 48,
            height: 48,
            crop: false
          }))
          .pipe(gulp.dest('images/48'))
          .pipe(gulp.dest(__dirname+"/uploads"))
          .pipe(clean());  //esborra el fitxer original en la carpeta uploda
  
}

// Quan fem servir un ChildProcess per executar processImg
// Necesitem crear process.on("message") que és el procés que
// agafa el paràmetre a passar a la funció

process.on('message', function (images) {
  console.log('Comença el procesat de la imatge...');
  console.log(images);
  var stream = processImg(images);
  stream.on('end', function () {
    process.send('Procesat de la imatge compert');
    process.exit();
  });
  stream.on('error', function (err) {
    process.send(err);
    process.exit(1);
  });
});
module.exports = {};