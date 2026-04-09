const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

let attendance = [];

app.get("/", (req, res) => {
  res.send("SmartMessX Backend Running 🚀");
});

app.post("/attendance", (req, res) => {
  const { name } = req.body;

  const record = {
    name,
    date: new Date().toLocaleString()
  };

  attendance.push(record);

  res.json({
    message: "Attendance marked",
    data: record
  });
});

app.get("/attendance", (req, res) => {
  res.json(attendance);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});