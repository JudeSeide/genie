'use strict'

require('dotenv').config()
require('./server')

const url   = require('url')
const path  = require('path')

const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let main_window

app.on('ready', createWindow)
.on('window-all-closed', quit)
.on('activate',createWindow)

function createWindow () {

    if (main_window === null) return

    main_window = new BrowserWindow({width: 1200, height: 900})

    main_window.setMenu(null)

    main_window.loadURL(url.format({
        protocol: 'http',
        slashes: true,
        hostname: process.env.HOST,
        port: process.env.PORT
    }))

    // Open the DevTools.
    // main_window.webContents.openDevTools()

    main_window.on('closed', () => {
        main_window = null
    })
}

function quit () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
}
