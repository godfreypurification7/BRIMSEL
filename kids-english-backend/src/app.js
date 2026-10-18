const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Kids English API is running",
  });
});

app.use("/api/v1/chat", require("./routes/chat"));
app.use("/api/v1/progress", require("./routes/progress"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;