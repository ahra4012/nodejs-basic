const express = require("express"); // express 임포트
const app = express(); // app생성
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const mongoose = require("mongoose");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("hello world!!");
});

app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.listen(port, () => console.log(`${port}포트입니다.`));

// 몽구스 연결
mongoose
  .connect(
    "mongodb+srv://ahra:zHDH1KWDzuaU8BHn@cluster0.rb50c.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("MongoDB conected"))
  .catch((err) => {
    console.log(err);
  });
