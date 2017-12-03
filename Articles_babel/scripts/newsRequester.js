let requesterInstance = null;

/**
 * Class representing a request instance
 */
class NewsRequester {
    /**
     * Creates only one instance of requester
     * @param {object} selectedValues - Selected values
     */
    constructor(selectedValues) {
        if (!requesterInstance) {
            requesterInstance = this;
        }

        requesterInstance._source = selectedValues.source;
        requesterInstance._endpoint = selectedValues.endpoint;
        requesterInstance._language = selectedValues.language;
        requesterInstance._country = selectedValues.country;
        requesterInstance._searchString = selectedValues.searchString;

        return requesterInstance;
    }

    /**
     * Make a fetch request to the server, return promise
     */
    requestNews() {
        const url = this._getNewsUrl();

        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return (error);
            });
    }

    /**
     * Return request url
     * @return {string} Url for request
     */
    _getNewsUrl() {
        const endpoint = this._getEndpoint();

        let url = `${URL_TO_API}${endpoint}=${this._source}&apiKey=${API_KEY}`;

        if (this._searchString) {
            url = `${url}&q=${this._searchString}`;
        }

        if (this._language) {
            url = `${url}&language=${this._language}`;
        }

        if (this._country) {
            url = `${url}&country=${this._country}`;
        }

        return url;
    }

    /**
     * Return endpoint url
     * @return {string} Endpoint for url
     */
    _getEndpoint() {
        let endpoint;

        switch (this._endpoint) {
            case 'top-headlines':
                endpoint = 'top-headlines?sources';
                break;
            case 'everything':
                endpoint = 'everything?';
                break;
            case 'sources':
                endpoint = 'sources?';
                break;
            default:
                endpoint = 'top-headlines?sources';
                break;
        }

        return endpoint;
    }
}