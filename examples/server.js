const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(WebpackConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__',
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extends: true}))

const router = express.Router()
app.use(router)

router.get('/simple/get', (req, res) => {
    res.json({
        msg: 'hello world'
    })
})


const port = process.env.PORT || 8080;
module.exports = app.listen(port, () => {
    console.log(`server listening on http://127.0.0.1:${port}, ctrl + c to stop`);
})

