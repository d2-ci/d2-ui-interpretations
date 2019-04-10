'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _misc = require('./misc');

var _CommentTextarea = require('./CommentTextarea');

var _CommentTextarea2 = _interopRequireDefault(_CommentTextarea);

var _auth = require('../../util/auth');

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _comment = require('../../models/comment');

var _comment2 = _interopRequireDefault(_comment);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _orderBy = require('lodash/fp/orderBy');

var _orderBy2 = _interopRequireDefault(_orderBy);

var _InterpretationsStyles = require('./InterpretationsStyles.js');

var _InterpretationsStyles2 = _interopRequireDefault(_InterpretationsStyles);

var _i18n = require('../../util/i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comment = function Comment(_ref) {
    var comment = _ref.comment,
        showManageActions = _ref.showManageActions,
        onEdit = _ref.onEdit,
        onDelete = _ref.onDelete,
        onReply = _ref.onReply;
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { style: _InterpretationsStyles2.default.commentText },
            comment.text
        ),
        _react2.default.createElement(
            'span',
            { style: _InterpretationsStyles2.default.tipText },
            (0, _i18n.formatRelative)(comment.created)
        ),
        _react2.default.createElement(_misc.ActionSeparator, { labelText: '' }),
        showManageActions ? _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_misc.Link, { label: _d2I18n2.default.t('Edit'), value: comment, onClick: onEdit }),
            _react2.default.createElement(_misc.ActionSeparator, null),
            _react2.default.createElement(_misc.Link, { label: _d2I18n2.default.t('Reply'), value: comment, onClick: onReply }),
            _react2.default.createElement(_misc.ActionSeparator, null),
            _react2.default.createElement(_misc.Link, { label: _d2I18n2.default.t('Delete'), value: comment, onClick: onDelete })
        ) : _react2.default.createElement(_misc.Link, { label: _d2I18n2.default.t('Reply'), value: comment, onClick: onReply })
    );
};

var InterpretationComments = function (_React$Component) {
    (0, _inherits3.default)(InterpretationComments, _React$Component);

    function InterpretationComments(props) {
        (0, _classCallCheck3.default)(this, InterpretationComments);

        var _this = (0, _possibleConstructorReturn3.default)(this, (InterpretationComments.__proto__ || (0, _getPrototypeOf2.default)(InterpretationComments)).call(this, props));

        _this.onSave = _this.onSave.bind(_this);
        _this.onUpdate = _this.onUpdate.bind(_this);
        _this.onEdit = _this.onEdit.bind(_this);
        _this.onDelete = _this.onDelete.bind(_this);
        _this.onReply = _this.onReply.bind(_this);
        _this.onShowMoreComments = _this.onShowMoreComments.bind(_this);
        _this.onCancelEdit = _this.onCancelEdit.bind(_this);

        _this.state = {
            commentToEdit: null,
            newComment: props.newComment,
            showOnlyFirstComments: true
        };
        return _this;
    }

    (0, _createClass3.default)(InterpretationComments, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (this.props.newComment !== newProps.newComment) {
                this.setState({ newComment: newProps.newComment });
            }
        }
    }, {
        key: 'onShowMoreComments',
        value: function onShowMoreComments() {
            this.setState({ showOnlyFirstComments: false });
        }
    }, {
        key: 'onEdit',
        value: function onEdit(comment) {
            this.setState({ commentToEdit: comment });
        }
    }, {
        key: 'onCancelEdit',
        value: function onCancelEdit(comment) {
            this.setState({ commentToEdit: null });
        }
    }, {
        key: 'onDelete',
        value: function onDelete(comment) {
            if (confirm(_d2I18n2.default.t('Are you sure you want to remove this comment?'))) {
                this.props.onDelete(comment);
            }
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(comment) {
            this.props.onSave(comment);
            this.setState({ commentToEdit: null });
        }
    }, {
        key: 'onSave',
        value: function onSave(comment) {
            this.props.onSave(comment);
            this.setState({ showOnlyFirstComments: false });
        }
    }, {
        key: 'onReply',
        value: function onReply(comment) {
            var newComment = comment.getReply(this.context.d2);
            this.setState({ commentToEdit: null, newComment: newComment });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var d2 = this.context.d2;
            var interpretation = this.props.interpretation;
            var _state = this.state,
                commentToEdit = _state.commentToEdit,
                newComment = _state.newComment,
                showOnlyFirstComments = _state.showOnlyFirstComments;

            var sortedComments = (0, _orderBy2.default)(["created"], ["asc"], interpretation.comments);
            var commentsToShowOnInit = 3;
            var comments = showOnlyFirstComments ? sortedComments.slice(0, commentsToShowOnInit) : sortedComments;
            var hiddenCommentsCount = showOnlyFirstComments ? sortedComments.length - comments.length : 0;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'interpretation-comments' },
                    comments.map(function (comment) {
                        return _react2.default.createElement(
                            _misc.WithAvatar,
                            { key: comment.id, user: comment.user },
                            _react2.default.createElement(
                                'div',
                                { style: _InterpretationsStyles2.default.commentAuthor },
                                (0, _misc.getUserLink)(d2, comment.user)
                            ),
                            commentToEdit && commentToEdit.id === comment.id ? _react2.default.createElement(_CommentTextarea2.default, {
                                comment: comment,
                                onPost: _this2.onUpdate,
                                onCancel: _this2.onCancelEdit
                            }) : _react2.default.createElement(Comment, {
                                comment: comment,
                                showManageActions: (0, _auth.userCanManage)(d2, comment),
                                onEdit: _this2.onEdit,
                                onDelete: _this2.onDelete,
                                onReply: _this2.onReply
                            })
                        );
                    }),
                    showOnlyFirstComments && hiddenCommentsCount > 0 && _react2.default.createElement(
                        'div',
                        { style: { width: "100%", textAlign: "center" } },
                        _react2.default.createElement(
                            _Button2.default,
                            { onClick: this.onShowMoreComments, style: { display: "inline-block" } },
                            _react2.default.createElement(
                                'span',
                                { style: _InterpretationsStyles2.default.showMoreComments },
                                hiddenCommentsCount,
                                ' ',
                                _d2I18n2.default.t("more comments")
                            )
                        )
                    )
                ),
                newComment && _react2.default.createElement(
                    _misc.WithAvatar,
                    { user: d2.currentUser },
                    _react2.default.createElement(_CommentTextarea2.default, {
                        comment: newComment,
                        onPost: this.onSave
                    })
                )
            );
        }
    }]);
    return InterpretationComments;
}(_react2.default.Component);

InterpretationComments.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};
InterpretationComments.propTypes = {
    interpretation: _propTypes2.default.object.isRequired,
    onSave: _propTypes2.default.func.isRequired,
    onDelete: _propTypes2.default.func.isRequired,
    newComment: _propTypes2.default.object
};
exports.default = InterpretationComments;
;