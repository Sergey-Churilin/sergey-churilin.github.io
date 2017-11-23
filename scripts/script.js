'use strict';
//constants
const API_KEY = "f5d0ede14cdc42a990a57ff137f6c5ee";
const arraySources = [
    "abc-news",
    "bbc-sport",
    "bbc-news",
    "cnn",
    "fox-news"
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

let requesterInstance = null;
let application = null;
// sources https://newsapi.org/v2/sources?apiKey=f5d0ede14cdc42a990a57ff137f6c5ee
// everything https://newsapi.org/v2/everything?q=bitcoin&apiKey=f5d0ede14cdc42a990a57ff137f6c5ee
// topHeadlines https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f5d0ede14cdc42a990a57ff137f6c5ee

document.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        application.onButtonGetArticlePress();
    }
    // Отменяем действие браузера
    return false;
}


window.onload = function(){
    init();
};

function init(){
    application = new Application();
    application.createLayout();
}

class Application{
    constructor(){
        this.body = document.getElementById("body");
    }

    createLayout() {
        this.createSelectBar();
        this.createMainSection();
        this.createSources();
        this.createEndpoints();
        this.createLanguages();
        this.createCountries();
        this.createSearch();
        this.createSearchButton();
    }

    createSelectBar(){
        this.selectBar = document.createElement("section");
        this.selectBar.classList.add("selectBar");
        this.body.appendChild(this.selectBar);
    }

    createMainSection(){
        this.mainSection = document.createElement("section");
        this.mainSection.classList.add("mainSection");
        this.body.appendChild(this.mainSection);
    }

    createSources(){
        const selectSources = document.createElement("select");
        selectSources.id = "selectSources";
        selectSources.classList.add("select");
        this.selectBar.appendChild(selectSources);

        //Create and append the options
        arraySources.forEach(function(source){
            const option = document.createElement("option");
            option.value = source;
            option.text = source;
            selectSources.appendChild(option);
        });
    }

    createEndpoints(){
        const selectEndpoints = document.createElement("select");
        selectEndpoints.id = "selectEndpoints";
        selectEndpoints.classList.add("select");
        this.selectBar.appendChild(selectEndpoints);

        //Create and append the options
        const optionEndpoint = document.createElement("option");
        optionEndpoint.value = '';
        optionEndpoint.text = 'Select endpoint';
        optionEndpoint.setAttribute("selected", "selected");
        selectEndpoints.appendChild(optionEndpoint);
        arrayEndpoints.forEach(function(endpoint){
            const option = document.createElement("option");
            option.value = endpoint.path;
            option.text = endpoint.text;
            selectEndpoints.appendChild(option);
        });
    }

    createLanguages(){
        const selectLanguages = document.createElement("select");
        selectLanguages.id = "selectLanguages";
        selectLanguages.classList.add("select");
        this.selectBar.appendChild(selectLanguages);

        //Create and append the options
        const optionLang = document.createElement("option");
        optionLang.value = '';
        optionLang.text = 'Select language';
        selectLanguages.appendChild(optionLang);
        arrayLanguages.forEach(function(language){
            const option = document.createElement("option");
            option.value = language.lang;
            option.text = language.desc;
            selectLanguages.appendChild(option);
        });
    }

    createCountries(){
        const selectCountries = document.createElement("select");
        selectCountries.id = "selectCountries";
        selectCountries.classList.add("select");
        this.selectBar.appendChild(selectCountries);

        //Create and append the options
        const optionCountry = document.createElement("option");
        optionCountry.value = '';
        optionCountry.text = 'Select country';
        selectCountries.appendChild(optionCountry);
        arrayCountires.forEach(function(country){
            const option = document.createElement("option");
            option.value = country.lang;
            option.text = country.desc;
            selectCountries.appendChild(option);
        });
    }

    createSearch(){
        const inputSearch = document.createElement("input");
        inputSearch.id = "inputSearch";
        inputSearch.classList.add("search");
        inputSearch.setAttribute("type", "search");
        inputSearch.setAttribute("placeholder", "Search");
        this.selectBar.appendChild(inputSearch);
    }

