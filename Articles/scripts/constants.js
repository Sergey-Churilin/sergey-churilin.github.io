'use strict';
//constants
const API_KEY = "f5d0ede14cdc42a990a57ff137f6c5ee";
const DEFAULT_IMG = "images/defaultImage.png"//"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKmlsV_RI01siSEtxGGhU4vk2pHFyPKYoM2RQFWLPanrE6Vm2D";
const arraySources = [
    "abc-news",
    "bbc-sport",
    "bbc-news",
    "cnn",
    "fox-news",
    "google-news-ru"
];
const arrayEndpoints = [
    {
        'text' : 'Top headlines',
        'path' : 'top-headlines'
    },
    {
        'text' : 'All articles',
        'path' : 'everything'
    },
    {
        'text' : 'All sources',
        'path' : 'sources'
    }
];
const arrayLanguages = [
    {
        'lang' : 'ar',
        'desc' : 'Arabian'
    },
    {
        'lang' : 'en',
        'desc' : 'English'
    },
    {
        'lang' : 'de',
        'desc' : 'Deutch'
    },
    {
        'lang' : 'es',
        'desc' : 'Spain'
    },
    {
        'lang' : 'fr',
        'desc' : 'French'
    },
    {
        'lang' : 'it',
        'desc' : 'Italy'
    },
    {
        'lang' : 'pt',
        'desc' : 'Portuguese'
    },
    {
        'lang' : 'ru',
        'desc' : 'Russian'
    },
    {
        'lang' : 'sv',
        'desc' : 'Swedish'
    }
];

const arrayCountires = [
    {
        'lang' : 'ar',
        'desc' : 'Arabian'
    },
    {
        'lang' : 'de',
        'desc' : 'Deutch'
    },
    {
        'lang' : 'es',
        'desc' : 'Spain'
    },
    {
        'lang' : 'fr',
        'desc' : 'French'
    },
    {
        'lang' : 'it',
        'desc' : 'Italy'
    },
    {
        'lang' : 'pt',
        'desc' : 'Portuguese'
    },
    {
        'lang' : 'ru',
        'desc' : 'Russian'
    },
    {
        'lang' : 'sv',
        'desc' : 'Swedish'
    }
];

const URL_TO_API ="https://newsapi.org/v2/";