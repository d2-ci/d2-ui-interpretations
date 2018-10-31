'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _api = require('../util/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comment = function () {
    function Comment(interpretation, attributes) {
        (0, _classCallCheck3.default)(this, Comment);

        this._interpretation = interpretation;
        (0, _assign2.default)(this, attributes);
    }

    (0, _createClass3.default)(Comment, [{
        key: 'save',
        value: function save() {
            var interpretation = this._interpretation;

            var _ref = this.id ? ['PUT', '/interpretations/' + interpretation.id + '/comments/' + this.id] : ['POST', '/interpretations/' + interpretation.id + '/comments'],
                _ref2 = (0, _slicedToArray3.default)(_ref, 2),
                method = _ref2[0],
                url = _ref2[1];

            return (0, _api.apiFetch)(url, method, this.text);
        }
    }, {
        key: 'delete',
        value: function _delete() {
            var interpretation = this._interpretation;
            var url = '/interpretations/' + interpretation.id + '/comments/' + this.id;
            return (0, _api.apiFetch)(url, "DELETE");
        }
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
            return user && user.userCredentials && user.userCredentials.username !== currentUsername ? "@" + user.userCredentials.username + "\xA0" : "";
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

exports.default = Comment;