"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing an article
 */
var Article =
/**
 * Create an article
 * @param {object} article - article object
 */
function Article(article) {
    _classCallCheck(this, Article);

    this.author = article.author;
    this.description = article.description;
    this.title = article.title;
    this.url = article.url;
    this.urlToImage = article.urlToImage;
    this.publishedAt = article.publishedAt;
};