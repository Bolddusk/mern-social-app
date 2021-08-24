const express = require("express");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path")

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
    console.log(process.env.MONGO_URL);
  }
);

app.use("/images",express.static(path.join(__dirname,"public/images")))

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req,file,cb)=>{
      console.log("Request");
      console.log(req.body?.name);
    //   cb(null,req.body?.name);
      cb(null,req.body.name || file.originalname);
  }
});

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File Uploaded successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  return res.json("Node Blog Development API v1.0");
});

app.listen(8800, () => {
  console.log("Backend server is runing at:\nhttp://localhost:" + 8800);
});
