# Real-Time Log Viewer

This application provides a real-time view of a log file through a web interface. It detects changes in the log file and instantly updates the display for connected users.

## Features
- **Real-time updates**: Automatically displays changes to the monitored log file.
- **Web-based interface**: Accessible through any modern web browser.
- **Configurable**: Easily specify the log file path and server port.

---

## Requirements
- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)

---

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install dependencies
Run the following command to install all required packages:
```bash
npm install
```

---

## Configuration

The application allows you to customize the log file path and server port using environment variables.

- **`LOG_FILE_PATH`**: The absolute path to the log file you want to monitor.
  - Example: `/path/to/your/logfile.log`
  - Default: `logging_for_emergency.log` (in the app's directory if not set)

- **`PORT`**: The port the server will listen on.
  - Example: `8080`
  - Default: `80`

### Set environment variables
You can set these variables in the terminal before starting the app:

```bash
export LOG_FILE_PATH=/path/to/your/logfile.log
export PORT=8080
```

Alternatively, use a `.env` file (if using a package like `dotenv`) to store your configuration.

---

## Running the Application

Start the server with the following command:

```bash
node app.js
```

After the server starts, you can access the application in your web browser at:

```
http://localhost:<PORT>
```

Replace `<PORT>` with the port number you configured, or use `80` if no custom port is set.

---

## Troubleshooting

- **Log file not found**: Ensure the file path in `LOG_FILE_PATH` is correct and that the file exists.
- **Permission issues**: Verify the log file is readable by the user running the app.
- **Port conflicts**: If the default port (`80`) is in use, configure a different port using the `PORT` environment variable.

---

## License
This project is licensed under the [MIT License](LICENSE).
