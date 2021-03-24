(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/Jim/iDocuments/moodTunes/src/main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "CFWw":
/*!**********************************!*\
  !*** ./src/app/music.service.ts ***!
  \**********************************/
/*! exports provided: MusicService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MusicService", function() { return MusicService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



// interface TrackResponse {
//   songResults: Track[];
// }
//interface Music{
// type?:string;
///name?:string;
//tag_en:string;
//}
class MusicService {
    constructor(http) {
        this.http = http;
        this.apiKey = "b88d365cdf804155ac40618e402f7ce5";
        //url = "http://localhost:8080/api/V6";
        this.url = "https://ws.audioscrobbler.com/2.0/";
        this.apiUrl = "http://localhost:3000/api";
        //public apiUrl: string = "/api";
        this.selectedSearch = "";
    }
    getMusicLanding() {
        const requestUrl = this.url + "?method=chart.gettoptracks&api_key=" + this.apiKey + "&format=json";
        this.http.get(requestUrl).subscribe((response) => {
            console.log(response);
            this.music = response.tracks;
        }, (error) => {
            console.error(error);
        });
    }
    getMusic(method, searchString) {
        let requestUrl;
        if (method === "artist.gettoptracks") {
            requestUrl = this.url + "?method=" + method + "&artist=" + searchString + "&api_key=b88d365cdf804155ac40618e402f7ce5&format=json";
            this.http.get(requestUrl).subscribe((response) => {
                console.log(response);
                this.music = response.toptracks;
            }, (error) => {
                console.error(error);
            });
        }
        else if (method === "track.search") {
            requestUrl = this.url + "?method=" + method + "&track=" + searchString + "&api_key=b88d365cdf804155ac40618e402f7ce5&format=json";
            this.http.get(requestUrl).subscribe((response) => {
                console.log(response);
                this.music = response.results;
                console.log(this.music.trackmatches);
            }, (error) => {
                console.error(error);
            });
        }
        else {
            requestUrl =
                this.url + "?method=" + method + "&tag=" + searchString + "&api_key=b88d365cdf804155ac40618e402f7ce5&format=json";
            console.log('requestURL:', requestUrl);
            if (method === "tag.gettoptracks") {
                this.http.get(requestUrl).subscribe((response) => {
                    console.log(response);
                    this.music = response.tracks;
                    console.log("tracks result:", this.music);
                }, (error) => {
                    console.error(error);
                });
            }
            else {
                this.http.get(requestUrl).subscribe((response) => {
                    console.log(response);
                    this.music = response.topartists;
                    console.log("topartist result:", this.music);
                }, (error) => {
                    console.error(error);
                });
            }
        }
        //console.log(type);
        // this.http.get(requestUrl).subscribe(
        //   (response: Response) => {
        //     console.log(response);
        //     this.music = response.toptracks;
        //   },
        //   (error) => {
        //     console.error(error);
        //   }
        // );
    }
    addPlaylist(musicArray) {
        this.http.post(this.url, musicArray).subscribe((data) => {
            this.getTracks();
        });
    }
    deletePlaylist(id) {
        this.http.delete(this.url + id).subscribe((data) => {
            this.getTracks();
        });
    }
    getTracks() {
        this.musicArray = [];
        // Make an API request to our Playlist API
        // Set the response of that request to our this.music array
        this.http
            .get(this.apiUrl) // calling the API
            .subscribe(
        // subscribing to run our functions when the data returns
        (data) => {
            console.log('myfavorite:', data);
            // this is what happens on success
            // convert object to an array
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    const playList = data[key]; // individual track 
                    // converting the format of the API to the format
                    // that we are expecting in our Music interface
                    this.musicArray.push(playList);
                    console.log(this.musicArray);
                }
            }
        }, (error) => {
            // this is what happens on failure
            console.error(error);
        });
    }
    setSelectedSearch(tag) {
        this.selectedSearch = tag;
        console.log(this.selectedSearch);
    }
    getSelectedSearch() {
        console.log("Selected search is " + this.selectedSearch);
        return this.selectedSearch;
    }
}
MusicService.ɵfac = function MusicService_Factory(t) { return new (t || MusicService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
MusicService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MusicService, factory: MusicService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MusicService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "JhD/":
/*!**********************************************!*\
  !*** ./src/app/landing/landing.component.ts ***!
  \**********************************************/
/*! exports provided: LandingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingComponent", function() { return LandingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _music_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../music.service */ "CFWw");
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../card/card.component */ "mJ8H");




class LandingComponent {
    constructor(musicService) {
        this.musicService = musicService;
    }
    ngOnInit() {
        this.musicService.getMusicLanding();
    }
}
LandingComponent.ɵfac = function LandingComponent_Factory(t) { return new (t || LandingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_music_service__WEBPACK_IMPORTED_MODULE_1__["MusicService"])); };
LandingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LandingComponent, selectors: [["app-landing"]], decls: 5, vars: 0, template: function LandingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "landing works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Top Tracks");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-card");
    } }, directives: [_card_card_component__WEBPACK_IMPORTED_MODULE_2__["CardComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsYW5kaW5nLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LandingComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-landing',
                templateUrl: './landing.component.html',
                styleUrls: ['./landing.component.css']
            }]
    }], function () { return [{ type: _music_service__WEBPACK_IMPORTED_MODULE_1__["MusicService"] }]; }, null); })();


/***/ }),

/***/ "NUXy":
/*!**********************************************!*\
  !*** ./src/app/results/results.component.ts ***!
  \**********************************************/
/*! exports provided: ResultsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultsComponent", function() { return ResultsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _music_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../music.service */ "CFWw");
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../card/card.component */ "mJ8H");




