'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setSubscription = exports.getFavoriteWithInterpretations = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _interpretation = require('./interpretation');

var _interpretation2 = _interopRequireDefault(_interpretation);

var _pick = require('lodash/fp/pick');

var _pick2 = _interopRequireDefault(_pick);

var _api = require('../util/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interpretationsFields = ['id', 'user[id,displayName,userCredentials[username]]', 'created', 'likes', 'likedBy[id,displayName]', 'text', 'comments[id,text,created,user[id,displayName,userCredentials[username]]]'];

var favoriteFields = ['id', 'name', 'href', 'subscribed', 'user[id,displayName]', 'displayName', 'description', 'displayDescription', 'created', 'lastUpdated', 'access', 'publicAccess', 'externalAccess', 'userAccesses', 'userGroupAccesses', 'interpretations[' + interpretationsFields.join(',') + ']'];

var getFavoriteWithInterpretations = exports.getFavoriteWithInterpretations = function getFavoriteWithInterpretations(d2, type, id) {
    var modelClass = d2.models[type];
    var api = d2.Api.getApi();
    var model$ = modelClass.get(id, { fields: favoriteFields.join(',') });
    var views$ = api.get('dataStatistics/favorites/' + id).then(function (json) {
        return json.views;
    });

    return _promise2.default.all([model$, views$]).then(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            model = _ref2[0],
            views = _ref2[1];

        var modelInterpretations = model.interpretations.map(function (attrs) {
            return new _interpretation2.default(model, attrs);
        });

        return (0, _assign2.default)(model, {
            interpretations: modelInterpretations,
            favoriteViews: views,
            modelName: type
        });
    });
};

var setSubscription = exports.setSubscription = function setSubscription(model, newSubscriptionValue) {
    if (!model || !model.href) {
        return _promise2.default.reject(new Error('Attribute href not found in model'));
    } else {
        var path = model.href + "/" + "subscriber";
        var method = newSubscriptionValue ? "POST" : "DELETE";
        return (0, _api.apiFetch)(path, method);
    }
};