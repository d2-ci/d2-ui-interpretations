import _regeneratorRuntime from "babel-runtime/regenerator";
import _JSON$stringify from "babel-runtime/core-js/json/stringify";
import _asyncToGenerator from "babel-runtime/helpers/asyncToGenerator";

var _this = this;

import isObject from 'lodash/fp/isObject';

export var apiFetch = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(d2, urlOrPath, method) {
        var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var api, payload, options, url;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        api = d2.Api.getApi();
                        payload = isObject(body) && method !== "GET" ? _JSON$stringify(body) : body;
                        options = {
                            headers: {
                                "Content-Type": isObject(body) ? 'application/json' : 'text/plain'
                            }
                        };
                        url = urlOrPath.startsWith("/") ? api.baseUrl + urlOrPath : urlOrPath;
                        return _context.abrupt("return", api.request(method, url, payload, options));

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function apiFetch(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

export var apiFetchWithResponse = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(d2, urlOrPath, method) {
        var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var api, url, options;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        api = d2.Api.getApi();
                        url = urlOrPath.startsWith("/") ? api.baseUrl + urlOrPath : urlOrPath;
                        options = {
                            method: method,
                            body: body,
                            mode: 'cors',
                            credentials: 'include',
                            cache: 'default'
                        };
                        return _context2.abrupt("return", fetch(url, options));

                    case 4:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    return function apiFetchWithResponse(_x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
    };
}();