const { app, BrowserWindow } = require('electron');
const { is, setContentSecurityPolicy } = require('electron-util');
const config = require('./config');

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    }
  });

  if (is.development) {
    window.loadURL(config.LOCAL_WEB_URL);
  } else {
    window.loadURL(config.PRODUCTION_WEB_URL);
  }

  if (is.development) {
    window.webContents.openDevTools();
  }

  if (!is.development) {
    setContentSecurityPolicy(`
        default-src 'none';
        script-src 'self';
        img-src 'self' https://www.gravatar.com;
        style-src 'self' 'unsafe-inline';
        font-src 'self';
        connect-src 'self' ${config.PRODUCTION_API_URL}
        base-uri 'none';
        form-action 'none';
        frame-ancestors 'none';
    `);
  }

  window.on('closed', () => {
    window = null;
  });
}

app.on('ready', createWindow);
