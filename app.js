const express = require("express");
const path = require("path");
const morgan = require("morgan");

const { sequelize, User, Comment } = require("./models/index");

const app = express();
app.set("port", process.env.PORT || 8080);

sequelize
  .sync({ force: false })
  .then((res) => console.log("데이터베이스 연결 성공"))
  .catch((err) => console.log(err));

app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/").get(async (req, res) => {
  const result = await Comment.findAll({
    attributes: ["comment"],
    where: {
      UserId: 1,
    },
  });
  console.log(result);
  res.send(`hello world`);
});

app.listen(app.get("port"), () => {
  console.log(`app is running on http://localhost:${app.get("port")}`);
});
