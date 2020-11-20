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
        };

        // this.endPoints = endPoints;
    }

    host(endpoint) {
        return `https://api.backendless.com/${this.appId}/${this.apiKey}/${endpoint}`;
    }

    getOptions(headers) {
        const token = localStorage.getItem('userToken');

        const options = {
            headers: headers || {}
        }

        if (token) {
            Object.assign(options.headers, { "user-token": token })
        }

        return options;
    }

    async get(endpoint) {
        const options = this.getOptions();

        this.beginRequest();
        const result = await fetch(this.host(endpoint), options);
        this.endRequest();

        return result;
    }

    async post(endpoint, body) {
        const options = this.getOptions({ "Content-Type": "application/json" });
        options.method = "POST";
        options.body = JSON.stringify(body);

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async put(endpoint, body) {
        const options = this.getOptions({ "Content-Type": "application/json" });
        options.method = "PUT";
        options.body = JSON.stringify(body);

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async delete(endpoint) {
        const options = this.getOptions();
        options.method = "DELETE";

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    // register user
    async register(username, password) {
        const result = await this.post('users/register', {
            name: username,
            password
        });

        return result;
    }

    // login user
    async login(username, password) {
        const result = await this.post('users/login', {
            login: username,
            password
        });

        localStorage.setItem('username', result.name);
        localStorage.setItem('userId', result.objectId);
        localStorage.setItem('userToken', result['user-token']);

        return result;
    }

    //logout user
    async logout() {
        const result = await this.get('users/logout');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('userToken');

        return result;
    }
}