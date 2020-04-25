require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log(`[MongoDB]: Connected to database successfully`))
  .catch((err) => console.log(`[MongoError]: ${err}`));

const posts = require("./server/routes/api/posts");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes middleware
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "dist")));
  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/dist/index.html"));
}

app.listen(PORT, (err) => {
  if (err) throw new Error(err);
  console.log(`[Server]: Listening on port ${PORT}`);
});
