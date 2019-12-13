import { app, BrowserWindow, ipcMain } from 'electron';

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\');
}

let mainWindow;

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    title: 'SoundCloud Sync',
    width: 1000,
    height: 800,
    useContentSize: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(process.env.APP_URL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.openDevTools();

  mainWindow.webContents.on('did-finish-load', async () => {
    let serverPort = 3000;
    if (process.env.PROD) {
      const getServerPort = await import('../../src/background/server.js');
      serverPort = getServerPort();
    }
    mainWindow.webContents.send('serverPort', serverPort);
    ipcMain.on('getServerPort', () => {
      mainWindow.webContents.send('serverPort', serverPort);
    });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
