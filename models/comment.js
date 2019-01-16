import _regeneratorRuntime from 'babel-runtime/regenerator';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import { apiFetch } from '../api/api';

var Comment = function () {
    function Comment(interpretation, attributes) {
        _classCallCheck(this, Comment);

        this._interpretation = interpretation;
        _Object$assign(this, attributes);
    }

    _createClass(Comment, [{
        key: 'save',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(d2) {
                var interpretation, _ref2, _ref3, method, url;

                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                interpretation = this._interpretation;
                                _ref2 = this.id ? ['PUT', '/interpretations/' + interpretation.id + '/comments/' + this.id] : ['POST', '/interpretations/' + interpretation.id + '/comments'], _ref3 = _slicedToArray(_ref2, 2), method = _ref3[0], url = _ref3[1];
                                _context.next = 4;
                                return apiFetch(d2, url, method, this.text);

                            case 4:
                                return _context.abrupt('return', _context.sent);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }()
    }, {
        key: 'delete',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(d2) {
                var interpretation, url;
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                interpretation = this._interpretation;
                                url = '/interpretations/' + interpretation.id + '/comments/' + this.id;
                                _context2.next = 4;
                                return apiFetch(d2, url, "DELETE");

                            case 4:
                                return _context2.abrupt('return', _context2.sent);

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function _delete(_x2) {
                return _ref4.apply(this, arguments);
            }

            return _delete;
        }()
    }, {
        key: 'getReply',
        value: function getReply(d2) {
            var text = Comment.getReplyText(d2, this.user);
            return new Comment(this._interpretation, { text: text });
        }
    }], [{
        key: 'getReplyText',
        value: function getReplyText(d2, user) {
            var currentUsername = d2.currentUser.username;
            return user && user.userCredentials && user.userCredentials.username !== currentUsername ? "@" + user.userCredentials.username + " " : "";
        }
    }, {
        key: 'getReplyForInterpretation',
        value: function getReplyForInterpretation(d2, interpretation) {
            var text = Comment.getReplyText(d2, interpretation.user);
            return new Comment(interpretation, { text: text });
        }
    }]);

    return Comment;
}();

export default Comment;