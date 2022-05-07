import settings from './config.js'
import rates from './rateLimit.js'



export default Object.assign({}, settings.serverSettings, settings.servicesSettings , rates)