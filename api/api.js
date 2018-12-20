import _JSON$stringify from "babel-runtime/core-js/json/stringify";
import isObject from 'lodash/fp/isObject';

export var apiFetch = function apiFetch(d2, urlOrPath, method) {
    var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var api = d2.Api.getApi();
    var payload = isObject(body) && method !== "GET" ? _JSON$stringify(body) : body;
    var options = {
        headers: {
            "Content-Type": isObject(body) ? 'application/json' : 'text/plain'
        }
    };
    var url = urlOrPath.startsWith("/") ? api.baseUrl + urlOrPath : urlOrPath;

    return api.request(method, url, payload, options);
};

export var apiFetchWithResponse = function apiFetchWithResponse(d2, urlOrPath, method) {
    var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var api = d2.Api.getApi();
    var url = urlOrPath.startsWith("/") ? api.baseUrl + urlOrPath : urlOrPath;
    var options = {
        method: method,
        body: body,
        mode: 'cors',
        credentials: 'include',
        cache: 'default'
    };

    return fetch(url, options);
};