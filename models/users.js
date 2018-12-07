import _regeneratorRuntime from 'babel-runtime/regenerator';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { apiFetch } from '../util/api';
import { keyBy, map, flatMap, flow, groupBy, without } from 'lodash/fp';
import { orderBy, concat, toPairs, at, differenceBy, compact } from 'lodash/fp';

export var getMentions = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(d2) {
        var allUsersResponse, interpretationsResponse, commentsResponse, allUsers, allUsersByUsername, interpretationMentions, commentMentions, sortByFrequency, mostMentionedUsernames, mostMentionedUsers, allUsersFiltered;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return apiFetch("/users", "GET", {
                            fields: "id,displayName,userCredentials[username]",
                            order: "displayName:asc",
                            paging: false
                        });

                    case 2:
                        allUsersResponse = _context.sent;
                        _context.next = 5;
                        return apiFetch("/interpretations", "GET", {
                            fields: "id,mentions",
                            filter: ['user.id:eq:' + d2.currentUser.id, "mentions:!null"],
                            paging: false
                        });

                    case 5:
                        interpretationsResponse = _context.sent;
                        _context.next = 8;
                        return apiFetch("/interpretations", "GET", {
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
                        allUsersByUsername = keyBy("username", allUsers);
                        interpretationMentions = flatMap(function (interpretation) {
                            return map("username", interpretation.mentions);
                        }, interpretationsResponse.interpretations);
                        commentMentions = flatMap(function (interpretation) {
                            return map("username", flatMap("mentions", interpretation.comments));
                        }, commentsResponse.interpretations);
                        sortByFrequency = flow(groupBy(function (value) {
                            return value;
                        }), toPairs, map(function (_ref2) {
                            var _ref3 = _slicedToArray(_ref2, 2),
                                value = _ref3[0],
                                group = _ref3[1];

                            return { value: value, count: group.length };
                        }), orderBy(["count", "value"], ["desc", "asc"]), map("value"));
                        mostMentionedUsernames = flow(concat(commentMentions), without([d2.currentUser.username]), sortByFrequency)(interpretationMentions);
                        mostMentionedUsers = compact(at(mostMentionedUsernames, allUsersByUsername));
                        allUsersFiltered = differenceBy("id", allUsers, mostMentionedUsers).filter(function (user) {
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