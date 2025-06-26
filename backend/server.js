const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

const corsOptions = {
  origin: ["http://localhost:5173/"],
  methods: "GET, POST, PUT, DELETE",
};

const MONGODB_URI = "mongodb://127.0.0.1:27017/fullstack";

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Database connection

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "fullstack",
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));

db.once("open", () => {
  console.log("Connected to MongoDB database");
});

// Database schema

const userschema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: Number,
  },
  { timestamps: true }
);

const UserModal = mongoose.model("user", userschema);

app.post("/post", async (req, res) => {
  const postData = new UserModal({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });
  await postData.save();
  console.log(postData);
  res.status(200).json({ message: "Data Received successfully" });
});

app.get("/get", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const datafrombackend = await UserModal.find();
  res
    .status(200)
    .json({ message: "data Received successfully", data: datafrombackend });
});

app.put("/put", async (req, res) => {
  const user = await UserModal.findByIdAndUpdate(
    req.body._id,
    -{
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!user) {
    return res
      .status(200)
      .json({ message: "user Not Found", UpdateData: user });
  } else {
    return res
      .status(200)
      .json({ message: "updated successfully", UpdateData: user });
  }
});

app.delete("/delete", async (req, res) => {
  const user = await UserModal.findByIdAndDelete(req.body._id);
  if (!user) {
    return res.status(200).json({ message: "user Not Found" });
  } else {
    return res.status(200).json({ message: "Delete successfully" });
  }
});

app.listen(5000);
