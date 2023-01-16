const express = require("express");
const app = express();

const router = require("./routes/api");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(3000);
