import {BrowserWindow} from 'electron';

export default function createWindow(windowName, options) {

  const state = {
    minWidth: 1000,
    minHeight: 600,
    width: 1000,
    height: 600,
    resizable: false,
  }

  let win;
  win = new BrowserWindow({
    ...state,
    ...options,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      ...options.webPreferences,
    },
  });

  //win.setResizable(false); 
  
  return win;
};