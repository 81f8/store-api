const express = require("express");
const app = express();
const dashboard = require("./routers/dashboard");
const client = require("./routers/client");
const path = require("path");

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/api/v1/dashboard", dashboard);
app.use("/api/v1/client", client);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
