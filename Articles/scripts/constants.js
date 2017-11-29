'use strict';
//constants
const API_KEY = 'f5d0ede14cdc42a990a57ff137f6c5ee';
const DEFAULT_IMG = 'images/defaultImage.png';
const URL_TO_API = 'https://newsapi.org/v2/';

const arrayEndpoints = [
    {
        'text': 'Top headlines',
        'path': 'top-headlines'
    },
    {
        'text': 'All articles',
        'path': 'everything'
    },
    {
        'text': 'All sources',
        'path': 'sources'
    }
];

