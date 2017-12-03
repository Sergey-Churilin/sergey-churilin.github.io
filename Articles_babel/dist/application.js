'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing the main application logic
 */
var Application = function () {
    function Application() {
        _classCallCheck(this, Application);

        this.mainSection = document.getElementById('mainSection');
        var buttonGetArticle = document.getElementById('buttonArticle');
        buttonGetArticle.addEventListener('click', this._onButtonGetArticlePress.bind(this));

        var inputSearch = document.getElementById('inputSearch');
        inputSearch.addEventListener('keyup', this._onInputSearchKeyUp.bind(this));
    }

    /**
     * Handler, which fired when key up on search input
     */


    _createClass(Application, [{
        key: '_onInputSearchKeyUp',
        value: function _onInputSearchKeyUp(e) {
            e = e || window.event;

            if (e.keyCode === 13) {
                this._onButtonGetArticlePress();
            }

            return false;
        }

        /**
         * Handler, which fired when GetArticle or enter button pressed
         */

    }, {
        key: '_onButtonGetArticlePress',
        value: function _onButtonGetArticlePress() {
            var selectedValues = this._getSelectedValues();
            var newsRequester = new NewsRequester(selectedValues);

            newsRequester.requestNews().then(function (response) {
                if (response.status && response.status === 'error') {
                    var errorHandler = new ErrorHandler();
                    errorHandler.handleError(response);
                }
                var articles = response.articles;

                if (articles && articles.length > 0) {
                    this.mainSection.innerHTML = '';
                    var articlesWrapper = document.createElement('section');
                    articles.forEach(function (oneArticle, index) {
                        var article = new Article(oneArticle);
                        this.appendArticle(article, index, articlesWrapper);
                    }.bind(this));
                    this.mainSection.appendChild(articlesWrapper);
                } else {
                    this.mainSection.innerHTML = 'No content';
                }
            }.bind(this)).catch(function () {
                this.mainSection.innerHTML = 'No content';
            }.bind(this));
        }

        /**
         * Return selected values
         * @return {object} Object contains selected values
         */

    }, {
        key: '_getSelectedValues',
        value: function _getSelectedValues() {
            var selectSources = document.getElementById('selectSources');
            var source = selectSources.options[selectSources.selectedIndex].value;

            var selectEndpoints = document.getElementById('selectEndpoints');
            var endpoint = selectEndpoints.options[selectEndpoints.selectedIndex].value;

            var selectLanguages = document.getElementById('selectLanguages');
            var language = selectLanguages.options[selectLanguages.selectedIndex].value;

            var inputSearch = document.getElementById('inputSearch');
            var searchString = inputSearch.value;

            var selectCountries = document.getElementById('selectCountries');
            var country = selectCountries.options[selectCountries.selectedIndex].value;

            return {
                source: source,
                endpoint: endpoint,
                language: language,
                searchString: searchString,
                country: country
            };
        }

        /**
         * Append an article to page
         *
         * @param {object} articleObj - Article object
         * @param {number} index - Index number of article
         * @param {object} articlesWrapper - DOM element where article will be appended
         */

    }, {
        key: 'appendArticle',
        value: function appendArticle(articleObj, index, articlesWrapper) {
            var section = document.createElement('section');
            section.classList.add('articleSection');

            var aside = document.createElement('aside');
            aside.classList.add('aside');

            var article = document.createElement('article');
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

    }, {
        key: '_appendTitleToArticle',
        value: function _appendTitleToArticle(article, title, urlToArticle) {
            //create title for article on the page
            var h2 = document.createElement('h2');
            var aTitle = document.createElement('a');
            var aTitleText = document.createTextNode(title);
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

    }, {
        key: '_appendDescriptionToArticle',
        value: function _appendDescriptionToArticle(article, description, urlToArticle) {
            var pDesc = document.createElement('p');
            pDesc.classList.add('desc');

            var aDesc = document.createElement('a');
            var aDescText = document.createTextNode(description);
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

    }, {
        key: '_appendImageToArticle',
        value: function _appendImageToArticle(aside, urlToImage, urlToArticle) {
            var aImg = document.createElement('a');
            var img = new Image();
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

    }, {
        key: '_appendAuthorToArticle',
        value: function _appendAuthorToArticle(article, author) {
            //create author for article on the page
            if (author) {
                var pAuthor = document.createElement('p');
                var pAuthorText = document.createTextNode(author);
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

    }, {
        key: '_appendPublishedDateToArticle',
        value: function _appendPublishedDateToArticle(article, date) {
            //create published date for article on the page
            if (date) {
                var pDatePubliched = document.createElement('p');
                var oDate = new Date(date);

                var hours = oDate.getHours();
                var formattedHours = hours < 10 ? '0' + hours : hours;

                var minutes = oDate.getMinutes();
                var formattedMinuter = minutes < 10 ? '0' + minutes : minutes;

                var formattedDate = oDate.getDate() + '/' + oDate.getMonth() + '/' + oDate.getFullYear() + '  ' + formattedHours + ':' + formattedMinuter;
                var pDatePublichedText = document.createTextNode(formattedDate);
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

    }, {
        key: '_stylizeSection',
        value: function _stylizeSection(section, index, articlesWrapper) {
            var bOdd = index % 2 === 0;

            if (bOdd) {
                section.classList.add('sectionLeft');
            } else {
                section.classList.add('sectionRight');
                var sectionCleaner = document.createElement('section');
                sectionCleaner.classList.add('sectionCleaner');
                articlesWrapper.appendChild(sectionCleaner);
            }
        }
    }]);

    return Application;
}();