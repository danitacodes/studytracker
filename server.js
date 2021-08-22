const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const User = require("./models/userModel");
const Study = require("./models/studyModel");
const protect = require("./middleware/authMiddleware");
const asyncHandler = require("express-async-handler");
const cors = require("cors");
const generateToken = require("./utils/generateToken");

const app = express();

app.use(express.json());

dotenv.config();
connectDB();

app.use(cors());

//Error
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
};

//Users
//Signin
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      password: user.password,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Email and password do not match.");
  }
});

app.post("/signin", authUser);

//Register
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      password: user.password,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

app.post("/signup", register);

//Update User
const update = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

app.post("/profile", protect, update);

//Study
// Create Study
const newStudy = async (req, res) => {
  const { assignment, minutes, subject, notes } = req.body;

  if (!assignment || !minutes || !subject || !notes) {
    res.status(400);
    throw new Error("Please fill in all fields");
  } else {
    const study = new Study({
      user: req.user._id,
      assignment,
      minutes,
      subject,
      notes,
    });

    const createdStudy = await study.save();

    res.status(201).json(createdStudy);
  }
};

app.post("/create", protect, newStudy);

//List Study
const getStudy = asyncHandler(async (req, res) => {
  const study = await Study.find({ user: req.user._id });
  res.json(study);
});

app.get("/", protect, getStudy);

//Update Study
const updateStudy = asyncHandler(async (req, res) => {
  const { assignment, minutes, subject, notes } = req.body;

  const study = await Study.findById(req.params.id);

  if (study.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot update study session");
  }

  if (study) {
    study.assignment = assignment;
    study.minutes = minutes;
    study.subject = subject;
    study.notes = notes;

    const update = await study.save();
    res.json(update);
  } else {
    res.status(404);
    throw new Error("Study session not found");
  }
});

app.put("/:id", protect, updateStudy);

//Delete Study
const remove = asyncHandler(async (req, res) => {
  const study = await Study.findById(req.params.id);

  if (study.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot delete");
  }

  if (study) {
    await study.remove();
    res.json({ message: "Study removed" });
  } else {
    res.status(404);
    throw new Error("Study not found");
  }
});

app.delete("/:id", protect, remove);

//Get a study
const getStudyById = asyncHandler(async (req, res) => {
  const study = await Study.findById(req.params.id);

  if (study) {
    res.json(study);
  } else {
    res.status(404).json({ message: "Study session not found" });
  }
});

app.get("/:id", getStudyById);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client/build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
