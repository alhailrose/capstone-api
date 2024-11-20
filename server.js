import app from "./app.js";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";

dotenv.config();

const port = process.env.PORT || 3000;

testConnection();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
