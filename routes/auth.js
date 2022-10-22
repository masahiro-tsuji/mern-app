const router = require('express').Router();
const User = require('../models/User');

// ユーザー登録
router.post('/register', async (req, res) => {
  try {
    // res.body.○○ の部分は、Postmanで打ち込むAPIのリクエストボディ
    const newUser = new User({
      user_name: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save(); // save で保存
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ログイン機能
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send('ユーザーが見つかりません');

    const vailedPassword = req.body.password === user.password;
    if (!vailedPassword) return res.status(404).json('パスワードが違います');

    return res.status(202).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
