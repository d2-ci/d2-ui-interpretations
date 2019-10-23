'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.apiFetchWithResponse = exports.apiFetch = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isObject = require('lodash/fp/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _d = require('d2');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiFetch = exports.apiFetch = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(urlOrPath, method) {
        var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var d2, api, payload, options, url;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _d.getInstance)();

                    case 2:
                        d2 = _context.sent;
                        api = d2.Api.getApi();
                        payload = (0, _isObject2.default)(body) && method !== "GET" ? (0, _stringify2.default)(body) : body;
                        options = {
                            headers: {
                                "Content-Type": (0, _isObject2.default)(body) ? 'application/json' : 'text/plain'
                            }
                        };
                        url = urlOrPath.startsWith("/") ? api.baseUrl + urlOrPath : urlOrPath;
                        return _context.abrupt('return', api.request(method, url, payload, options));

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function apiFetch(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var apiFetchWithResponse = exports.apiFetchWithResponse = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(urlOrPath, method) {
        var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var d2, api, url, options;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return (0, _d.getInstance)();

                    case 2:
                        d2 = _context2.sent;
                        api = d2.Api.getApi();
                        url = urlOrPath.startsWith("/") ? api.baseUrl + urlOrPath : urlOrPath;
                        options = {
                            method: method,
                            body: body,
                            mode: 'cors',
                            credentials: 'include',
                            cache: 'default'
                        };
                        return _context2.abrupt('return', fetch(url, options));

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function apiFetchWithResponse(_x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();