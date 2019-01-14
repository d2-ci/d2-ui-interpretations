import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _Promise from 'babel-runtime/core-js/promise';

var _this = this;

import Interpretation from '../models/interpretation';
import { apiFetch } from './api';
import { itemTypeMap } from './redirect';

var interpretationsFields = ['id', 'user[id,displayName,userCredentials[username]]', 'created', 'lastUpdated', 'likes', 'likedBy[id,displayName]', 'text', 'publicAccess', 'externalAccess', 'userAccesses', 'userGroupAccesses', 'comments[id,text,created,lastUpdated,user[id,displayName,userCredentials[username]]]'];

var favoriteFields = ['id', 'name', 'href', 'subscribed', 'user[id,displayName]', 'displayName', 'description', 'displayDescription', 'created', 'lastUpdated', 'access', 'publicAccess', 'externalAccess', 'userAccesses', 'userGroupAccesses', 'interpretations[' + interpretationsFields.join(',') + ']'];

export var getFavoriteWithInterpretations = function getFavoriteWithInterpretations(d2, type, id) {
    var propName = itemTypeMap[type.toUpperCase()].propName;
    var modelClass = d2.models[propName];
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

export var setSubscription = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(d2, model, newSubscriptionValue) {
        var path, method;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(!model || !model.href)) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt('return', _Promise.reject(new Error('Attribute href not found in model')));

                    case 4:
                        path = model.href + '/subscriber';
                        method = newSubscriptionValue ? "POST" : "DELETE";
                        _context.next = 8;
                        return apiFetch(d2, path, method);

                    case 8:
                        return _context.abrupt('return', _context.sent);

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function setSubscription(_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
    };
}();