class ResultsComponent {
    constructor(musicService) {
        this.musicService = musicService;
    }
    ngOnInit() {
    }
}
ResultsComponent.ɵfac = function ResultsComponent_Factory(t) { return new (t || ResultsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_music_service__WEBPACK_IMPORTED_MODULE_1__["MusicService"])); };
ResultsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ResultsComponent, selectors: [["app-results"]], decls: 4, vars: 0, template: function ResultsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "main");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "My Results ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_card_card_component__WEBPACK_IMPORTED_MODULE_2__["CardComponent"]], styles: [".result-card[_ngcontent-%COMP%]{\n    border: 1px solid black;\n    width: 300px;\n    margin: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLHVCQUF1QjtJQUN2QixZQUFZO0lBQ1osWUFBWTtBQUNoQiIsImZpbGUiOiJyZXN1bHRzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmVzdWx0LWNhcmR7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgd2lkdGg6IDMwMHB4O1xuICAgIG1hcmdpbjogYXV0bztcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ResultsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-results',
                templateUrl: './results.component.html',
                styleUrls: ['./results.component.css']
            }]
    }], function () { return [{ type: _music_service__WEBPACK_IMPORTED_MODULE_1__["MusicService"] }]; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nav/nav.component */ "izVM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class AppComponent {
    constructor() {
        this.title = 'moodTunes';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
    } }, directives: [_nav_nav_component__WEBPACK_IMPORTED_MODULE_1__["NavComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "W6KJ":
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ProfileComponent {
    constructor() { }
    ngOnInit() {
    }
}
ProfileComponent.ɵfac = function ProfileComponent_Factory(t) { return new (t || ProfileComponent)(); };
ProfileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProfileComponent, selectors: [["app-profile"]], decls: 4, vars: 0, template: function ProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "My Profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "profile works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9maWxlLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProfileComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-profile',
                templateUrl: './profile.component.html',
                styleUrls: ['./profile.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _search_music_search_music_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./search-music/search-music.component */ "Zmb9");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nav/nav.component */ "izVM");
/* harmony import */ var _results_results_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./results/results.component */ "NUXy");
/* harmony import */ var _playlists_playlists_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./playlists/playlists.component */ "ncRd");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./profile/profile.component */ "W6KJ");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./login/login.component */ "vtpD");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./card/card.component */ "mJ8H");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _landing_landing_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./landing/landing.component */ "JhD/");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./dialog/dialog.component */ "ZYp2");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");























