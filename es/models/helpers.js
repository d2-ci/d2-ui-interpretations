import _Object$assign from 'babel-runtime/core-js/object/assign';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _Promise from 'babel-runtime/core-js/promise';
import Interpretation from './interpretation';
import pick from 'lodash/fp/pick';
import { apiFetch } from '../util/api';

var interpretationsFields = ['id', 'user[id,displayName,userCredentials[username]]', 'created', 'likes', 'likedBy[id,displayName]', 'text', 'comments[id,text,created,user[id,displayName,userCredentials[username]]]'];

var favoriteFields = ['id', 'name', 'href', 'subscribed', 'user[id,displayName]', 'displayName', 'description', 'displayDescription', 'created', 'lastUpdated', 'access', 'publicAccess', 'externalAccess', 'userAccesses', 'userGroupAccesses', 'interpretations[' + interpretationsFields.join(',') + ']'];

export var getFavoriteWithInterpretations = function getFavoriteWithInterpretations(d2, type, id) {
    var modelClass = d2.models[type];
    var api = d2.Api.getApi();
    var model$ = modelClass.get(id, { fields: favoriteFields.join(',') });
    var views$ = api.get('dataStatistics/favorites/' + id).then(function (json) {
        return json.views;
    });

    return _Promise.all([model$, views$]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            model = _ref2[0],
            views = _ref2[1];

        var modelInterpretations = model.interpretations.map(function (attrs) {
            return new Interpretation(model, attrs);
        });

        return _Object$assign(model, {
            interpretations: modelInterpretations,
            favoriteViews: views,
            modelName: type
        });
    });
};

export var setSubscription = function setSubscription(model, newSubscriptionValue) {
    if (!model || !model.href) {
        return _Promise.reject(new Error('Attribute href not found in model'));
    } else {
        var path = model.href + "/" + "subscriber";
        var method = newSubscriptionValue ? "POST" : "DELETE";
        return apiFetch(path, method);
    }
};