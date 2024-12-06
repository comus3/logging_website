// app.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");
const path = require("path");

// Get the log file path from environment variable or fall back to default
const LOG_FILE_PATH = process.env.LOG_FILE_PATH || path.join(__dirname, "logging_for_emergency.log");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the frontend
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Real-Time Log Viewer</title>
      <script src="/socket.io/socket.io.js"></script>
    </head>
    <body>
      <h1>Log File Viewer</h1>
      <pre id="logContent"></pre>

      <script>
        const logElement = document.getElementById('logContent');
        const socket = io();

        // Update the log content when server sends new data
        socket.on('logUpdate', (data) => {
          logElement.textContent = data;
        });

        // Fetch initial log content when connected
        socket.on('connect', () => {
          socket.emit('requestInitialLog');
        });
      </script>
    </body>
    </html>
  `);
});

// Real-time communication
io.on("connection", (socket) => {
  console.log("A user connected");

  // Send the initial log content
  socket.on("requestInitialLog", () => {
    if (fs.existsSync(LOG_FILE_PATH)) {
      const data = fs.readFileSync(LOG_FILE_PATH, "utf-8");
      socket.emit("logUpdate", data);
    } else {
      socket.emit("logUpdate", "Log file not found.");
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Watch the log file for changes
if (fs.existsSync(LOG_FILE_PATH)) {
  fs.watchFile(LOG_FILE_PATH, { interval: 1000 }, () => {
    const data = fs.readFileSync(LOG_FILE_PATH, "utf-8");
    io.emit("logUpdate", data); // Send updated log content to all connected clients
  });
} else {
  console.error(`Log file not found: ${LOG_FILE_PATH}`);
}

// Start the server
const PORT = process.env.PORT || 80;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