class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__["BrowserAnimationsModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_16__["MatButtonModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__["MatIconModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_18__["MatDialogModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_20__["MatSelectModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__["MatFormFieldModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _search_music_search_music_component__WEBPACK_IMPORTED_MODULE_5__["SearchMusicComponent"],
        _nav_nav_component__WEBPACK_IMPORTED_MODULE_6__["NavComponent"],
        _results_results_component__WEBPACK_IMPORTED_MODULE_7__["ResultsComponent"],
        _playlists_playlists_component__WEBPACK_IMPORTED_MODULE_8__["PlaylistsComponent"],
        _profile_profile_component__WEBPACK_IMPORTED_MODULE_9__["ProfileComponent"],
        _login_login_component__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"],
        _card_card_component__WEBPACK_IMPORTED_MODULE_13__["CardComponent"],
        _landing_landing_component__WEBPACK_IMPORTED_MODULE_15__["LandingComponent"],
        _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_19__["DialogComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__["BrowserAnimationsModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_16__["MatButtonModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__["MatIconModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_18__["MatDialogModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_20__["MatSelectModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__["MatFormFieldModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _search_music_search_music_component__WEBPACK_IMPORTED_MODULE_5__["SearchMusicComponent"],
                    _nav_nav_component__WEBPACK_IMPORTED_MODULE_6__["NavComponent"],
                    _results_results_component__WEBPACK_IMPORTED_MODULE_7__["ResultsComponent"],
                    _playlists_playlists_component__WEBPACK_IMPORTED_MODULE_8__["PlaylistsComponent"],
                    _profile_profile_component__WEBPACK_IMPORTED_MODULE_9__["ProfileComponent"],
                    _login_login_component__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"],
                    _card_card_component__WEBPACK_IMPORTED_MODULE_13__["CardComponent"],
                    _landing_landing_component__WEBPACK_IMPORTED_MODULE_15__["LandingComponent"],
                    _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_19__["DialogComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__["BrowserAnimationsModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_16__["MatButtonModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__["MatIconModule"],
                    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_18__["MatDialogModule"],
                    _angular_material_select__WEBPACK_IMPORTED_MODULE_20__["MatSelectModule"],
                    _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__["MatFormFieldModule"],
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "ZYp2":
/*!********************************************!*\
  !*** ./src/app/dialog/dialog.component.ts ***!
  \********************************************/
/*! exports provided: DialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogComponent", function() { return DialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");




class DialogComponent {
    constructor(dialog) {
        this.dialog = dialog;
    }
    openDialog() {
        const dialogRef = this.dialog.open(DialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
    ngOnInit() {
    }
}
DialogComponent.ɵfac = function DialogComponent_Factory(t) { return new (t || DialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"])); };
DialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DialogComponent, selectors: [["app-dialog"]], decls: 7, vars: 0, consts: [["mat-dialog-title", ""], ["mat-dialog-content", ""], ["mat-dialog-actions", ""], ["mat-button", "", "mat-dialog-close", ""]], template: function DialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Dialog with elements");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "This dialog showcases the title, close, content and actions elements.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkaWFsb2cuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dialog',
                templateUrl: './dialog.component.html',
                styleUrls: ['./dialog.component.css']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }]; }, null); })();


/***/ }),

/***/ "Zmb9":
/*!********************************************************!*\
  !*** ./src/app/search-music/search-music.component.ts ***!
  \********************************************************/
/*! exports provided: SearchMusicComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchMusicComponent", function() { return SearchMusicComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _music_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../music.service */ "CFWw");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");







function SearchMusicComponent_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const search_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", search_r1.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", search_r1.viewValue, " ");
} }
class SearchMusicComponent {
    //selectedFilter: string ="";
    constructor(musicService) {
        this.musicService = musicService;
        this.searches = [
            { value: 'tag.gettoptracks', viewValue: 'Tracks by Mood' },
            { value: 'tag.gettopartists', viewValue: 'Artists by Mood' },
            { value: 'artist.gettoptracks', viewValue: 'Artist' },
            { value: 'track.search', viewValue: 'Track' }
        ];
    }
    ngOnInit() {
        //this.musicService.getMusic();
    }
    fetchDataService() {
        const term = this.searchTerm;
        console.log("this is the term " + term);
        this.musicService.getMusic(this.selectedSearch, this.searchTerm);
        this.musicService.setSelectedSearch(this.selectedSearch);
    }
}
SearchMusicComponent.ɵfac = function SearchMusicComponent_Factory(t) { return new (t || SearchMusicComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_music_service__WEBPACK_IMPORTED_MODULE_2__["MusicService"])); };
SearchMusicComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SearchMusicComponent, selectors: [["app-search-music"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([
            { provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldControl"], useExisting: SearchMusicComponent }
        ])], decls: 15, vars: 4, consts: [["role", "search"], ["id", "search-by"], ["aria-labelledby", "search-by", "matNativeControl", "", "name", "search", 3, "ngModel", "ngModelChange"], ["value", "", "selected", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "name", "searchTerm", "required", "", 3, "ngModel", "ngModelChange"], ["routerLink", "/results", 3, "click"], [3, "value"]], template: function SearchMusicComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "main");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Search by:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SearchMusicComponent_Template_select_ngModelChange_5_listener($event) { return ctx.selectedSearch = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, SearchMusicComponent_option_7_Template, 2, 2, "option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Search Terms: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SearchMusicComponent_Template_input_ngModelChange_10_listener($event) { return ctx.searchTerm = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SearchMusicComponent_Template_button_click_11_listener() { return ctx.fetchDataService(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Search");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.selectedSearch);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.searches);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.searchTerm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Selected search: ", ctx.selectedSearch, "");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["RequiredValidator"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLink"]], styles: ["h1[_ngcontent-%COMP%] {\n    font-size: medium;\n}\nform[_ngcontent-%COMP%] {\n    display: flex;\n    \n    flex-wrap: wrap;\n    align-items: center;\n    \n    \n}\nlabel[_ngcontent-%COMP%] {\n    padding-right: 5px;\n    font-size: 15px;\n}\nselect[_ngcontent-%COMP%]{\n    \n    width: 65%;\n}\ninput[_ngcontent-%COMP%] {\n    width: 100px;\n    margin: 0;\n}\nbutton[_ngcontent-%COMP%]{\n    width: 100%;\n    height: 25px;\n    margin: 1rem;\n    font-weight: bold;\n    background-color: rgb(113, 237, 113);\n    border: solid 2px #000;\n    font-size: 15px;\n    border-radius: 5px;\n}\n\n@media screen and (min-width: 480px) {\n    .full-width-img[_ngcontent-%COMP%] {\n    margin: auto;\n    width: 90%;\n    }\n\n    button[_ngcontent-%COMP%]{\n        width: 80px;\n        margin: 1rem;\n    }\n\n    select[_ngcontent-%COMP%]{\n        width: auto;\n    }\n    \n    input[_ngcontent-%COMP%] {\n        width: 200px;\n        margin: 0;\n    }\n\n    div[_ngcontent-%COMP%]{\n        display: inline-flex;\n        margin: 2rem;\n       \n    }\n}\n\n@media screen and (min-width: 768px) {\n    .full-width-img[_ngcontent-%COMP%] {\n    margin: auto;\n    width: 90%;\n    }\n\n    button[_ngcontent-%COMP%]{\n        width: 100px;\n        \n}\n\n    select[_ngcontent-%COMP%]{\n        width: auto;\n    }\n    \n    input[_ngcontent-%COMP%] {\n        width: 300px;\n        margin: 0;\n    }\n\n    div[_ngcontent-%COMP%]{\n        display: inline-flex;\n        margin: 2rem;\n       \n    }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC1tdXNpYy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUNoQjtJQUNJLGlCQUFpQjtBQUNyQjtBQUVBO0lBQ0ksYUFBYTtJQUNiLDRCQUE0QjtJQUM1QixlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQiw0QkFBNEI7QUFDaEM7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixlQUFlO0FBQ25CO0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsVUFBVTtBQUNkO0FBRUE7SUFDSSxZQUFZO0lBQ1osU0FBUztBQUNiO0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsb0NBQW9DO0lBQ3BDLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCO0FBRUEsZ0JBQWdCO0FBQ2hCO0lBQ0k7SUFDQSxZQUFZO0lBQ1osVUFBVTtJQUNWOztJQUVBO1FBQ0ksV0FBVztRQUNYLFlBQVk7SUFDaEI7O0lBRUE7UUFDSSxXQUFXO0lBQ2Y7O0lBRUE7UUFDSSxZQUFZO1FBQ1osU0FBUztJQUNiOztJQUVBO1FBQ0ksb0JBQW9CO1FBQ3BCLFlBQVk7O0lBRWhCO0FBQ0o7QUFFQSxpQkFBaUI7QUFDakI7SUFDSTtJQUNBLFlBQVk7SUFDWixVQUFVO0lBQ1Y7O0lBRUE7UUFDSSxZQUFZO1FBQ1o7Ozs7OztnQ0FNd0I7QUFDaEM7O0lBRUk7UUFDSSxXQUFXO0lBQ2Y7O0lBRUE7UUFDSSxZQUFZO1FBQ1osU0FBUztJQUNiOztJQUVBO1FBQ0ksb0JBQW9CO1FBQ3BCLFlBQVk7O0lBRWhCO0FBQ0oiLCJmaWxlIjoic2VhcmNoLW11c2ljLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBNb2JpbGUgVmlldyAqL1xuaDEge1xuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xufVxuXG5mb3JtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC8qIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47ICovXG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgLyogcGFkZGluZzogMnJlbTsgKi9cbiAgICAvKiBib3gtc2l6aW5nOiBib3JkZXItYm94OyAqL1xufVxuXG5sYWJlbCB7XG4gICAgcGFkZGluZy1yaWdodDogNXB4O1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbn1cblxuc2VsZWN0e1xuICAgIC8qIGRpc3BsYXk6IGlubGluZTsgKi9cbiAgICB3aWR0aDogNjUlO1xufVxuXG5pbnB1dCB7XG4gICAgd2lkdGg6IDEwMHB4O1xuICAgIG1hcmdpbjogMDtcbn1cblxuYnV0dG9ue1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMjVweDtcbiAgICBtYXJnaW46IDFyZW07XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDExMywgMjM3LCAxMTMpO1xuICAgIGJvcmRlcjogc29saWQgMnB4ICMwMDA7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLyogVGFibGV0IFZpZXcgKi9cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQ4MHB4KSB7XG4gICAgLmZ1bGwtd2lkdGgtaW1nIHtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgd2lkdGg6IDkwJTtcbiAgICB9XG5cbiAgICBidXR0b257XG4gICAgICAgIHdpZHRoOiA4MHB4O1xuICAgICAgICBtYXJnaW46IDFyZW07XG4gICAgfVxuXG4gICAgc2VsZWN0e1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICB9XG4gICAgXG4gICAgaW5wdXQge1xuICAgICAgICB3aWR0aDogMjAwcHg7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICB9XG5cbiAgICBkaXZ7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgICBtYXJnaW46IDJyZW07XG4gICAgICAgXG4gICAgfVxufVxuXG4vKiBEZXNrdG9wIFZpZXcgKi9cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLmZ1bGwtd2lkdGgtaW1nIHtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgd2lkdGg6IDkwJTtcbiAgICB9XG5cbiAgICBidXR0b257XG4gICAgICAgIHdpZHRoOiAxMDBweDtcbiAgICAgICAgLyogaGVpZ2h0OiAzMHB4O1xuICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICAtbXMtYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICAtby1ib3JkZXItcmFkaXVzOiA1cHg7ICovXG59XG5cbiAgICBzZWxlY3R7XG4gICAgICAgIHdpZHRoOiBhdXRvO1xuICAgIH1cbiAgICBcbiAgICBpbnB1dCB7XG4gICAgICAgIHdpZHRoOiAzMDBweDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgIH1cblxuICAgIGRpdntcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICAgIG1hcmdpbjogMnJlbTtcbiAgICAgICBcbiAgICB9XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SearchMusicComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-search-music',
                templateUrl: './search-music.component.html',
                styleUrls: ['./search-music.component.css'],
                providers: [
                    { provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldControl"], useExisting: SearchMusicComponent }
                ]
            }]
    }], function () { return [{ type: _music_service__WEBPACK_IMPORTED_MODULE_2__["MusicService"] }]; }, null); })();


