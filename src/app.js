const express = require("express");

const { sequelize } = require("./db");
const userRouter = require("./routes/user.router");
const gameRouter = require("./routes/game.router");
const config = require("./common/config");
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");

const app = express();

sequelize.sync();

app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/game", auth, gameRouter);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log("App is listening on 4000");
});
