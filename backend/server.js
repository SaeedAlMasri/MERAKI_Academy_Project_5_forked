const express = require("express");

const app =express();
const PORT =5000;
require("dotenv").config();
const db = require("./models/db");
const userRoute = require("./routes/usersRoute");
const roleRoute = require("./routes/roleRoute");
const itemRoute = require("./routes/itemRoute");
app.use(express.json())


app.use("/users",userRoute)
app.use("/roles",roleRoute)
app.use("/item",itemRoute)




app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});