/**
 * Class representing an article
 */
class Article {
    /**
     * Create an article
     * @param {object} article - article object
     */
    constructor(article) {
        this.author = article.author;
        this.description = article.description;
        this.title = article.title;
        this.url = article.url;
        this.urlToImage = article.urlToImage;
        this.publishedAt = article.publishedAt;
    }
}