// Must be the first import: ES module imports are evaluated in the order
// they appear, so this has to run — and finish — before app.js is loaded,
// since app.js reads process.env at module top-level (CORS origin, morgan gate).
import "dotenv/config";

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Thoughtflows API listening on port ${PORT}`);
  });
});