/***/ }),

/***/ "izVM":
/*!**************************************!*\
  !*** ./src/app/nav/nav.component.ts ***!
  \**************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");




class NavComponent {
    constructor() {
        this.menuOpen = false;
    }
    ngOnInit() {
    }
    closeMenu() {
        this.menuOpen = false;
    }
}
NavComponent.ɵfac = function NavComponent_Factory(t) { return new (t || NavComponent)(); };
NavComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavComponent, selectors: [["app-nav"]], decls: 29, vars: 1, consts: [["routerLink", ""], ["id", "logo-words", "src", "/assets/moodTunesNB.png", "alt", "Moodtunes home"], ["role", "navigation"], [1, "top-menu"], ["routerLink", "/login"], ["routerLink", "/profile"], ["routerLink", "/playlists"], ["id", "menuToggle"], ["type", "checkbox", 3, "ngModel", "ngModelChange"], ["id", "menu"], ["routerLink", "/login", 3, "click"], ["routerLink", "/profile", 3, "click"], ["routerLink", "/playlists", 3, "click"]], template: function NavComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nav", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Log in or Sign up");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "My Profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "My Playlists");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NavComponent_Template_input_ngModelChange_15_listener($event) { return ctx.menuOpen = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "ul", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavComponent_Template_a_click_21_listener() { return ctx.closeMenu(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Log in or Sign up");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavComponent_Template_a_click_24_listener() { return ctx.closeMenu(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "My Profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavComponent_Template_a_click_27_listener() { return ctx.closeMenu(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "My Playlists");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.menuOpen);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"]], styles: ["header[_ngcontent-%COMP%] {\n    background-color: rgb(191, 111, 218);\n    border-bottom: solid 5px black;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    \n    margin: 0;\n    align-items: center;\n}\n\n#logo-words[_ngcontent-%COMP%] {\n    width: 300px;\n    height: 60px;\n    cursor: pointer;\n}\n\n.top-menu[_ngcontent-%COMP%] {\n    display: none;\n}\n\n#menuToggle[_ngcontent-%COMP%] {\n  display: block;\n  position: relative;\n  top: 0px;\n  margin-right: 20px;\n  z-index: 1;\n  -webkit-user-select: none;\n  user-select: none;\n}\n\n#menuToggle[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: #000;\n  transition: color 0.3s ease;\n}\n\n#menuToggle[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: rgb(191, 111, 218);\n}\n\n#menuToggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: block;\n  width: 40px;\n  height: 32px;\n  position: absolute;\n  top: -7px;\n  left: -5px;\n  cursor: pointer;\n  opacity: 0; \n  z-index: 2; \n  -webkit-touch-callout: none;\n}\n\n#menuToggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  width: 33px;\n  height: 4px;\n  margin-bottom: 5px;\n  position: relative;\n  background: #000;\n  border-radius: 3px;\n  z-index: 1;\n  transform-origin: 4px 0px;\n  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),\n              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),\n              opacity 0.55s ease;\n}\n\n#menuToggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  transform-origin: 0% 0%;\n}\n\n#menuToggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-last-child(2) {\n  transform-origin: 0% 100%;\n}\n\n#menuToggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ span[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: rotate(45deg) translate(-2px, -1px);\n  background: #000;\n}\n\n#menuToggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ span[_ngcontent-%COMP%]:nth-last-child(3) {\n  opacity: 0;\n  transform: rotate(0deg) scale(0.2, 0.2);\n}\n\n#menuToggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ span[_ngcontent-%COMP%]:nth-last-child(2) {\n  transform: rotate(-45deg) translate(0, -1px);\n}\n\n#menu[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 200px;\n  margin: -100px 0 0 -171px;\n  padding: 20px;\n  padding-top: 125px;\n  background: #fff;\n  list-style-type: none;\n  -webkit-font-smoothing: antialiased;\n  transform-origin: 0% 0%;\n  transform: translate(100%, 0);\n  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);\n  -webkit-transform: translate(100%, 0);\n  -moz-transform: translate(100%, 0);\n  -ms-transform: translate(100%, 0);\n  -o-transform: translate(100%, 0);\n}\n\n#menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 10px 0;\n  font-size: 22px;\n}\n\n#menuToggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ ul[_ngcontent-%COMP%] {\n  transform: none;\n}\n\n\n\n@media screen and (min-width: 480px) {\n    #logoWords[_ngcontent-%COMP%] {\n        width: auto;\n        height: auto;\n    }\n\n    \n    \n    \n\n    \n\n    \n      \n    \n}\n\n\n\n@media screen and (min-width: 768px) {\n    header[_ngcontent-%COMP%] {\n        height: 125px;\n    }\n\n    #logo-words[_ngcontent-%COMP%] {\n        width: auto;\n        height: auto;\n    }\n\n    #menuToggle[_ngcontent-%COMP%] {\n      display: none;\n    }\n\n    .top-menu[_ngcontent-%COMP%] {\n        display: block;\n        list-style: none;\n        text-align: right;\n        margin-right: 15px;\n        font-size: 13pt;\n    }\n\n    .top-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n        margin-bottom: 10px;\n        margin-right: 20px;\n    }\n\n    .top-menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n        margin-bottom: 10px;\n        font-size: 18px;\n        text-decoration: none;\n        cursor: pointer;\n        color: #000;\n        transition: color 0.3s ease;\n      }\n      \n    .top-menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n        color: #fff;\n        font-size: 22px;\n    }  \n\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksb0NBQW9DO0lBQ3BDLDhCQUE4QjtJQUM5QixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLDhCQUE4QjtJQUM5Qiw4QkFBOEI7SUFDOUIsU0FBUztJQUNULG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLHlCQUF5QjtFQUN6QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsV0FBVztFQUNYLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsVUFBVTtFQUNWLGVBQWU7RUFDZixVQUFVO0VBQ1YsVUFBVTtFQUNWLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxXQUFXO0VBQ1gsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YseUJBQXlCO0VBQ3pCOztnQ0FFOEI7QUFDaEM7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsOENBQThDO0VBQzlDLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFVBQVU7RUFDVix1Q0FBdUM7QUFDekM7O0FBRUE7RUFDRSw0Q0FBNEM7QUFDOUM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjtHQUNDLENBQUMscUJBQXFCO0VBQ3ZCLG1DQUFtQztFQUNuQyx1QkFBdUI7RUFDdkIsNkJBQTZCO0VBQzdCLDBEQUEwRDtFQUMxRCxxQ0FBcUM7RUFDckMsa0NBQWtDO0VBQ2xDLGlDQUFpQztFQUNqQyxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUEsZ0JBQWdCOztBQUNoQjtJQUNJO1FBQ0ksV0FBVztRQUNYLFlBQVk7SUFDaEI7O0lBRUE7O09BRUc7O0lBRUg7Ozs7OztPQU1HOztJQUVIOzs7T0FHRzs7SUFFSDs7Ozs7OztTQU9LOztJQUVMOzs7T0FHRztBQUNQOztBQUVBLGlCQUFpQjs7QUFDakI7SUFDSTtRQUNJLGFBQWE7SUFDakI7O0lBRUE7UUFDSSxXQUFXO1FBQ1gsWUFBWTtJQUNoQjs7SUFFQTtNQUNFLGFBQWE7SUFDZjs7SUFFQTtRQUNJLGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLGtCQUFrQjtRQUNsQixlQUFlO0lBQ25COztJQUVBO1FBQ0ksbUJBQW1CO1FBQ25CLGtCQUFrQjtJQUN0Qjs7SUFFQTtRQUNJLG1CQUFtQjtRQUNuQixlQUFlO1FBQ2YscUJBQXFCO1FBQ3JCLGVBQWU7UUFDZixXQUFXO1FBQ1gsMkJBQTJCO01BQzdCOztJQUVGO1FBQ0ksV0FBVztRQUNYLGVBQWU7SUFDbkI7O0FBRUoiLCJmaWxlIjoibmF2LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJoZWFkZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTEsIDExMSwgMjE4KTtcbiAgICBib3JkZXItYm90dG9tOiBzb2xpZCA1cHggYmxhY2s7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAvKiBwYWRkaW5nOiA1cHggMCAxMHB4IDE1cHg7ICovXG4gICAgbWFyZ2luOiAwO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbiNsb2dvLXdvcmRzIHtcbiAgICB3aWR0aDogMzAwcHg7XG4gICAgaGVpZ2h0OiA2MHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnRvcC1tZW51IHtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuXG4jbWVudVRvZ2dsZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gIHotaW5kZXg6IDE7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4jbWVudVRvZ2dsZSBhIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogIzAwMDtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xufVxuXG4jbWVudVRvZ2dsZSBhOmhvdmVyIHtcbiAgY29sb3I6IHJnYigxOTEsIDExMSwgMjE4KTtcbn1cblxuI21lbnVUb2dnbGUgaW5wdXQge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogMzJweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IC03cHg7XG4gIGxlZnQ6IC01cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3BhY2l0eTogMDsgXG4gIHotaW5kZXg6IDI7IFxuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG59XG5cbiNtZW51VG9nZ2xlIHNwYW4ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDMzcHg7XG4gIGhlaWdodDogNHB4O1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZDogIzAwMDtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICB6LWluZGV4OiAxO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiA0cHggMHB4O1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cyBjdWJpYy1iZXppZXIoMC43NywwLjIsMC4wNSwxLjApLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kIDAuNXMgY3ViaWMtYmV6aWVyKDAuNzcsMC4yLDAuMDUsMS4wKSxcbiAgICAgICAgICAgICAgb3BhY2l0eSAwLjU1cyBlYXNlO1xufVxuXG4jbWVudVRvZ2dsZSBzcGFuOmZpcnN0LWNoaWxkIHtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCUgMCU7XG59XG5cbiNtZW51VG9nZ2xlIHNwYW46bnRoLWxhc3QtY2hpbGQoMikge1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAwJSAxMDAlO1xufVxuXG4jbWVudVRvZ2dsZSBpbnB1dDpjaGVja2VkIH4gc3BhbiB7XG4gIG9wYWNpdHk6IDE7XG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKSB0cmFuc2xhdGUoLTJweCwgLTFweCk7XG4gIGJhY2tncm91bmQ6ICMwMDA7XG59XG5cbiNtZW51VG9nZ2xlIGlucHV0OmNoZWNrZWQgfiBzcGFuOm50aC1sYXN0LWNoaWxkKDMpIHtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgc2NhbGUoMC4yLCAwLjIpO1xufVxuXG4jbWVudVRvZ2dsZSBpbnB1dDpjaGVja2VkIH4gc3BhbjpudGgtbGFzdC1jaGlsZCgyKSB7XG4gIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZykgdHJhbnNsYXRlKDAsIC0xcHgpO1xufVxuXG4jbWVudSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDIwMHB4O1xuICBtYXJnaW46IC0xMDBweCAwIDAgLTE3MXB4O1xuICBwYWRkaW5nOiAyMHB4O1xuICBwYWRkaW5nLXRvcDogMTI1cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIC8qYm9yZGVyLWNvbG9yOiAjMDAwO1xuICAqL2xpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAlIDAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDAlLCAwKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgY3ViaWMtYmV6aWVyKDAuNzcsMC4yLDAuMDUsMS4wKTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDAlLCAwKTtcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDAlLCAwKTtcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMCUsIDApO1xuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDAlLCAwKTtcbn1cblxuI21lbnUgbGkge1xuICBwYWRkaW5nOiAxMHB4IDA7XG4gIGZvbnQtc2l6ZTogMjJweDtcbn1cblxuI21lbnVUb2dnbGUgaW5wdXQ6Y2hlY2tlZCB+IHVsIHtcbiAgdHJhbnNmb3JtOiBub25lO1xufVxuXG4vKiBUYWJsZXQgVmlldyAqL1xuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDgwcHgpIHtcbiAgICAjbG9nb1dvcmRzIHtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIGhlaWdodDogYXV0bztcbiAgICB9XG5cbiAgICAvKiAjbWVudVRvZ2dsZSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH0gKi9cbiAgICBcbiAgICAvKiAudG9wLW1lbnUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcbiAgICAgICAgZm9udC1zaXplOiAxM3B0O1xuICAgIH0gKi9cblxuICAgIC8qIC50b3AtbWVudSBsaSB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgICB9ICovXG5cbiAgICAvKiAudG9wLW1lbnUgYSB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGNvbG9yOiAjMDAwO1xuICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2U7XG4gICAgICB9ICovXG4gICAgICBcbiAgICAvKiAudG9wLW1lbnUgYTpob3ZlciB7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICBmb250LXNpemU6IDIycHg7XG4gICAgfSAqL1xufVxuXG4vKiBEZXNrdG9wIFZpZXcgKi9cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgaGVhZGVyIHtcbiAgICAgICAgaGVpZ2h0OiAxMjVweDtcbiAgICB9XG5cbiAgICAjbG9nby13b3JkcyB7XG4gICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgfVxuXG4gICAgI21lbnVUb2dnbGUge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAudG9wLW1lbnUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcbiAgICAgICAgZm9udC1zaXplOiAxM3B0O1xuICAgIH1cblxuICAgIC50b3AtbWVudSBsaSB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgICB9XG5cbiAgICAudG9wLW1lbnUgYSB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGNvbG9yOiAjMDAwO1xuICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2U7XG4gICAgICB9XG4gICAgICBcbiAgICAudG9wLW1lbnUgYTpob3ZlciB7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICBmb250LXNpemU6IDIycHg7XG4gICAgfSAgXG5cbn1cblxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-nav',
                templateUrl: './nav.component.html',
                styleUrls: ['./nav.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "mJ8H":
/*!****************************************!*\
  !*** ./src/app/card/card.component.ts ***!
  \****************************************/