    createSearchButton(){
        const buttonGetArticle = document.createElement("button");
        buttonGetArticle.classList.add("buttonGetArticle");
        const buttonText = document.createTextNode("Get Article");
        buttonGetArticle.appendChild(buttonText);
        buttonGetArticle.addEventListener("click",this.onButtonGetArticlePress.bind(this));
        this.selectBar.appendChild(buttonGetArticle);
    }

    onButtonGetArticlePress (){
        const selectSources = document.getElementById("selectSources");
        const source = selectSources.options[selectSources.selectedIndex].value;

        const selectEndpoints = document.getElementById("selectEndpoints");
        const endpoint = selectEndpoints.options[selectEndpoints.selectedIndex].value;

        const selectLanguages = document.getElementById("selectLanguages");
        let language = selectLanguages.options[selectLanguages.selectedIndex].value;

        const inputSearch = document.getElementById("inputSearch");
        let searchString = inputSearch.value;

        const selectCountries = document.getElementById("selectCountries");
        let country = selectCountries.options[selectCountries.selectedIndex].value;

        const newsRequester = new NewsRequester(source, endpoint, language, country, searchString);
        newsRequester.source = source;
        newsRequester.endpoint = endpoint;
        newsRequester.language = language;
        newsRequester.country = country;
        newsRequester.searchString = searchString;

        newsRequester.requestNews()
            .then(function(response){
                const articles = response.articles;

                if(articles && articles.length > 0){
                    this.mainSection.innerHTML = "";
                    articles.forEach(function(oneArticle, index){
                        const article = new Article(oneArticle);
                        this.appendArticle(article, index);
                    }.bind(this))
                } else {
                    this.mainSection.innerHTML = "No content";
                }
            }.bind(this))
            .catch(function(){
                this.mainSection.innerHTML = "No content";
            }.bind(this))
    }

    appendArticle(articleObj, index){
        const bOdd = index %2 === 0;
        const section = document.createElement('section');
        section.classList.add("articleSection");

        const aside = document.createElement('aside');
        aside.classList.add("aside");

        const article = document.createElement('article');
        article.classList.add("article");

        const h2 = document.createElement('h2');
        const aTitle = document.createElement('a');
        aTitle.setAttribute("href", articleObj.url);
        aTitle.setAttribute("target", '_blank');
        const aTitleText = document.createTextNode(articleObj.title);
        aTitle.appendChild(aTitleText);
        h2.appendChild(aTitle);
        article.appendChild(h2);

        const aDesc = document.createElement('a');
        aDesc.setAttribute("href", articleObj.url);
        aDesc.setAttribute("target", '_blank');
        const aDescText = document.createTextNode(articleObj.description);
        aDesc.appendChild(aDescText);
        article.appendChild(aDesc);

        const aImg = document.createElement('a');
        aImg.setAttribute("href", articleObj.url);
        const img = new Image();   // Create new img element
        if(articleObj.urlToImage){
            img.src = articleObj.urlToImage;
        } else {
            img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKmlsV_RI01siSEtxGGhU4vk2pHFyPKYoM2RQFWLPanrE6Vm2D";
        }

        img.classList.add("img");
        aImg.appendChild(img);
        aside.appendChild(aImg);

        section.appendChild(aside);
        section.appendChild(article);

        this.mainSection.appendChild(section);

        if(!bOdd){
            const sectionCleaner = document.createElement('section');
            sectionCleaner.classList.add("sectionCleaner");
            this.mainSection.appendChild(sectionCleaner);
        }
    }
}


class NewsRequester{
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
                    if(response.status === 200){
                        return response.json();
                    }

                    if(response.status >=400){
                        throw new Error(response);
                    }
                },function(){
                    alert("can't retrieve articles");
                })
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error){
                    alert("can't retrieve articles");
                    reject();
                });
        })

    }
}

class Article{
    constructor(article){
        this.author = article.author;
        this.description = article.description;
        this.title = article.title;
        this.url = article.url;
        this.urlToImage = article.urlToImage;
    }
}