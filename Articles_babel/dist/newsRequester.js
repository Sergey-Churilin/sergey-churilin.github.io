'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var requesterInstance = null;

/**
 * Class representing a request instance
 */

var NewsRequester = function () {
    /**
     * Creates only one instance of requester
     * @param {object} selectedValues - Selected values
     */
    function NewsRequester(selectedValues) {
        _classCallCheck(this, NewsRequester);

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


    _createClass(NewsRequester, [{
        key: 'requestNews',
        value: function requestNews() {
            var url = this._getNewsUrl();

            return fetch(url).then(function (response) {
                return response.json();
            }).then(function (response) {
                return response;
            }).catch(function (error) {
                return error;
            });
        }

        /**
         * Return request url
         * @return {string} Url for request
         */

    }, {
        key: '_getNewsUrl',
        value: function _getNewsUrl() {
            var endpoint = this._getEndpoint();

            var url = '' + URL_TO_API + endpoint + '=' + this._source + '&apiKey=' + API_KEY;

            if (this._searchString) {
                url = url + '&q=' + this._searchString;
            }

            if (this._language) {
                url = url + '&language=' + this._language;
            }

            if (this._country) {
                url = url + '&country=' + this._country;
            }

            return url;
        }

        /**
         * Return endpoint url
         * @return {string} Endpoint for url
         */

    }, {
        key: '_getEndpoint',
        value: function _getEndpoint() {
            var endpoint = void 0;

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
    }]);

    return NewsRequester;
}();