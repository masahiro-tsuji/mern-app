// Expressフレームワークでローカルサーバーを立ち上げる
const express = require('express');
const app = express();
// routeディレクトリ配下の各ファイルのrouterを持ってきている
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
// MongoDBの接続で使用
const mongoose = require('mongoose');
// .envの情報を取得するのに必要
require('dotenv').config();

const PORT = 3000;

// DB接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log('DBと接続中');
  })
  .catch((err) => {
    console.log(err);
  });

// ミドルウェアの設定
app.use(express.json()); // Expressで扱うのはjson形式である事を伝える
// 第一引数はエンドポイント、第二引数はミドルウェア関数(requestObとresponseObを受け取り、任意の処理を行う関数)
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);

/**
 * http://localhost:3000/ の '/' で getメソッドをrequest
 * responseで res.send がブラウザに表示される
 */
app.get('/', (req, res) => {
  res.send('hello express!!');
});

app.listen(PORT, () => console.log('サーバーが起動しました。'));
