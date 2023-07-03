const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const UsersRoute = require("./routes/UserRoute");
const AuthRoute = require("./routes/AuthRoute");
const CoinRoute = require("./routes/CoinRoute");
const BankRoute = require("./routes/BankRoute");

dotenv.config();

// database connect
const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to Database Successfully!");
  } catch (error) {
    console.log("When connect to databse find an error!");
    console.log(" ");
    console.log(error);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected :(");
});

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/auth", AuthRoute);
app.use("/api/users", UsersRoute);
app.use("/api/bank", BankRoute);

const {multipleUpload} = require("./uploads/upload");
app.post("/api/coin", multipleUpload);
app.use("/api/coin", CoinRoute);



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    succes: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log("Server Connected Successfully!");
});
