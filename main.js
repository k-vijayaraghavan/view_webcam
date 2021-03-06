// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

var mainWindow = null

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    "frame"         : false,
    //"always-on-top" : true,
    "skip-taskbar"  : true,
    "min-width"     : 144,
    "min-height"    : 104,
    "width"         : 320,
    "height"        : 240,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.setAlwaysOnTop(true);
  mainWindow.focus();
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//https://discuss.atom.io/t/managing-mainwindow-from-other-script/20823/5
//https://medium.com/@kahlil/how-to-communicate-between-two-electron-windows-166fdbcdc469
//https://stackoverflow.com/questions/19059580/client-on-node-uncaught-referenceerror-require-is-not-defined

ipcMain.on('resize', function (e, x, y) {
  //console.log("Resize");
  mainWindow.setSize(x, y)
})

ipcMain.on('ontop', function (e, set) {
  //console.log("ontop ", set);
  mainWindow.setAlwaysOnTop(set);
})
