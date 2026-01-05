// EdgeOne Pages Node Functions - Express Entry Point
// Note: Environment variables are automatically available in EdgeOne Pages
import express from "express";

// Import API handlers
import gistCard from "./gist.js";
import statsCard from "./index.js";
import repoCard from "./pin.js";
import langCard from "./top-langs.js";
import wakatimeCard from "./wakatime.js";

const app = express();

// Add logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API routes - 访问路径会是 /api/*
app.get("/", statsCard);
app.get("/pin", repoCard);
app.get("/top-langs", langCard);
app.get("/wakatime", wakatimeCard);
app.get("/gist", gistCard);

// Export Express instance for EdgeOne Pages
export default app;
