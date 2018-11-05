import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import { apiFetch } from '../util/api';

var Comment = function () {
    function Comment(interpretation, attributes) {
        _classCallCheck(this, Comment);

        this._interpretation = interpretation;
        _Object$assign(this, attributes);
    }

    _createClass(Comment, [{
        key: 'save',
        value: function save() {
            var interpretation = this._interpretation;

            var _ref = this.id ? ['PUT', '/interpretations/' + interpretation.id + '/comments/' + this.id] : ['POST', '/interpretations/' + interpretation.id + '/comments'],
                _ref2 = _slicedToArray(_ref, 2),
                method = _ref2[0],
                url = _ref2[1];

            return apiFetch(url, method, this.text);
        }
    }, {
        key: 'delete',
        value: function _delete() {
            var interpretation = this._interpretation;
            var url = '/interpretations/' + interpretation.id + '/comments/' + this.id;
            return apiFetch(url, "DELETE");
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

export default Comment;