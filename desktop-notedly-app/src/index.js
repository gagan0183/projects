const { app, BrowserWindow } = require('electron');
const { is } = require('electron-util');

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    }
  });

  window.loadURL('http://localhost:1234');

  if (is.development) {
    window.webContents.openDevTools();
  }

  window.on('closed', () => {
    window = null;
  });
}

app.on('ready', createWindow);
