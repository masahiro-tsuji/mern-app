const router = require('express').Router();
const User = require('../models/User');

// CRUD操作
// ユーザー情報の取得
router.get('/:id', async (req, res) => {
  try {
    // findById...RequestパラメータのユーザーIDを取得する
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// ユーザー情報の更新
router.put('/:id', async (req, res) => {
  // req.body.id...mongoDBのUserSchemaの_id
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // findByIdAndUpdate...1つのユーザーを見つけて更新する(以下で言うreq.params.idに一致するmongoDB内のユーザー)
      await User.findByIdAndUpdate(req.params.id, {
        // $set...全てのschemaを指定
        $set: req.body,
      });
      res.status(200).json('ユーザー情報を更新しました。');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('自分のアカウントの時のみ情報を更新できます。');
  }
});
// ユーザー情報の削除
router.delete('/:id', async (req, res) => {
  // req.body.id...mongoDBのUserSchemaの_id
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // findByIdAndDelete...1つのユーザーを見つけて削除する(以下で言うreq.params.idに一致するmongoDB内のユーザー)
      await User.findByIdAndDelete(req.params.id, {
        // $set...全てのschemaを指定
        $set: req.body,
      });
      res.status(200).json('ユーザー情報を削除しました。');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('自分のアカウントの時のみ情報を削除できます。');
  }
});

// const User = require('.../moduls/User');
// localhost:3000/api/users のルートディレクトリとなる
// router.get("/",(req,res)=>{
//     res.send('users')
// })
module.exports = router;
