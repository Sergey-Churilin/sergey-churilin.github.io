/**
 * Class representing the main application logic
 */
class Application {
    constructor() {
        this.mainSection = document.getElementById('mainSection');
        const buttonGetArticle = document.getElementById('buttonArticle');
        buttonGetArticle.addEventListener('click', this._onButtonGetArticlePress.bind(this));

        const inputSearch = document.getElementById('inputSearch');
        inputSearch.addEventListener('keyup', this._onInputSearchKeyUp.bind(this));
    }

    /**
     * Handler, which fired when key up on search input
     */
    _onInputSearchKeyUp(e) {
        e = e || window.event;

        if (e.keyCode === 13) {
            this._onButtonGetArticlePress();
        }

        return false;
    }

    /**
     * Handler, which fired when GetArticle or enter button pressed
     */
    _onButtonGetArticlePress() {
        const selectedValues = this._getSelectedValues();
        const newsRequester = new NewsRequester(selectedValues);

        newsRequester.requestNews()
            .then(function (response) {
                if (response.status && response.status === 'error') {
                    const errorHandler = new ErrorHandler();
                    errorHandler.handleError(response);
                }
                const articles = response.articles;

                if (articles && articles.length > 0) {
                    this.mainSection.innerHTML = '';
                    const articlesWrapper = document.createElement('section');
                    articles.forEach(function (oneArticle, index) {
                        const article = new Article(oneArticle);
                        this.appendArticle(article, index, articlesWrapper);
                    }.bind(this));
                    this.mainSection.appendChild(articlesWrapper);
                } else {
                    this.mainSection.innerHTML = 'No content';
                }
            }.bind(this))
            .catch(function () {
                this.mainSection.innerHTML = 'No content';
            }.bind(this))
    }

    /**
     * Return selected values
     * @return {object} Object contains selected values
     */
    _getSelectedValues() {
        const selectSources = document.getElementById('selectSources');
        const source = selectSources.options[selectSources.selectedIndex].value;

        const selectEndpoints = document.getElementById('selectEndpoints');
        const endpoint = selectEndpoints.options[selectEndpoints.selectedIndex].value;

        const selectLanguages = document.getElementById('selectLanguages');
        let language = selectLanguages.options[selectLanguages.selectedIndex].value;

        const inputSearch = document.getElementById('inputSearch');
        let searchString = inputSearch.value;

        const selectCountries = document.getElementById('selectCountries');
        let country = selectCountries.options[selectCountries.selectedIndex].value;

        return {
            source,
            endpoint,
            language,
            searchString,
            country
        };
    }

    /**
     * Append an article to page
     *
     * @param {object} articleObj - Article object
     * @param {number} index - Index number of article
     * @param {object} articlesWrapper - DOM element where article will be appended
     */
    appendArticle(articleObj, index, articlesWrapper) {
        const section = document.createElement('section');
        section.classList.add('articleSection');

        const aside = document.createElement('aside');
        aside.classList.add('aside');

        const article = document.createElement('article');
        article.classList.add('article');

        this._appendTitleToArticle(article, articleObj.title, articleObj.url);
        this._appendDescriptionToArticle(article, articleObj.description, articleObj.url);
        this._appendImageToArticle(aside, articleObj.urlToImage, articleObj.url);
        this._appendAuthorToArticle(article, articleObj.author);
        this._appendPublishedDateToArticle(article, articleObj.publishedAt);

        section.appendChild(aside);
        section.appendChild(article);
        articlesWrapper.appendChild(section);

        this._stylizeSection(section, index, articlesWrapper);
    }

    /**
     * Append title to article
     *
     * @param {object} article - Article DOM element
     * @param {string} title - Article title
     * @param {string} urlToArticle - Link to article
     */
    _appendTitleToArticle(article, title, urlToArticle) {
        //create title for article on the page
        const h2 = document.createElement('h2');
        const aTitle = document.createElement('a');
        const aTitleText = document.createTextNode(title);
        aTitle.setAttribute('href', urlToArticle);
        aTitle.setAttribute('target', '_blank');
        aTitle.appendChild(aTitleText);
        h2.appendChild(aTitle);
        article.appendChild(h2);
    }

    /**
     * Append title to article
     *
     * @param {object} article - Article DOM element
     * @param {string} description - Article description
     * @param {string} urlToArticle - Link to article
     */
    _appendDescriptionToArticle(article, description, urlToArticle) {
        const pDesc = document.createElement('p');
        pDesc.classList.add('desc');

        const aDesc = document.createElement('a');
        const aDescText = document.createTextNode(description);
        aDesc.setAttribute('href', urlToArticle);
        aDesc.setAttribute('target', '_blank');
        aDesc.appendChild(aDescText);
        pDesc.appendChild(aDesc);
        article.appendChild(pDesc);
    }

    /**
     * Append title to article
     *
     * @param {object} aside -  Aside DOM element
     * @param {string} urlToImage - Link to image
     * @param {string} urlToArticle - Link to article
     */
    _appendImageToArticle(aside, urlToImage, urlToArticle) {
        const aImg = document.createElement('a');
        const img = new Image();
        aImg.setAttribute('href', urlToArticle);
        aImg.setAttribute('target', '_blank');

        if (urlToImage) {
            img.src = urlToImage;
        } else {
            img.src = DEFAULT_IMG;
        }

        img.onerror = function (oEvent) {
            if (img.src !== DEFAULT_IMG) {
                img.src = DEFAULT_IMG;
            }
        };

        img.classList.add('img');
        aImg.appendChild(img);
        aside.appendChild(aImg);
    }

    /**
     * Append title to article
     *
     * @param {object} article - Article DOM element
     * @param {string} author - Author of the article
     */
    _appendAuthorToArticle(article, author) {
        //create author for article on the page
        if (author) {
            const pAuthor = document.createElement('p');
            const pAuthorText = document.createTextNode(author);
            pAuthor.classList.add('author');
            pAuthor.appendChild(pAuthorText);
            article.appendChild(pAuthor);
        }
    }


    /**
     * Append title to article
     *
     * @param {object} article - Article DOM element
     * @param {string} date - Date when article was published
     */
    _appendPublishedDateToArticle(article, date) {
        //create published date for article on the page
        if (date) {
            const pDatePubliched = document.createElement('p');
            const oDate = new Date(date);

            const hours = oDate.getHours();
            const formattedHours = hours < 10 ? `0${hours}` : hours;

            const minutes = oDate.getMinutes();
            const formattedMinuter = minutes < 10 ? `0${minutes}` : minutes;

            const formattedDate = `${oDate.getDate()}/${oDate.getMonth()}/${oDate.getFullYear()}  ${formattedHours}:${formattedMinuter}`;
            const pDatePublichedText = document.createTextNode(formattedDate);
            pDatePubliched.classList.add('publishedDate');
            pDatePubliched.appendChild(pDatePublichedText);
            article.appendChild(pDatePubliched);
        }
    }

    /**
     * Append title to article
     *
     * @param {object} section - Section DOM element
     * @param {number} index - Index number of article
     * @param {object} articlesWrapper - DOM element where article will be appended
     */
    _stylizeSection(section, index, articlesWrapper) {
        const bOdd = index % 2 === 0;

        if (bOdd) {
            section.classList.add('sectionLeft');
        } else {
            section.classList.add('sectionRight');
            const sectionCleaner = document.createElement('section');
            sectionCleaner.classList.add('sectionCleaner');
            articlesWrapper.appendChild(sectionCleaner);
        }
    }
}
