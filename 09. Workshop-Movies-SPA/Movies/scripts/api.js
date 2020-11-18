export default class API {
    constructor(appId, appKey, beginRequest, endRequest, endPoints) {
        this.appId = appId;
        this.appKey = appKey;
        this.beginRequest = () => {
            if (beginRequest) {
                beginRequest();
            }
        };
        this.endRequest = endRequest;
        this.endPoints = Object.assign({
            REGISTER: 'users/register',
            LOGIN: 'users/login',
            LOGOUT: 'users/logout',
        }, endPoints);
    }

    set endRequest() {
        return this._endRequest;
    };

    get endRequest(value) {
        if (value) {
            this._endRequest = value;
        }
    }

    host(endpoint) {
        return `https://api.backendless.com/${this.appId}/${this.appKey}/${endpoint}`;
    }

    getOptions(headers) {
        const token = localStorage.getItem('userToken');

        const options = {
            headers: headers || {}
        }

        if (token) {
            options.headers = Object.assign(options.headers, { "user-token": token })
        }

        return options;
    }

    async get(endpoint) {
        const options = this.getOptions();

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
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
    async registerFn(username, password) {
        const result = this.post(this.endPoints.REGISTER, {
            name: username,
            password
        });

        return result;
    }

    // login user
    async loginFn(username, password) {
        const result = this.post(this.endPoints.LOGIN, {
            login: username,
            password
        });

        localStorage.setItem('username', result.name);
        localStorage.setItem('userId', result.objectId);
        localStorage.setItem('userToken', result['user-token']);

        return result;
    }

    //logout user
    async logoutFn() {
        const result = this.get(this.endPoints.LOGOUT);
        localStorage.removeItem('userToken');

        return result;
    }
}