const express = require("express");

const app =express();
const PORT =5000;
require("dotenv").config();
const db = require("./models/db");
const userRoute = require("./routes/usersRoute");
app.use(express.json())


app.use("/users",userRoute)






app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});