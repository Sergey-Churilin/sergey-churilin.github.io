/**
 * Class representing the main application logic
 */
class Application{
    constructor(){
        this.body = document.getElementById("body");
    }

    createLayout() {
        this._createWrapper();
        this._createMain();
        this._createSelectBar();
        this._createMainSection();
        this._createFooter();
        this._createSources();
        this._createEndpoints();
        this._createLanguages();
        this._createCountries();
        this._createSearchField();
        this._createSearchButton();
    }

    /**
     * Create wrapper
     */
    _createWrapper(){
        this.wrapper =  document.createElement("div");
        this.wrapper.classList.add("wrapper");
        this.body.appendChild(this.wrapper);
    }

	/**
     * Create main section
     */
    _createMain(){
        this.main = document.createElement("main");
        this.wrapper.appendChild(this.main);
    }
	
    /**
     * Create select bar
     */
    _createSelectBar(){
        this.selectBar = document.createElement("header");
        this.selectBar.classList.add("selectBar");
        this.main.appendChild(this.selectBar);
    }

	
    /**
     * Create main section
     */
    _createMainSection(){
        this.mainSection = document.createElement("section");
        this.mainSection.classList.add("mainSection");
        this.main.appendChild(this.mainSection);
    }

     /**
     * Create footer
     */
    _createFooter(){
        const footer =  document.createElement("footer");
        footer.classList.add("footer");
        this.wrapper.appendChild(footer);
		
		const pAttribution =  document.createElement("p");
		const pAttributionText = document.createTextNode("Created using ");
		
		const aAttribution = document.createElement("a");
		aAttribution.setAttribute("href", "https://newsapi.org/");
        aAttribution.setAttribute("target", '_blank');
		
		const aAttributionText = document.createTextNode("https://newsapi.org/");
		
		aAttribution.appendChild(aAttributionText);
		pAttribution.appendChild(pAttributionText);
		pAttribution.appendChild(aAttribution);
		footer.appendChild(pAttribution);
    }

    /**
     * Create select with news sources
     */
    _createSources(){
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

    /**
     * Create select with news endpoints
     */
    _createEndpoints(){
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

    /**
     * Create select with possible news languages
     */
    _createLanguages(){
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

    /**
     * Create select with possible news countries
     */
    _createCountries(){
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

    /**
     * Create search field
     */
    _createSearchField(){
        const inputSearch = document.createElement("input");
        inputSearch.id = "inputSearch";
        inputSearch.classList.add("search");
        inputSearch.setAttribute("type", "search");
        inputSearch.setAttribute("placeholder", "Search");
        this.selectBar.appendChild(inputSearch);
    }

    /**
     * Create search button
     */
    _createSearchButton(){
        const buttonGetArticle = document.createElement("button");
        buttonGetArticle.classList.add("buttonGetArticle");
        const buttonText = document.createTextNode("Get Article");
        buttonGetArticle.appendChild(buttonText);
        buttonGetArticle.addEventListener("click",this._onButtonGetArticlePress.bind(this));
        this.selectBar.appendChild(buttonGetArticle);
    }

    /**
     * Handler, which fired when GetArticle button pressed
     */
    _onButtonGetArticlePress (){
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
                if(response.status && response.status === "error"){
                    const errorHandler = new ErrorHandler();
                    errorHandler.handleError(response);
                }
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

    /**
     * Append an article to page
     */
    appendArticle(articleObj, index){
        const bOdd = index %2 === 0;
        //create section for article
        const section = document.createElement('section');
        section.classList.add("articleSection");

        //create aside block that will be in the left of section in full screen on desktop
        const aside = document.createElement('aside');
        aside.classList.add("aside");

        //create article block that will be in the right of section in full screen on desktop
        const article = document.createElement('article');
        article.classList.add("article");

        //create title for article on the page
        const h2 = document.createElement('h2');
        const aTitle = document.createElement('a');
        const aTitleText = document.createTextNode(articleObj.title);
        aTitle.setAttribute("href", articleObj.url);
        aTitle.setAttribute("target", '_blank');
        aTitle.appendChild(aTitleText);
        h2.appendChild(aTitle);
        article.appendChild(h2);

        //create description for article on the page
        const pDesc = document.createElement('p');
        pDesc.classList.add("desc");

        const aDesc = document.createElement('a');
        const aDescText = document.createTextNode(articleObj.description);
        aDesc.setAttribute("href", articleObj.url);
        aDesc.setAttribute("target", '_blank');
        aDesc.appendChild(aDescText);
        pDesc.appendChild(aDesc);
        article.appendChild(pDesc);

        //create image for article on the page
        const aImg = document.createElement('a');
        const img = new Image();
        aImg.setAttribute("href", articleObj.url);
        aImg.setAttribute("target", '_blank');

        if(articleObj.urlToImage){
            img.src = articleObj.urlToImage;
        } else {
            img.src = DEFAULT_IMG;
        }

        img.onerror = function (oEvent) {
            if(img.src !== DEFAULT_IMG){
                img.src = DEFAULT_IMG;
            }
        };

        img.classList.add("img");
        aImg.appendChild(img);
        aside.appendChild(aImg);

        section.appendChild(aside);
        section.appendChild(article);

        //create author for article on the page
        if(articleObj.author) {
            const pAuthor = document.createElement('p');
            const pAuthorText = document.createTextNode(articleObj.author);
            pAuthor.classList.add("author");
            pAuthor.appendChild(pAuthorText);
            article.appendChild(pAuthor);
        }

        //create published date for article on the page
        if(articleObj.publishedAt){
            const pDatePubliched = document.createElement('p');
            const oDate = new Date(articleObj.publishedAt);

            const hours = oDate.getHours();
            const formattedHours = hours < 10 ? `0${hours}` : hours;

            const minutes = oDate.getMinutes();
            const formattedMinuter = minutes < 10 ? `0${minutes}` : minutes;

            const formattedDate = `${oDate.getDate()}/${oDate.getMonth()}/${oDate.getFullYear()}  ${formattedHours}:${formattedMinuter}`;
            const pDatePublichedText = document.createTextNode(formattedDate);
            pDatePubliched.classList.add("publishedDate");
            pDatePubliched.appendChild(pDatePublichedText);
            article.appendChild(pDatePubliched);
        }

        this.mainSection.appendChild(section);

        if(bOdd){
            section.classList.add("sectionLeft");
        }  else{
            section.classList.add("sectionRight");
            const sectionCleaner = document.createElement('section');
            sectionCleaner.classList.add("sectionCleaner");
            this.mainSection.appendChild(sectionCleaner);
        }
    }
}
