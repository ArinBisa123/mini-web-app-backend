const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const indexRouter = require("#routes/index.js");
const loginRouter = require("#routes/login.js");
const logoutRouter = require("#routes/logout.js");
const verifyRouter = require("#routes/verify.js");
const registerRouter = require("#routes/register.js");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/verify", verifyRouter);
app.use("/register", registerRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
