const gulp = require('gulp'); //Instalando o pacote gulp
const sass = require ('gulp-sass')(require('sass')); //Importando os arquivos de forma composta
const sourcemaps = require ('gulp-sourcemaps'); //Importando o plugin 
const uglify = require ('gulp-uglify'); //Importando o plugin
const obfuscate = require('gulp-obfuscate'); //Importando o plugin
const imagemin = require('gulp-imagemin'); //Importando o plugin

function comprimeImagens() { //Criando a tarefa de compresão
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js') //local dos arquivos a serem comprimidos
        .pipe(uglify())
        .pipe(obfuscate()) //executando a obfuscação
        .pipe(gulp.dest('./build/scripts')) //local de destino dos arquivos comprimidos
}

function complilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed' //aqui estou comprimindo os arquivos para ocupar menos bites de memória
        }))
        .pipe(sourcemaps.write('./maps')) //()dentro do parenteses o local onde as pastas vão estar e não precisa colocar todo o caminho, só ./maps
        .pipe(gulp.dest('./build/styles')); //Direcionando para uma pasta de destino.
}

exports.default = function() { //Fazendo a compilação automaticamente
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(complilaSass)); //()O local dos arquivos que vão ser observados
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagens));
}