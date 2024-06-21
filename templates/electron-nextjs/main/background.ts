import * as path from 'path';
import serve from 'electron-serve';
import {app, BrowserWindow} from 'electron';
import {createWindow} from './helpers';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({directory: 'app'});
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

const startApplication = async () => {
  const mainWindow = createWindow('main', {
    width: 1200,
    height: 600,
    minWidth: 1000,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    frame: false, // Remove window frame
    titleBarStyle: 'hiddenInset', // Hide title bar on macOS
  });

  if (isProd) {
    await mainWindow.loadURL('app://./');
  } else {
    const port = process.argv[2] ?? 3000;
    await mainWindow.loadURL(`http://localhost:${port}/`);
    mainWindow.webContents.openDevTools();
  }
};

app.whenReady().then(startApplication);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) await startApplication();
});
