'use strict'

import url      from 'url'
import path     from 'path'
import dotenv   from 'dotenv'
import http     from './bootstrap/http'
import electron, { app, BrowserWindow } from 'electron'

dotenv.config()

http(() => use('Event').fire('Http.start'))

let main_window

app
    .on('ready', setUp)
    .on('activate', setUp)
    .on('window-all-closed', quit)

function setUp () {

    if (main_window === null) return

    main_window = new BrowserWindow({width: 1200, height: 900})

    main_window.setMenu(null)
    main_window.loadURL(url.format({
        protocol: 'http',
        slashes: true,
        hostname: process.env.HOST,
        port: process.env.PORT
    }))

    if (process.env.NODE_ENV === 'development') main_window.webContents.openDevTools()

    main_window.on('closed', () => main_window = null)
}

function quit () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
}
