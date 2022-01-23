const app = require("express")();
const env = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const router = require("./server/routes/route");
const dbConnect = require("./server/database/dbconnect");

env.config();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: true, extended: true }));
//database connection
dbConnect();

app.use("/", router);

app.listen(process.env.PORT || 5000, () =>
  console.log(`server is runing on ${process.env.PORT || 5000}`)
);
