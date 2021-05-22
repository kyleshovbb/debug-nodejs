const express = require("express");
const bodyParser = require("body-parser");

const { sequelize } = require("./db");
const userRouter = require("./routes/user.router");
const gameRouter = require("./routes/game.router");
const config = require("./common/config");
const auth = require("./middleware/validate-session");

const app = express();

sequelize.sync();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", userRouter);

app.use(auth);

app.use("/api/game", gameRouter);

app.listen(config.PORT, () => {
  console.log("App is listening on 4000");
});