/*! exports provided: CardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardComponent", function() { return CardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _music_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../music.service */ "CFWw");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");







function CardComponent_section_0_mat_card_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-card-actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Details ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_section_0_mat_card_1_Template_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const music_r5 = ctx.$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r7.addPlaylist(music_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "favorite");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const music_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](music_r5.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", music_r5.artist.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", music_r5.artist.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattributeInterpolate2"]("aria-label", "Details for ", music_r5.name, " by ", music_r5.artist.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattributeInterpolate2"]("aria-label", "Add ", music_r5.name, " by ", music_r5.artist.name, " to playlist");
} }
function CardComponent_section_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CardComponent_section_0_mat_card_1_Template, 12, 7, "mat-card", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.musicService.music.track);
} }
function CardComponent_section_1_mat_card_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-card-actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Details ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_section_1_mat_card_1_Template_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const music_r10 = ctx.$implicit; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r12.addPlaylist(music_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "favorite");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const music_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](music_r10.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", music_r10.artist, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", music_r10.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattributeInterpolate2"]("aria-label", "Details for ", music_r10.name, " by ", music_r10.artist, "  ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattributeInterpolate2"]("aria-label", "Add ", music_r10.name, " by ", music_r10.artist, " to playlist");
} }
function CardComponent_section_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CardComponent_section_1_mat_card_1_Template, 12, 7, "mat-card", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.musicService.music.trackmatches.track);
} }
function CardComponent_section_2_mat_card_1_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-card-actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Details ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_section_2_mat_card_1_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const music_r15 = ctx.$implicit; const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r17.addPlaylist(music_r15); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "favorite");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const music_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](music_r15.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", music_r15.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattributeInterpolate2"]("aria-label", "Details for ", music_r15.name, " by ", music_r15.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattributeInterpolate2"]("aria-label", "Add ", music_r15.name, " by ", music_r15.artist.name, " to playlist");
} }
function CardComponent_section_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CardComponent_section_2_mat_card_1_Template, 10, 6, "mat-card", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.musicService.music.artist);
} }
function CardComponent_section_3_mat_card_1_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-card-actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Details ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_section_3_mat_card_1_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const music_r20 = ctx.$implicit; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r22.addPlaylist(music_r20); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const music_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](music_r20.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", music_r20.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattributeInterpolate2"]("aria-label", "Details for ", music_r20.name, " by ", music_r20.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattributeInterpolate2"]("aria-label", "Delete ", music_r20.name, " by ", music_r20.name, " from playlist");
} }
function CardComponent_section_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CardComponent_section_3_mat_card_1_Template, 10, 6, "mat-card", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.musicService.musicArray);
} }
class CardComponent {
    constructor(musicService) {
        this.musicService = musicService;
        this.moodTrack = false;
        this.showTrack = false;
        this.moodArtist = false;
    }
    ngOnInit() {
        this.selectedSearch = this.musicService.getSelectedSearch();
        this.setSearchShow(this.selectedSearch);
    }
    setSearchShow(search) {
        search = this.selectedSearch;
        if (search === "tag.gettoptracks") {
            this.moodTrack = true;
        }
        else if (search === "tag.gettopartists") {
            this.moodArtist = true;
        }
        else if (search === "track.search") {
            this.showTrack = true;
        }
        else {
            this.moodTrack = true;
        }
        console.log("tag:", this.selectedSearch);
    }
    addPlaylist(music) {
        this.musicService.addPlaylist(music);
    }
    deletePlaylist(id) {
        // this.musicService.deletePlaylist(id:number);
    }
}
CardComponent.ɵfac = function CardComponent_Factory(t) { return new (t || CardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_music_service__WEBPACK_IMPORTED_MODULE_1__["MusicService"])); };
CardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CardComponent, selectors: [["app-card"]], inputs: { playlist: "playlist" }, decls: 4, vars: 4, consts: [["aria-label", "search results", 4, "ngIf"], ["aria-label", "search results"], ["class", "result-card", "style", "text-align: center;", 4, "ngFor", "ngForOf"], [1, "result-card", 2, "text-align", "center"], ["mat-card-title", ""], ["target", "_blank", 1, "mat-stroked-button", 3, "href"], ["mat-fab", "", 3, "click"], ["class", "result-card", 4, "ngFor", "ngForOf"], [1, "result-card"], [1, "material-icons", "md-24"]], template: function CardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, CardComponent_section_0_Template, 2, 1, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CardComponent_section_1_Template, 2, 1, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, CardComponent_section_2_Template, 2, 1, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, CardComponent_section_3_Template, 2, 1, "section", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.moodTrack);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showTrack);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.moodArtist);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.playlist);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardSubtitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIcon"]], styles: ["section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-flow: wrap;\n  flex-direction: row;\n  margin: 10px;\n  justify-content: space-evenly;\n}\n\n.mat-card-header[_ngcontent-%COMP%] {\n  justify-content: center;\n}\n\n.mat-card-title[_ngcontent-%COMP%] {\n  font-size: 30px;\n}\n\n.result-card[_ngcontent-%COMP%] {\n  width: 275px;\n  margin: 5px;\n}\n\nbutton[_ngcontent-%COMP%]:focus {\n  outline: 1px solid black;\n}\n\n.material-icons.md-24[_ngcontent-%COMP%] { font-size: 24px;color:black}\n\n@media screen and (min-width: 768px) {\n  \n  \n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBQ0E7RUFDRSxlQUFlO0FBQ2pCOztBQUNBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHdCQUF3QjtBQUMxQjs7QUFDQSx3QkFBd0IsZUFBZSxDQUFDLFdBQVc7O0FBRW5EO0VBQ0U7Ozs7OztPQU1LO0VBQ0w7Ozs7O0tBS0c7QUFDTCIsImZpbGUiOiJjYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJzZWN0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1mbG93OiB3cmFwO1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBtYXJnaW46IDEwcHg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xufVxuXG4ubWF0LWNhcmQtaGVhZGVyIHtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4ubWF0LWNhcmQtdGl0bGUge1xuICBmb250LXNpemU6IDMwcHg7XG59XG4ucmVzdWx0LWNhcmQge1xuICB3aWR0aDogMjc1cHg7XG4gIG1hcmdpbjogNXB4O1xufVxuXG5idXR0b246Zm9jdXMge1xuICBvdXRsaW5lOiAxcHggc29saWQgYmxhY2s7XG59XG4ubWF0ZXJpYWwtaWNvbnMubWQtMjQgeyBmb250LXNpemU6IDI0cHg7Y29sb3I6YmxhY2t9XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC8qIC5yZXN1bHQtY2FyZHtcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xuICAgICAgICBtYXJnaW46IDVweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgXG4gICAgfSAqL1xuICAvKiBkaXYge1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9ICovXG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-card',
                templateUrl: './card.component.html',
                styleUrls: ['./card.component.css']
            }]
    }], function () { return [{ type: _music_service__WEBPACK_IMPORTED_MODULE_1__["MusicService"] }]; }, { playlist: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "ncRd":
/*!**************************************************!*\
  !*** ./src/app/playlists/playlists.component.ts ***!
  \**************************************************/
/*! exports provided: PlaylistsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistsComponent", function() { return PlaylistsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _music_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../music.service */ "CFWw");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../nav/nav.component */ "izVM");
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../card/card.component */ "mJ8H");





