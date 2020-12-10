export default class API {
    constructor(appId, apiKey, beginRequest, endRequest) {
        this.appId = appId;
        this.apiKey = apiKey;

        this.beginRequest = () => {
            if (beginRequest) {
                beginRequest();
            }
        };

        this.endRequest = () => {
            if (endRequest) {
                endRequest();
            }
        }
    }

    host(endPoint) {
        return `https://api.backendless.com/${this.appId}/${this.apiKey}/${endPoint}`;
    }

    getOptions(headers) {
        const options = {
            headers: headers || {}
        }

        const token = sessionStorage.getItem('userToken');

        if (token) {
            Object.assign(options.headers, { 'user-token': token });
        }

        return options;
    }

    async get(endPoint) {
        const options = this.getOptions();

        this.beginRequest();
        const result = await fetch(this.host(endPoint), options);
        this.endRequest();

        try {
            return await result.json();
        } catch (error) {
            return result;
        }
    }

    async post(endPoint, obj) {
        const options = this.getOptions({ 'Content-Type': 'application/json' });
        options.method = 'POST';
        options.body = JSON.stringify(obj);

        this.beginRequest();
        const result = (await fetch(this.host(endPoint), options)).json();
        this.endRequest();

        return result;
    }

    async put(endPoint, obj) {
        const options = this.getOptions({ 'Content-Type': 'application/json' });
        options.method = 'PUT';
        options.body = JSON.stringify(obj);

        this.beginRequest();
        const result = (await fetch(this.host(endPoint), options)).json();
        this.endRequest();

        return result;
    }

    async del(endPoint) {
        const options = this.getOptions();
        options.method = 'DELETE';

        this.beginRequest();
        const result = (await fetch(this.host(endPoint), options)).json();
        this.endRequest();

        return result;
    }

    async register(email, password) {
        const result = await this.post('users/register', {
            email,
            password
        });

        if(result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        const loginResult = this.login(email, password);

        return loginResult;
    }

    async login(email, password) {
        const result = await this.post('users/login', {
            login: email,
            password
        });

        sessionStorage.setItem('email', result.email);
        sessionStorage.setItem('userToken', result['user-token']);
        sessionStorage.setItem('userId', result.objectId);

        return result;
    }

    async logout() {
        const result = await this.get('users/logout');
        sessionStorage.clear();

        return result;
    }
}