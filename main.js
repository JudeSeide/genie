'use strict'

import url     from 'url'
import path    from 'path'
import http    from './bootstrap/http'
import { env } from './bootstrap/helper'
import electron, { app, BrowserWindow } from 'electron'

http(() => use('Event').fire('Http.start'))

let main_window

const app_env = env('NODE_ENV', 'production')

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
        hostname: env('HOST', 'localhost'),
        port: env('PORT', 80)
    }))

    if (app_env === 'development') main_window.webContents.openDevTools()

    main_window.on('closed', () => main_window = null)
}

function quit () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
}
