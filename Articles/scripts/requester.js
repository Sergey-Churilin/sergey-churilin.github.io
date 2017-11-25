/**
 * Class representing a request instance
 */
class NewsRequester{
    /**
     * Creates only one instance of requester
     */
    constructor(){
        if (!requesterInstance) {
            requesterInstance = this;
        }

        return requesterInstance;
    }

    set source(source){
        this._source = source;
    }
    set endpoint(_endpoint){
        this._endpoint = _endpoint;
    }
    set language(language){
        this._language = language;
    }
    set country(_country){
        this._country = _country;
    }
    set searchString(searchString){
        this._searchString = searchString;
    }

    /**
     * Make a fetch request to the server, return promise
     */
    requestNews(){
        let endpoint;

        switch(this._endpoint){
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

        let url = `${URL_TO_API}${endpoint}=${this._source}&apiKey=${API_KEY}`;

        if(this._searchString){
            url = `${url}&q=${this._searchString}`;
        }

        if(this._language){
            url = `${url}&language=${this._language}`;
        }

        if(this._country){
            url = `${url}&country=${this._country}`;
        }

        return new Promise(function(resolve, reject){
            fetch(url)
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error){
                    reject(error);
                });
        });

    }
}