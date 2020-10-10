const
  PROJECT_FOLDER = 'dist',
  SOURSE_FOLDER  = 'src';

const path = {
  build: {
    html: `${PROJECT_FOLDER}/`,
    css: `${PROJECT_FOLDER}/css`,
    js: `${PROJECT_FOLDER}/js/`,
    img: `${PROJECT_FOLDER}/img/`,
    fonts: `${PROJECT_FOLDER}/fonts/`,
  },
  src: {
    html: [`${SOURSE_FOLDER}/*.html`, `!${SOURSE_FOLDER}/_*.html`],
    css: `${SOURSE_FOLDER}/scss/style.scss`,
    js: `${SOURSE_FOLDER}/js/script.js`,
    img: `${SOURSE_FOLDER}/img/**/*.{jpg, png, svg, gif, ico, webp}`,
    fonts: `${SOURSE_FOLDER}/fonts/*.ttf`,
  },
  watch: {
    html: `${SOURSE_FOLDER}/**/*.html`,
    css: `${SOURSE_FOLDER}/scss/**/*.scss`,
    js: `${SOURSE_FOLDER}/js/**/*.js`,
    img: `${SOURSE_FOLDER}/img/**/*.{jpg, png, svg, gif, ico, webp}`,
  },
  clean: `./${PROJECT_FOLDER}/`,
}

const 
  { src, dest } = require('gulp'),
  gulp          = require('gulp'),
  browsersync   = require('browser-sync').create(), // browser reloader
  fileinclude   = require('gulp-file-include'), // include files
  del           = require('del'), // delete files
  scss          = require('gulp-sass'), // convert scss files to css
  autoprefixer  = require('gulp-autoprefixer'), // autoprefixer
  group_media   = require('gulp-group-css-media-queries'), // group media querirs
  clean_css     = require('gulp-clean-css'), // zip css
  rename        = require('gulp-rename'), // rename files
  uglify        = require('gulp-uglify-es').default, // zip js
  babel         = require('gulp-babel'), // babel
  imagemin      = require('gulp-imagemin'), // zip images
  webp          = require('gulp-webp'), // convert images to webp
  webphtml      = require('gulp-webp-html'), // select images format for html
  svgSprite     = require('gulp-svg-sprite');
  

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: `./${PROJECT_FOLDER}/`,
      port: 3000,
      notify: false,
    }
  });
}

function html() {
  return src(path.src.html)
    .pipe( fileinclude() )
    .pipe( webphtml() )
    .pipe( dest(path.build.html) )
    .pipe( browsersync.stream() )
}

function css() {
  return src(path.src.css)
    .pipe( scss({
      outputStyle: 'expanded',
    }) )
    .pipe( group_media() )
    .pipe( autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      cascade: true,
    }) )
    .pipe( dest(path.build.css) )
    .pipe( clean_css() )
    .pipe( rename({
      extname: '.min.css'
    }) )
    .pipe( dest(path.build.css) )
    .pipe( browsersync.stream() )
}

function js() {
  return src(path.src.js)
    .pipe( fileinclude() )
    .pipe( babel({
      presets: ['@babel/env']
    }) )
    .pipe( dest(path.build.js) )
    .pipe( uglify() )
    .pipe( rename({
      extname: '.min.js'
    }) )
    .pipe( dest(path.build.js) )
    .pipe( browsersync.stream() )
}

function images() {
  return src(path.src.img)
    .pipe( webp({
      quality: 70
    }) )
    .pipe( dest(path.build.img) )
    .pipe( src(path.src.img) )
    .pipe( imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 3 // from 0 to 7
    }) )
    .pipe( dest(path.build.img) )
    .pipe( browsersync.stream() )
}

gulp.task('svgSprite', () => {
  return gulp.src([`${SOURSE_FOLDER}/iconsprite/*.svg`])
    .pipe( svgSprite({
      mode: {
        stack: {
          sprite: '../icons/icons.svg', // sprite file name
          //example: true
        }
      }
    }) )
    .pipe( dest(path.build.img) )
});

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean(params) {
  return del(path.clean);
}

const 
  build = gulp.series( clean, gulp.parallel(images, js, css, html) ),
  watch = gulp.parallel(build, watchFiles, browserSync);


exports.images  = images;
exports.js      = js;
exports.css     = css;
exports.html    = html;
exports.build   = build;
exports.watch   = watch;
exports.default = watch;