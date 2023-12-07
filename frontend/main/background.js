import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
const path = require('path');
const url = require('url');
const { exec } = require('child_process');
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    autoHideMenuBar: true,
    minWidth: 1000,
    minHeight: 600,
    width: 1000,
    height: 600,
    resizable: false,
  });

  const appDirectory = path.join(app.getAppPath(), '..');
  console.log(appDirectory);
  const filePath = path.join(appDirectory, '/backend/backend-0.0.1-SNAPSHOT.jar');
  
  if (isProd) {
    await mainWindow.loadURL('app://./loginPage.html')
    exec(`start ${filePath}`, (err, stdout, stderr) => {
      if (err) {
        console.error('Error opening file:', err);
        return;
      }
      console.log('File opened successfully:', stdout);
    });
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/loginPage`);
    mainWindow.webContents.openDevTools({mode:"detach"});
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

let token;
ipcMain.on('setToken', (event, t) => {
  token = t;
});
ipcMain.on('getToken', (event) => {
  event.returnValue = token;
});

let role;
ipcMain.on('setRole', (event, r) => {
  role = r;
});
ipcMain.on('getRole', (event) => {
  event.returnValue = role;
});