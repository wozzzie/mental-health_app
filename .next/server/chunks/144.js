exports.id = 144;
exports.ids = [144];
exports.modules = {

/***/ 8668:
/***/ ((module) => {

// Exports
module.exports = {
	"btn": "style_btn__EWcyD"
};


/***/ }),

/***/ 5073:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "style_container__QfKPO"
};


/***/ }),

/***/ 7899:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8668);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);



const Button = ({ onClick, type = "button", text, iconProps, testId })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        type: type,
        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_2___default().btn),
        onClick: onClick,
        "data-testid": testId,
        children: [
            iconProps ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                src: iconProps.src,
                width: iconProps.size,
                height: iconProps.size,
                alt: iconProps.alt
            }) : null,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                children: text
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);


/***/ }),

/***/ 1529:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ ErrorBoundaryWithMessage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react_error_boundary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6812);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_error_boundary__WEBPACK_IMPORTED_MODULE_1__]);
react_error_boundary__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const ErrorBoundaryWithMessage = ({ children })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_error_boundary__WEBPACK_IMPORTED_MODULE_1__.ErrorBoundary, {
        fallback: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: "Something went wrong..."
        }),
        children: children
    });
};


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8684:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5073);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_1__);


const PageContainer = ({ children })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_1___default().container),
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageContainer);


/***/ }),

/***/ 8229:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const ROUTES = {
    SIGN_IN: "/auth/sign-in",
    SIGN_UP: "/auth/sign-up",
    WELCOME: "/",
    APP: "/app"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ROUTES);


/***/ }),

/***/ 2037:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LE: () => (/* binding */ logInWithEmailAndPassword),
/* harmony export */   bE: () => (/* binding */ registerWithEmailAndPassword),
/* harmony export */   kS: () => (/* binding */ logout)
/* harmony export */ });
/* unused harmony exports firebase, db, auth */
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3745);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(401);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_auth__WEBPACK_IMPORTED_MODULE_2__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_auth__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const firebaseConfig = {
    apiKey: "AIzaSyCOsYwn1mafgZjvCuduhYfXXp4z06tPMGI",
    authDomain: "mental-health-app-45e07.firebaseapp.com",
    projectId: "mental-health-app-45e07",
    storageBucket: "mental-health-app-45e07.appspot.com",
    messagingSenderId: "944541102314",
    appId: "1:944541102314:web:77bcc2f993cbd74862e793"
};
const getFirebaseApp = (config = {})=>{
    try {
        return (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApp)();
    } catch (e) {
        return (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(config);
    }
};
const firebase = getFirebaseApp(firebaseConfig);
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(firebase);
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)(firebase);
const registerWithEmailAndPassword = async (email, password)=>{
    return await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.createUserWithEmailAndPassword)(auth, email, password).then(async (res)=>{
        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.addDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(db, "users"), {
            id: res.user.uid,
            email
        });
        return res;
    });
};
const logInWithEmailAndPassword = async (email, password)=>{
    return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithEmailAndPassword)(auth, email, password);
};
const logout = async ()=>{
    (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signOut)(auth);
};
(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.setPersistence)(auth, firebase_auth__WEBPACK_IMPORTED_MODULE_2__.browserSessionPersistence);


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;