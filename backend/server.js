const express = require("express");
const cors = require("cors");
const app =express();
const PORT =5000;
require("dotenv").config();
const db = require("./models/db");
const userRoute = require("./routes/usersRoute");
const roleRoute = require("./routes/roleRoute");
const itemRoute = require("./routes/itemRoute");
const favRoute = require("./routes/favoriteRoute");
const exchangeRoute = require("./routes/exchangeRoute");
const catRouter = require("./routes/categorieRoute");
app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));   

app.use("/users",userRoute)
app.use("/roles",roleRoute)
app.use("/item",itemRoute)
app.use("/fav",favRoute)
app.use("/cat",catRouter)
app.use("/exchange",exchangeRoute)


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});