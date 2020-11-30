import API from './api.js';
import { beginReuest, endRequest } from './notifications.js';

const appId = '87C3AB14-E119-BD37-FF9F-C2C061722D00';
const apiKey = '88A2580B-0189-406A-96D6-B2A923CEF601';

const api = new API(appId, apiKey, beginReuest, endRequest);

export const registerFn = api.register.bind(api);
export const loginFn = api.login.bind(api);
export const logoutFn = api.logout.bind(api);