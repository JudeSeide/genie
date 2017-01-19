'use strict'

import dotenv from 'dotenv'

dotenv.config()

module.exports = {

    env : (key, default_value = '') => process.env[key] ? process.env[key] : default_value,

    config : (key, default_value = '') => (use('Config')).get(key, default_value)
}
