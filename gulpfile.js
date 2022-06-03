const
  PROJECT_FOLDER = 'dist',
  SOURSE_FOLDER  = 'src',
  COMPONENTS_PROJECT_FOLDER = 'dist/components',
  COMPONENTS_SOURSE_FOLDER  = 'src/components';

const path = {
  build: {
    html: `${PROJECT_FOLDER}/`,
    css: `${PROJECT_FOLDER}/css`,
    js: `${PROJECT_FOLDER}/js/`,
    ts: `${PROJECT_FOLDER}/ts/`,
    php: `${PROJECT_FOLDER}/php/`,
    img: `${PROJECT_FOLDER}/img/`,
    fonts: `${PROJECT_FOLDER}/fonts/`,
    files: `${PROJECT_FOLDER}/files/`,
  },
  src: {
    html: [`${SOURSE_FOLDER}/*.html`, `!${SOURSE_FOLDER}/_*.html`],
    css: `${SOURSE_FOLDER}/scss/style.scss`,
    js: `${SOURSE_FOLDER}/js//**/*.js`,
    ts: `${SOURSE_FOLDER}/ts/**/*.ts`,
    php: `${SOURSE_FOLDER}/php/*.php`,
    img: `${SOURSE_FOLDER}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    fonts: `${SOURSE_FOLDER}/fonts/*.ttf`,
    files: `${SOURSE_FOLDER}/files/**/*.*`,
  },
  watch: {
    html: `${SOURSE_FOLDER}/**/*.html`,
    css: `${SOURSE_FOLDER}/scss/**/*.scss`,
    js: `${SOURSE_FOLDER}/js/**/*.js`,
    ts: `${SOURSE_FOLDER}/ts/**/*.ts`,
    php: `${SOURSE_FOLDER}/php/**/*.php`,
    img: `${SOURSE_FOLDER}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
  },
  clean: `./${PROJECT_FOLDER}/`,
}

const componentsPath = {
  build: {
    html: `${COMPONENTS_PROJECT_FOLDER}/`,
    css: `${COMPONENTS_PROJECT_FOLDER}/`,
    js: `${COMPONENTS_PROJECT_FOLDER}/`,
    ts: `${COMPONENTS_PROJECT_FOLDER}/`,
  },
  src: {
    html: [`${COMPONENTS_SOURSE_FOLDER}/**/*.html`, `!${COMPONENTS_SOURSE_FOLDER}/**/_*.html`],
    css: `${COMPONENTS_SOURSE_FOLDER}/**/*.scss`,
    js: `${COMPONENTS_SOURSE_FOLDER}/**/*.js`,
    ts: `${COMPONENTS_SOURSE_FOLDER}/**/*.ts`,
  },
  watch: {
    html: `${COMPONENTS_SOURSE_FOLDER}/**/*.html`,
    css: `${COMPONENTS_SOURSE_FOLDER}/**/*.scss`,
    js: `${COMPONENTS_SOURSE_FOLDER}/**/*.js`,
    ts: `${COMPONENTS_SOURSE_FOLDER}/**/*.ts`,
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
  svgSprite     = require('gulp-svg-sprite'),
  typescript    = require('gulp-typescript');
  
const tsProject = typescript.createProject('tsconfig.json');
const tsComponentsProject = typescript.createProject('tsconfig.json');


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

function ts() {
  const tsResult = src(path.src.ts)
    .pipe(tsProject());

  return tsResult.js
    .pipe(dest(path.build.ts))
    .pipe( uglify() )
    .pipe( rename({
      extname: '.min.js'
    }) )
    .pipe(dest(path.build.ts))
    .pipe( browsersync.stream() );
}

function componentsHtml() {
  return src(componentsPath.src.html)
    .pipe( fileinclude() )
    .pipe( webphtml() )
    .pipe( dest(componentsPath.build.html) )
    .pipe( browsersync.stream() )
}

function componentsCss() {
  return src(componentsPath.src.css)
    .pipe( scss({
      outputStyle: 'expanded',
    }) )
    .pipe( group_media() )
    .pipe( autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      cascade: true,
    }) )
    .pipe( dest(componentsPath.build.css) )
    .pipe( clean_css() )
    .pipe( rename({
      extname: '.min.css'
    }) )
    .pipe( dest(componentsPath.build.css) )
    .pipe( browsersync.stream() )
}

function componentsJs() {
  return src(componentsPath.src.js)
    .pipe( babel({
      presets: ['@babel/env']
    }) )
    .pipe( dest(componentsPath.build.js) )
    .pipe( uglify() )
    .pipe( rename({
      extname: '.min.js'
    }) )
    .pipe( dest(componentsPath.build.js) )
    .pipe( browsersync.stream() )
}

function componentsTs() {
  const tsComponentsResult = src(componentsPath.src.ts)
    .pipe(tsComponentsProject());

  return tsComponentsResult.js
    .pipe(dest(componentsPath.build.ts))
    .pipe( uglify() )
    .pipe( rename({
      extname: '.min.js'
    }) )
    .pipe(dest(componentsPath.build.ts))
    .pipe( browsersync.stream() );
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

function php() {
  src(path.src.php)
    .pipe(dest(path.build.php))
    .pipe( browsersync.stream() );
}

function files(params) {
  src(path.src.files)
    .pipe(dest(path.build.files));
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
  gulp.watch([path.watch.ts], ts);
  gulp.watch([componentsPath.watch.html], componentsHtml);
  gulp.watch([componentsPath.watch.css], componentsCss);
  gulp.watch([componentsPath.watch.js], componentsJs);
  gulp.watch([componentsPath.watch.ts], componentsTs);
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.php], php);
}

function clean(params) {
  return del(path.clean);
}

const 
  build = gulp.series( clean, gulp.parallel(files, php, images, js, ts, css, html, componentsJs, componentsTs, componentsCss, componentsHtml) ),
  watch = gulp.parallel(build, watchFiles, browserSync);


exports.files             = files;
exports.php               = php;
exports.images            = images;
exports.js                = js;
exports.ts                = ts;
exports.css               = css;
exports.html              = html;
exports.componentsJs      = componentsJs;
exports.componentsTs      = componentsTs;
exports.componentsCss     = componentsCss;
exports.componentsHtml    = componentsHtml;
exports.build             = build;
exports.watch             = watch;
exports.default           = watch;
