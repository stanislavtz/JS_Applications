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
        
        let result;

        this.beginRequest();

        try {
            result = await (await fetch(this.host(endPoint), options)).json;
        } catch (error) {
            result = await fetch(host(endPoint), options);
        }

        this.endRequest();

        return result;
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
}