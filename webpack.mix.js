const mix = require('laravel-mix');

class FooPlugin {

    dependencies() {
        return ['graphql','graphql-tag']
    }

    webpackRules() {
        return {
            test: /\.(gql|graphql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader'
        }
    }

}

mix.extend('graphql', new FooPlugin());



mix.js('resources/js/app.js', 'public/js')
    .postCss("resources/css/app.css", "public/css", [
        require("tailwindcss"),
    ])
    .graphql()
    // .browserSync({
    //    proxy: 'graphtrello.test'
    // });



if(mix.inProduction())
{
    mix.version()
}
