!function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={exports:{},id:i,loaded:!1};return e[i].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var a=n(1),s=i(a),r=n(2),o=i(r),l=n(4),d=i(l),u=n(6),c=i(u),h=n(8),f=i(h),p=n(9),v=i(p),g=n(10),S=i(g),C=new s.default;C.createLayout();var y=new d.default,P=new c.default,m=new o.default;m.addListener([y,P]),m.observePageSize();var L=new v.default;L.addListener([y,P]),y.addLoader(L),y.addSliderController(P);var T=new f.default;T.addSliderController(P),T.addPaginationController(y);new S.default(L)},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=function(){function e(){n(this,e),this.header=document.createElement("header"),this.header.classList.add("pageHeader"),this.header.innerHTML='<div class="searchWrapper"><input type="search" placeholder="youtube" id="inputSearch"><div class="searchIcon"><i class="fa fa-search" aria-hidden="true"></i></div></div>',this.main=document.createElement("main"),this.main.innerHTML='<div class="videoSliderWrapper"><ul class="videoSlider clearfix"></ul></div>',this.footer=document.createElement("footer"),this.footer.innerHTML='<div class="pagerWrapper"><ul class="pager clearfix"></div></ul>'}return i(e,[{key:"createLayout",value:function(){var e=document.querySelector("body"),t=document.createDocumentFragment();t.appendChild(this.header),t.appendChild(this.main),t.appendChild(this.footer),e.appendChild(t)}}]),e}();t.default=a},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(3),r=function(){function e(){i(this,e),this.pageWidth=window.innerWidth,this.slidesOnScreen=e.maxSlidesOnScreen(),this.listeners=[]}return a(e,[{key:"addListener",value:function(e){e instanceof Array?this.listeners=this.listeners.concat(e):this.listeners.push(e)}},{key:"observePageSize",value:function(){var t=this;window.addEventListener("resize",function(){t.pageWidth=this.innerWidth;var n=e.maxSlidesOnScreen();t.slidesOnScreen!==n&&(t.slidesOnScreen=n,t.listeners.forEach(function(e){return e.pageSizeChanged(n)}))})}}],[{key:"maxSlidesOnScreen",value:function(){return Math.floor(window.innerWidth/(s.SliderConstants.SLIDE_WIDTH+s.SliderConstants.SLIDE_MARGIN))||1}}]),e}();t.default=r},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="AIzaSyC6qu045NomjZurNpfqr2aUMnuAPQ0_utI",i=15,a="https://www.googleapis.com/youtube/v3/",s={DATA_URL:a+"search?type=video&part=snippet&maxResults="+i+"&key="+n,VIDEO_URL:"https://www.youtube.com/watch",CHANNEL_URL:"https://www.youtube.com/channel/",STATISTICS_URL:a+"videos?part=statistics&key="+n},r={SLIDE_WIDTH:280,SLIDE_MARGIN:20},o={CONTROL_WIDTH:30,CONTROL_MARGIN:10,MAX_CONTROLS_ON_SCREEN:5,PAGE_DOWNGRADER_FOR_LOADING_NEW_DATA:3};t.SliderConstants=r,t.PaginationConstants=o,t.DataLoaderConstants=s},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(5),o=i(r),l=n(2),d=i(l),u=n(3),c=function(){function e(){a(this,e),this.viewPager=new o.default,this.dataLoader=null,this.sliderController=null,this.currentPage=1,this.slidesLoaded=0,this.slidesOnScreen=0,this.pagesAdded=0,this.pager=document.querySelector(".pager"),this.pager.addEventListener("click",this.handleClick.bind(this)),this.visiblePages={firstVisible:1,lastVisible:u.PaginationConstants.MAX_CONTROLS_ON_SCREEN},this.currentTranslateX=0}return s(e,[{key:"addSliderController",value:function(e){this.sliderController=e}},{key:"addLoader",value:function(e){this.dataLoader=e}},{key:"slideLoaded",value:function(e){e&&(this.slidesLoaded++,this.addControlIfNeeded())}},{key:"addControlIfNeeded",value:function(){0===this.pagesAdded&&this.slidesLoaded>0&&(this.pagesAdded++,this.viewPager.addPage(this.pagesAdded,!0));var e=d.default.maxSlidesOnScreen();this.slidesOnScreen=e,this.slidesLoaded>e&&this.pagesAdded<Math.ceil(this.slidesLoaded/e)&&this.currentPage===this.pagesAdded&&(this.pagesAdded++,this.viewPager.addPage(this.pagesAdded,!1),this.pagesAdded===this.currentPage+1&&this.checkPagerPosition(this.currentPage))}},{key:"checkForLoadingNewData",value:function(){var e=d.default.maxSlidesOnScreen(),t=Math.floor(this.slidesLoaded/e)<=this.currentPage+u.PaginationConstants.PAGE_DOWNGRADER_FOR_LOADING_NEW_DATA;this.currentPage++,t&&this.dataLoader.loadNewData()}},{key:"checkPagerPosition",value:function(e){if(this.pagesAdded>u.PaginationConstants.MAX_CONTROLS_ON_SCREEN&&this.pagesAdded!=e){var t=!1;e>=this.visiblePages.lastVisible&&e<=this.pagesAdded&&(this.visiblePages.lastVisible=e+1,this.visiblePages.firstVisible=this.visiblePages.lastVisible-(u.PaginationConstants.MAX_CONTROLS_ON_SCREEN-1),this.currentTranslateX=(this.visiblePages.lastVisible-u.PaginationConstants.MAX_CONTROLS_ON_SCREEN)*(u.PaginationConstants.CONTROL_WIDTH+u.PaginationConstants.CONTROL_MARGIN),t=!0),e===this.visiblePages.firstVisible&&e>1&&(this.visiblePages.firstVisible=e-1,this.visiblePages.lastVisible=this.visiblePages.firstVisible+(u.PaginationConstants.MAX_CONTROLS_ON_SCREEN-1),this.currentTranslateX=this.currentTranslateX-u.PaginationConstants.CONTROL_WIDTH-u.PaginationConstants.CONTROL_MARGIN,t=!0),t&&this.viewPager.updateTransform(this.currentTranslateX)}}},{key:"handleClick",value:function(e){var t=Array.from(document.querySelectorAll(".pager .page"));if(t.indexOf(e.target)>=0){var n=e.target;this.activateCurrentPage(n)}}},{key:"simulateClickToPage",value:function(){var e=document.querySelector("[data-page='"+this.currentPage+"']");this.activateCurrentPage(e)}},{key:"clickToNextPage",value:function(e){e?this.currentPage<this.pagesAdded&&(this.checkForLoadingNewData(),this.simulateClickToPage()):this.currentPage>1&&(this.currentPage--,this.simulateClickToPage())}},{key:"activateCurrentPage",value:function(e){var t=document.querySelector(".pager .active");t&&(t.className="page"),e.classList.add("active");var n=Number(e.getAttribute("data-page"));n>this.currentPage?this.checkForLoadingNewData():this.currentPage=n,this.sliderController.pageChanged(n),this.addControlIfNeeded(),this.checkPagerPosition(n)}},{key:"recreatePages",value:function(){this.currentPage=1,this.pagesAdded=0,this.visiblePages={firstVisible:1,lastVisible:u.PaginationConstants.MAX_CONTROLS_ON_SCREEN},this.currentTranslateX=0,this.viewPager.clearContent(),this.viewPager.updateTransform(this.currentTranslateX)}},{key:"resetContent",value:function(){this.slidesLoaded=0,this.recreatePages()}},{key:"pageSizeChanged",value:function(e){if(this.slidesLoaded){var t=this.slidesOnScreen*(this.currentPage-1)+1;t>this.slidesLoaded&&t--;var n=Math.ceil(t/e);0===n&&(n=1),this.recreatePages();var i=document.querySelector("[data-page='"+n+"']");if(!i)for(;!i;)this.addControlIfNeeded(),i=document.querySelector("[data-page='"+n+"']"),this.checkPagerPosition(this.currentPage),this.checkForLoadingNewData();this.activateCurrentPage(i)}}}]),e}();t.default=c},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(3),r=function(){function e(){i(this,e),this.pager=document.querySelector(".pager"),this.pagerWrapper=document.querySelector(".pagerWrapper"),this.pagerWrapper.style.width=s.PaginationConstants.MAX_CONTROLS_ON_SCREEN*(s.PaginationConstants.CONTROL_WIDTH+s.PaginationConstants.CONTROL_MARGIN)-s.PaginationConstants.CONTROL_MARGIN+"px",this.pagerWrapper.style.height=s.PaginationConstants.CONTROL_WIDTH+"px"}return a(e,[{key:"addPage",value:function(e,t){var n=document.createElement("li");t?n.classList.add("page","active"):n.classList.add("page"),n.innerHTML=e,n.setAttribute("data-page",e),this.pager.appendChild(n),this.pager.style.width=e*(s.PaginationConstants.CONTROL_WIDTH+s.PaginationConstants.CONTROL_MARGIN)+"px"}},{key:"clearContent",value:function(){this.pager.innerHTML=""}},{key:"updateTransform",value:function(e){this.pager.style.transform="translate3d(-"+e+"px, 0px, 0px)"}}]),e}();t.default=r},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(7),o=i(r),l=n(2),d=i(l),u=n(3),c=function(){function e(){a(this,e),this.viewSlider=new o.default,this.slidesAmount=0,this.slidesAmountOnScreen=0,this.currentTranslateX=0,this.currentTranslateXWithOffset=0}return s(e,[{key:"resetContent",value:function(){this.slidesAmount=0,this.slidesAmountOnScreen=0,this.currentTranslateX=0,this.currentTranslateXWithOffset=0,this.viewSlider.resetSlider()}},{key:"slideLoaded",value:function(e){e?(this.slidesAmount++,this.viewSlider.addSlideToSlider(e,this.slidesAmount),this.centerContent(d.default.maxSlidesOnScreen())):this.viewSlider.addEmptySlideToSlider()}},{key:"pageSizeChanged",value:function(e){this.centerContent(e)}},{key:"centerContent",value:function(e){if(this.slidesAmount&&e!==this.slidesAmountOnScreen){this.slidesAmountOnScreen=e,this.slidesAmountOnScreen<e?this.currentTranslateX=this.currentTranslateX-u.SliderConstants.SLIDE_WIDTH-u.SliderConstants.SLIDE_MARGIN:this.slidesAmountOnScreen>e&&(this.currentTranslateX=this.currentTranslateX+u.SliderConstants.SLIDE_WIDTH+u.SliderConstants.SLIDE_MARGIN);var t=e*(u.SliderConstants.SLIDE_WIDTH+u.SliderConstants.SLIDE_MARGIN)-u.SliderConstants.SLIDE_MARGIN;this.viewSlider.updatePosition(this.currentTranslateX),this.viewSlider.updateWrapper(t)}}},{key:"pageChanged",value:function(e){var t=d.default.maxSlidesOnScreen();this.currentTranslateX=-(t*(e-1)*(u.SliderConstants.SLIDE_WIDTH+u.SliderConstants.SLIDE_MARGIN)),this.viewSlider.updatePosition(this.currentTranslateX)}},{key:"sliderPositionChangedWithOffset",value:function(e){this.currentTranslateXWithOffset=this.currentTranslateX+e,this.viewSlider.updatePosition(this.currentTranslateX+e)}},{key:"fixSliderPosition",value:function(e){if(e>0)this.currentTranslateX=0,this.viewSlider.updatePosition(this.currentTranslateX);else{var t=-(this.slidesAmount*(u.SliderConstants.SLIDE_WIDTH+u.SliderConstants.SLIDE_MARGIN)-(u.SliderConstants.SLIDE_WIDTH+u.SliderConstants.SLIDE_MARGIN)*this.slidesAmountOnScreen);this.currentTranslateXWithOffset<t&&(this.currentTranslateX=t,this.viewSlider.updatePosition(this.currentTranslateX))}}}]),e}();t.default=c},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(3),r=function(){function e(){i(this,e),this.slider=document.querySelector(".videoSlider"),this.sliderWrapper=document.querySelector(".videoSliderWrapper")}return a(e,[{key:"addSlideToSlider",value:function(e,t){var n=document.createElement("li");n.classList.add("slide",["appear"]),n.setAttribute("data-slide",t);var i=' <div class="imageWrapper">\n                                <img class="slidePreview" src="'+e.previewSrc+'" alt="preview">\n                                <h2 class="slideTitle"><a class="slideLink" href="'+e.link+'" target="_blank">'+e.title+'</a></h2>\n                            </div>\n                            <div class="slideAuthor"><i class="fa fa-user-circle" aria-hidden="true"></i><a href="'+e.channelLink+'">'+e.author+'</a></div>\n                            <div class="slideInfo">\n                                <div class="infoWrapper clearfix">\n                                    <div class="left_StatisticsInfo slideDatePublication">'+e.publicationDate.slice(0,10)+'</div>\n                                    <div class="right_StatisticsInfo slideViewsAmount">'+e.viewsAmount+'</div>\n                                </div>\n                                <div class="slideDescription">'+e.descriptrion+'</div>\n                                <div class="infoWrapper likesWrapper clearfix">\n                                    <div class="left_StatisticsInfo likesAmount">'+e.likesAmount+'</div>\n                                    <div class="right_StatisticsInfo dislikesAmount">'+e.dislikesAmount+"</div>\n                                </div>\n                            </div>\n                        ";n.innerHTML=i,this.slider.style.width=(s.SliderConstants.SLIDE_WIDTH+s.SliderConstants.SLIDE_MARGIN)*t+"px",this.slider.appendChild(n)}},{key:"addEmptySlideToSlider",value:function(){var e=document.createElement("li");e.classList.add("slide",["appear"]);var t=' <div class="imageWrapper">\n                                <h2 class="slideTitle">Nothing found</h2>\n                            </div>\n                            <div class="slideAuthor">No result found</div>\n                        ';e.innerHTML=t,this.slider.style.width=1*(s.SliderConstants.SLIDE_WIDTH+s.SliderConstants.SLIDE_MARGIN)+"px",this.slider.appendChild(e)}},{key:"updatePosition",value:function(e){this.slider.style.transform="translate3d("+e+"px, 0px, 0px)"}},{key:"updateWrapper",value:function(e){this.sliderWrapper.style.width=e+"px"}},{key:"resetSlider",value:function(){this.slider.style.transform="translate3d(0px, 0px, 0px)",this.slider.innerHTML=""}}]),e}();t.default=r},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=function(){function e(){n(this,e),this.slider=document.querySelector(".videoSlider"),this.slider.addEventListener("touchstart",this.handleStart.bind(this),{passive:!0}),document.addEventListener("touchmove",this.handleMove.bind(this)),document.addEventListener("touchend",this.handleEnd.bind(this)),this.slider.addEventListener("mousedown",this.handleStart.bind(this)),document.addEventListener("mousemove",this.handleMove.bind(this)),document.addEventListener("mouseup",this.handleEnd.bind(this)),this.startClickPos=0,this.endClickPos=0,this.clickDetected=!1,this.sliderController=null,this.paginationController=null}return i(e,[{key:"addSliderController",value:function(e){this.sliderController=e}},{key:"addPaginationController",value:function(e){this.paginationController=e}},{key:"handleStart",value:function(e){this.startClickPos=e.pageX>=0?e.pageX:e.changedTouches[0].pageX,this.clickDetected=!0,this.slider.style.transition="none"}},{key:"handleMove",value:function(e){if(this.clickDetected){e.preventDefault();var t=e.pageX>=0?e.pageX:e.changedTouches[0].pageX,n=t-this.startClickPos;this.sliderController.sliderPositionChangedWithOffset(n)}}},{key:"handleEnd",value:function(e){this.clickDetected&&(this.endClickPos=e.pageX>=0?e.pageX:e.changedTouches[0].pageX,this.clickDetected=!1,this.slider.style.transition="transform .3s",this.sliderController.fixSliderPosition(this.endClickPos-this.startClickPos),Math.abs(this.startClickPos-this.endClickPos)>5&&this.paginationController.clickToNextPage(this.startClickPos>this.endClickPos))}}]),e}();t.default=a},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(3),r=function(){function e(){i(this,e),this.queryString=null,this.nextPageToken=null,this.totalResults=null,this.listeners=[]}return a(e,[{key:"addListener",value:function(e){e instanceof Array?this.listeners=this.listeners.concat(e):this.listeners.push(e)}},{key:"loadData",value:function(e){if(e){var t="",n=!1;if(e===this.queryString){if(!this.nextPageToken)return;t=s.DataLoaderConstants.DATA_URL+"&q="+e+"&pageToken="+this.nextPageToken}else n=!0,this.queryString=e,t=s.DataLoaderConstants.DATA_URL+"&q="+e;var i=[],a=this;fetch(t).then(function(e){return e.json()}).then(function(e){a.nextPageToken=e.nextPageToken;var t=e.pageInfo.totalResults;if(!t)return a.listeners.forEach(function(e){return e.resetContent()}),n=!1,a.listeners.forEach(function(e){return e.slideLoaded(null)}),null;a.totalResults=t;var r=[],o=e.items;return o.forEach(function(e,t){r.push(e.id.videoId);var n={link:s.DataLoaderConstants.VIDEO_URL+"?v="+o[t].id.videoId,title:o[t].snippet.title,previewSrc:o[t].snippet.thumbnails.medium.url,descriptrion:o[t].snippet.description,channelLink:""+s.DataLoaderConstants.CHANNEL_URL+o[t].snippet.channelId,author:o[t].snippet.channelTitle,publicationDate:o[t].snippet.publishedAt,viewsAmount:0};i.push(n)}),s.DataLoaderConstants.STATISTICS_URL+"&id="+r.join(",")}).then(function(e){if(e)return fetch(e);throw new Error("No result found")}).catch(function(e){return console.log(e)}).then(function(e){return e.json()}).then(function(e){i.forEach(function(t,i){var s=e.items[i];t.viewsAmount=s.statistics.viewCount,t.likesAmount=s.statistics.likeCount,t.dislikesAmount=s.statistics.dislikeCount,n&&(a.listeners.forEach(function(e){return e.resetContent()}),n=!1),a.listeners.forEach(function(e){return e.slideLoaded(t)})})}).catch(function(){return console.log("Smth go wrong")})}}},{key:"loadNewData",value:function(){this.queryString&&this.loadData(this.queryString)}}]),e}();t.default=r},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=function(){function e(t){n(this,e),this.currentSearchValue=null,this.searchInput=document.querySelector("#inputSearch"),this.searchInput.addEventListener("keyup",this.observeInput.bind(this)),this.searchIcon=document.querySelector(".searchIcon"),this.searchIcon.addEventListener("click",this.observeClick.bind(this)),this.dataLoader=t}return i(e,[{key:"processInput",value:function(){var e=document.querySelector("#inputSearch"),t=e.value;t&&t!==this.currentSearchValue&&(this.dataLoader.loadData(t),this.currentSearchValue=t)}},{key:"observeInput",value:function(e){13===e.which&&this.processInput()}},{key:"observeClick",value:function(e){this.processInput()}}]),e}();t.default=a}]);