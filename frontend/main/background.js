import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd = process.env.NODE_ENV === 'production';

//Make listener for API calls


if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    minWidth: 1000,
    minHeight: 600,
    width: 1000,
    height: 600,
    resizable: false,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
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