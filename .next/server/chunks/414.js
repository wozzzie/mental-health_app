exports.id = 414;
exports.ids = [414];
exports.modules = {

/***/ 5745:
/***/ ((module) => {

// Exports
module.exports = {
	"form": "style_form__1epTQ",
	"form__block": "style_form__block__kmB3p",
	"form__wrapper": "style_form__wrapper__3reV_",
	"form__img": "style_form__img__4Cp1I",
	"form__loading": "style_form__loading__sVsFi",
	"form__title": "style_form__title__zZ74a",
	"form__title_link": "style_form__title_link__8UlKO",
	"form__controls": "style_form__controls__TxvJ1",
	"form__error": "style_form__error__lmvEh",
	"form__item": "style_form__item__pWGOV",
	"form__input": "style_form__input__vwCBz",
	"form__label": "style_form__label__1hO31"
};


/***/ }),

/***/ 1909:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1377);
/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5641);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1908);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8176);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_page_container_pageContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8684);
/* harmony import */ var _constants_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8229);
/* harmony import */ var _button_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7899);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(287);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5745);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _error_boundary_errorBoundary__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1529);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hook_form__WEBPACK_IMPORTED_MODULE_5__, _hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_7__, _error_boundary_errorBoundary__WEBPACK_IMPORTED_MODULE_12__]);
([react_hook_form__WEBPACK_IMPORTED_MODULE_5__, _hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_7__, _error_boundary_errorBoundary__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);















const AuthView = ({ authCallback, page })=>{
    const { t } = (0,next_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const schema = yup__WEBPACK_IMPORTED_MODULE_1__.object().shape({
        email: yup__WEBPACK_IMPORTED_MODULE_1__.string().required(t("validation.required") || "").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, t("validation.email") || ""),
        password: yup__WEBPACK_IMPORTED_MODULE_1__.string().required(t("validation.required") || "").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#-_?&])[A-Za-z\d@$!%*#-_?&]{8,}$/, t("validation.password") || "")
    });
    const resolver = (0,_hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_7__.yupResolver)(schema);
    const { register, handleSubmit, formState: { errors } } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useForm)({
        resolver
    });
    const [authError, setAuthError] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)("");
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
    const onSubmit = handleSubmit(async ({ email, password })=>{
        setLoading(true);
        try {
            await authCallback(email, password);
            setLoading(false);
            next_router__WEBPACK_IMPORTED_MODULE_2___default().push(_constants_routes__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z.APP);
        } catch (e) {
            const err = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_13__/* .getAuthError */ .G)(e);
            setAuthError(err);
            setLoading(false);
        }
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_page_container_pageContainer__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__wrapper),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("picture", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: "/sign-in-img.png",
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__img),
                        alt: "sign-in"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__block),
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form),
                        onSubmit: onSubmit,
                        children: [
                            loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__loading),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_spinners__WEBPACK_IMPORTED_MODULE_8__.RingLoader, {
                                    loading: loading,
                                    color: "#a359ff"
                                })
                            }) : null,
                            authError && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__error),
                                "data-testid": "auth-error",
                                children: authError
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__controls),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__item),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__input),
                                                id: "email",
                                                type: "text",
                                                ...register("email"),
                                                placeholder: t("sign.placeholder-email") || ""
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__label),
                                                htmlFor: "email",
                                                children: t("sign.email")
                                            }),
                                            errors.email?.message && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__error),
                                                "data-testid": "auth-error",
                                                children: errors.email?.message
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__item),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__input),
                                                id: "password",
                                                type: "password",
                                                ...register("password"),
                                                placeholder: t("sign.placeholder-password") || ""
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__label),
                                                htmlFor: "password",
                                                children: t("sign.password")
                                            }),
                                            errors.password?.message && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().form__error),
                                                "data-testid": "auth-error",
                                                children: errors.password?.message
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_error_boundary_errorBoundary__WEBPACK_IMPORTED_MODULE_12__/* .ErrorBoundaryWithMessage */ .c, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_button_Button__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                    type: "submit",
                                    text: page === "SIGN_IN" ? `${t("header.btn-signin")}` : `${t("header.btn-signup")}`,
                                    iconProps: {
                                        src: "/sign-in.png",
                                        alt: "sign-in icon",
                                        size: 32
                                    },
                                    testId: "auth-btn"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: page === "SIGN_IN" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        t("sign.account-false"),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                            "data-testid": "login-link",
                                            href: _constants_routes__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z.SIGN_UP,
                                            children: [
                                                t("header.btn-signup"),
                                                "!"
                                            ]
                                        })
                                    ]
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        t("sign.account-true"),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                            "data-testid": "login-link",
                                            href: _constants_routes__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z.SIGN_IN,
                                            children: [
                                                t("header.btn-signin"),
                                                "!"
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthView);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9606:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* reexport module object */ firebase_admin__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2509);
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_admin__WEBPACK_IMPORTED_MODULE_0__);

const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const projectId = "mental-health-app-45e07";
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
if (!privateKey || !projectId || !clientEmail) {
    throw new Error(`Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`);
}
if (!firebase_admin__WEBPACK_IMPORTED_MODULE_0__.apps.length) {
    firebase_admin__WEBPACK_IMPORTED_MODULE_0__.initializeApp({
        credential: firebase_admin__WEBPACK_IMPORTED_MODULE_0__.credential.cert({
            privateKey: privateKey ? privateKey.replace(/\\n/gm, "\n") : undefined,
            clientEmail,
            projectId
        }),
        databaseURL: `https://${projectId}.firebaseio.com`
    });
}



/***/ }),

/***/ 287:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ getAuthError)
/* harmony export */ });
function getAuthError(e) {
    const error = e;
    switch(error.code){
        case "auth/email-already-in-use":
            return "The email address is already in use";
        case "auth/invalid-email":
            return "The email address is not valid.";
        case "auth/operation-not-allowed":
            return "Operation not allowed.";
        case "auth/user-not-found":
            return "User not found!";
        case "auth/wrong-password":
            return "Wrong username or password!";
        default:
            return error.message;
    }
}


/***/ })

};
;