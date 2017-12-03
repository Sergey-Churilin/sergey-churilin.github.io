'use strict';
//constants

var API_KEY = 'f5d0ede14cdc42a990a57ff137f6c5ee';
var DEFAULT_IMG = 'images/defaultImage.png';
var URL_TO_API = 'https://newsapi.org/v2/';

var arrayEndpoints = [{
    'text': 'Top headlines',
    'path': 'top-headlines'
}, {
    'text': 'All articles',
    'path': 'everything'
}, {
    'text': 'All sources',
    'path': 'sources'
}];