class PlaylistsComponent {
    constructor(musicService) {
        this.musicService = musicService;
    }
    ngOnInit() {
        // this.musicService.getTracks(); 
    }
    deletePlaylist() {
        // fire an event to the parent,
        // telling it which villager was deleted
        //this.musicService.deletePlaylist(this.music.id);
    }
}
PlaylistsComponent.ɵfac = function PlaylistsComponent_Factory(t) { return new (t || PlaylistsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_music_service__WEBPACK_IMPORTED_MODULE_1__["MusicService"])); };
PlaylistsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PlaylistsComponent, selectors: [["app-playlists"]], inputs: { music: "music" }, decls: 6, vars: 1, consts: [[3, "playlist"]], template: function PlaylistsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Playlist !");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Playlist");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-card", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("playlist", "test");
    } }, directives: [_nav_nav_component__WEBPACK_IMPORTED_MODULE_2__["NavComponent"], _card_card_component__WEBPACK_IMPORTED_MODULE_3__["CardComponent"]], styles: [".material-icons.md-24[_ngcontent-%COMP%] { font-size: 24px;color:black}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXlsaXN0cy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdCQUF3QixlQUFlLENBQUMsV0FBVyIsImZpbGUiOiJwbGF5bGlzdHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXRlcmlhbC1pY29ucy5tZC0yNCB7IGZvbnQtc2l6ZTogMjRweDtjb2xvcjpibGFja30iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PlaylistsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-playlists',
                templateUrl: './playlists.component.html',
                styleUrls: ['./playlists.component.css']
            }]
    }], function () { return [{ type: _music_service__WEBPACK_IMPORTED_MODULE_1__["MusicService"] }]; }, { music: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _search_music_search_music_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search-music/search-music.component */ "Zmb9");
/* harmony import */ var _results_results_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./results/results.component */ "NUXy");
/* harmony import */ var _playlists_playlists_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./playlists/playlists.component */ "ncRd");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login.component */ "vtpD");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile/profile.component */ "W6KJ");









const routes = [
    { path: '', component: _search_music_search_music_component__WEBPACK_IMPORTED_MODULE_2__["SearchMusicComponent"] },
    { path: 'results', component: _results_results_component__WEBPACK_IMPORTED_MODULE_3__["ResultsComponent"] },
    { path: 'playlists', component: _playlists_playlists_component__WEBPACK_IMPORTED_MODULE_4__["PlaylistsComponent"] },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"] },
    { path: 'profile', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_6__["ProfileComponent"] }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "vtpD":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class LoginComponent {
    constructor() { }
    ngOnInit() {
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 2, vars: 0, template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "login works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map