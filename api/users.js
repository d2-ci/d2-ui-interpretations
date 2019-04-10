'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMentions = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getMentions = exports.getMentions = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(d2) {
        var allUsersResponse, interpretationsResponse, commentsResponse, allUsers, allUsersByUsername, interpretationMentions, commentMentions, sortByFrequency, mostMentionedUsernames, mostMentionedUsers, allUsersFiltered;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _api.apiFetch)(d2, "/users", "GET", {
                            fields: "id,displayName,userCredentials[username]",
                            order: "displayName:asc",
                            paging: false
                        });

                    case 2:
                        allUsersResponse = _context.sent;
                        _context.next = 5;
                        return (0, _api.apiFetch)(d2, "/interpretations", "GET", {
                            fields: "id,mentions",
                            filter: ['user.id:eq:' + d2.currentUser.id, "mentions:!null"],
                            paging: false
                        });

                    case 5:
                        interpretationsResponse = _context.sent;
                        _context.next = 8;
                        return (0, _api.apiFetch)(d2, "/interpretations", "GET", {
                            fields: "id,comments[mentions]",
                            filter: ['comments.user.id:eq:' + d2.currentUser.id, "comments.mentions.username:!null"],
                            paging: false
                        });

                    case 8:
                        commentsResponse = _context.sent;
                        allUsers = allUsersResponse.users.map(function (user) {
                            return {
                                id: user.id,
                                displayName: user.displayName,
                                username: user.userCredentials.username
                            };
                        });
                        allUsersByUsername = (0, _fp.keyBy)("username", allUsers);
                        interpretationMentions = (0, _fp.flatMap)(function (interpretation) {
                            return (0, _fp.map)("username", interpretation.mentions);
                        }, interpretationsResponse.interpretations);
                        commentMentions = (0, _fp.flatMap)(function (interpretation) {
                            return (0, _fp.map)("username", (0, _fp.flatMap)("mentions", interpretation.comments));
                        }, commentsResponse.interpretations);
                        sortByFrequency = (0, _fp.flow)((0, _fp.groupBy)(function (value) {
                            return value;
                        }), _fp.toPairs, (0, _fp.map)(function (_ref2) {
                            var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
                                value = _ref3[0],
                                group = _ref3[1];

                            return { value: value, count: group.length };
                        }), (0, _fp.orderBy)(["count", "value"], ["desc", "asc"]), (0, _fp.map)("value"));
                        mostMentionedUsernames = (0, _fp.flow)((0, _fp.concat)(commentMentions), (0, _fp.without)([d2.currentUser.username]), sortByFrequency)(interpretationMentions);
                        mostMentionedUsers = (0, _fp.compact)((0, _fp.at)(mostMentionedUsernames, allUsersByUsername));
                        allUsersFiltered = (0, _fp.differenceBy)("id", allUsers, mostMentionedUsers).filter(function (user) {
                            return d2.currentUser.id !== user.id;
                        });
                        return _context.abrupt('return', { allUsers: allUsersFiltered, mostMentionedUsers: mostMentionedUsers });

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getMentions(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _api = require('./api');

var _fp = require('lodash/fp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;