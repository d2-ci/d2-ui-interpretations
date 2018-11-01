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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ThumbUp = require('@material-ui/icons/ThumbUp');

var _ThumbUp2 = _interopRequireDefault(_ThumbUp);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _d2UiSharingDialog = require('@dhis2/d2-ui-sharing-dialog');

var _d2UiSharingDialog2 = _interopRequireDefault(_d2UiSharingDialog);

var _some = require('lodash/fp/some');

var _some2 = _interopRequireDefault(_some);

var _InterpretationComments = require('./InterpretationComments');

var _InterpretationComments2 = _interopRequireDefault(_InterpretationComments);

var _InterpretationDialog = require('./InterpretationDialog');

var _InterpretationDialog2 = _interopRequireDefault(_InterpretationDialog);

var _misc = require('./misc');

var _auth = require('../../util/auth');

var _InterpretationsStyles = require('./InterpretationsStyles.js');

var _InterpretationsStyles2 = _interopRequireDefault(_InterpretationsStyles);

var _comment = require('../../models/comment');

var _comment2 = _interopRequireDefault(_comment);

var _i18n = require('../../util/i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Interpretation = function (_React$Component) {
    (0, _inherits3.default)(Interpretation, _React$Component);

    function Interpretation(props) {
        (0, _classCallCheck3.default)(this, Interpretation);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Interpretation.__proto__ || (0, _getPrototypeOf2.default)(Interpretation)).call(this, props));

        _this.state = {
            newComment: null,
            interpretationToEdit: null,
            sharingDialogIsOpen: false
        };

        _this.openSharingDialog = function () {
            _this.setState({ sharingDialogIsOpen: true });
        };

        _this.closeSharingDialog = function () {
            _this.setState({ sharingDialogIsOpen: false });
        };

        _this.notifyChange = _this.notifyChange.bind(_this);
        _this.saveInterpretationAndClose = _this.saveInterpretationAndClose.bind(_this);
        _this.closeInterpretationDialog = _this.closeInterpretationDialog.bind(_this);
        _this.deleteInterpretation = _this.deleteInterpretation.bind(_this);
        _this.openInterpretationDialog = _this.openInterpretationDialog.bind(_this);
        _this.like = _this.like.bind(_this);
        _this.reply = _this.reply.bind(_this);
        _this.unlike = _this.unlike.bind(_this);
        _this.saveComment = _this.saveComment.bind(_this);
        _this.deleteComment = _this.deleteComment.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Interpretation, [{
        key: 'notifyChange',
        value: function notifyChange(interpretation) {
            if (this.props.onChange) {
                this.props.onChange(interpretation);
            }
        }
    }, {
        key: 'saveInterpretationLike',
        value: function saveInterpretationLike(interpretation, value) {
            var _this2 = this;

            interpretation.like(value).then(function () {
                return _this2.notifyChange(interpretation);
            });
        }
    }, {
        key: 'like',
        value: function like() {
            this.saveInterpretationLike(this.props.interpretation, true);
        }
    }, {
        key: 'unlike',
        value: function unlike() {
            this.saveInterpretationLike(this.props.interpretation, false);
        }
    }, {
        key: 'reply',
        value: function reply() {
            var newComment = _comment2.default.getReplyForInterpretation(this.context.d2, this.props.interpretation);
            this.setState({ newComment: newComment });
        }
    }, {
        key: 'deleteInterpretation',
        value: function deleteInterpretation() {
            var _this3 = this;

            var interpretation = this.props.interpretation;


            if (confirm(_d2I18n2.default.t('Are you sure you want to remove this interpretation?'))) {
                interpretation.delete().then(function () {
                    return _this3.notifyChange(null);
                });
            }
        }
    }, {
        key: 'openInterpretationDialog',
        value: function openInterpretationDialog() {
            this.setState({ interpretationToEdit: this.props.interpretation });
        }
    }, {
        key: 'closeInterpretationDialog',
        value: function closeInterpretationDialog() {
            this.setState({ interpretationToEdit: null });
        }
    }, {
        key: 'saveInterpretation',
        value: function saveInterpretation(interpretation) {
            var _this4 = this;

            interpretation.save().then(function () {
                return _this4.notifyChange(_this4.props.interpretation);
            });
        }
    }, {
        key: 'saveComment',
        value: function saveComment(comment) {
            var _this5 = this;

            comment.save().then(function () {
                return _this5.notifyChange(_this5.props.interpretation);
            });
        }
    }, {
        key: 'deleteComment',
        value: function deleteComment(comment) {
            var _this6 = this;

            comment.delete().then(function () {
                return _this6.notifyChange(_this6.props.interpretation);
            });
        }
    }, {
        key: 'saveInterpretationAndClose',
        value: function saveInterpretationAndClose() {
            this.saveInterpretation(this.props.interpretation);
            this.closeInterpretationDialog();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                interpretation = _props.interpretation,
                extended = _props.extended;
            var _state = this.state,
                interpretationToEdit = _state.interpretationToEdit,
                newComment = _state.newComment,
                sharingDialogIsOpen = _state.sharingDialogIsOpen;
            var d2 = this.context.d2;

            var showActions = extended;
            var showComments = extended;
            var likedBy = interpretation.likedBy || [];
            var likedByTooltip = likedBy.map(function (user) {
                return user.displayName;
            }).sort().join("\n");
            var currentUserLikesInterpretation = (0, _some2.default)(function (user) {
                return user.id === d2.currentUser.id;
            }, likedBy);

            return _react2.default.createElement(
                'div',
                null,
                interpretationToEdit && _react2.default.createElement(_InterpretationDialog2.default, {
                    interpretation: interpretationToEdit,
                    onSave: this.saveInterpretationAndClose,
                    onClose: this.closeInterpretationDialog
                }),
                sharingDialogIsOpen && _react2.default.createElement(_d2UiSharingDialog2.default, {
                    open: true,
                    onRequestClose: this.closeSharingDialog,
                    d2: d2,
                    id: interpretation.id,
                    type: "interpretation"
                }),
                _react2.default.createElement(
                    'div',
                    { style: _InterpretationsStyles2.default.interpretationDescSection },
                    _react2.default.createElement(
                        'div',
                        { style: _InterpretationsStyles2.default.interpretationName },
                        (0, _misc.getUserLink)(d2, interpretation.user),
                        _react2.default.createElement(
                            'span',
                            { style: _InterpretationsStyles2.default.date },
                            (0, _i18n.formatDate)(interpretation.created)
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: _InterpretationsStyles2.default.interpretationTextWrapper },
                        _react2.default.createElement(
                            'div',
                            { style: extended ? _InterpretationsStyles2.default.interpretationText : _InterpretationsStyles2.default.interpretationTextLimited },
                            interpretation.text
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        showActions && _react2.default.createElement(
                            'div',
                            { className: 'actions', style: _InterpretationsStyles2.default.actions },
                            currentUserLikesInterpretation ? _react2.default.createElement(_misc.Link, { label: _d2I18n2.default.t('Unlike'), onClick: this.unlike }) : _react2.default.createElement(_misc.Link, { label: _d2I18n2.default.t('Like'), onClick: this.like }),
                            _react2.default.createElement(_misc.ActionSeparator, null),
                            _react2.default.createElement(_misc.Link, { label: _d2I18n2.default.t('Reply'), onClick: this.reply }),
                            (0, _auth.userCanManage)(d2, interpretation) && _react2.default.createElement(
                                'span',
                                { className: 'owner-actions' },
                                _react2.default.createElement(_misc.ActionSeparator, null),
                                _react2.default.createElement(_misc.Link, { label: _d2I18n2.default.t('Edit'), onClick: this.openInterpretationDialog }),
                                _react2.default.createElement(_misc.ActionSeparator, null),
                                _react2.default.createElement(_misc.Link, { label: _d2I18n2.default.t('Share'), onClick: this.openSharingDialog }),
                                _react2.default.createElement(_misc.ActionSeparator, null),
                                _react2.default.createElement(_misc.Link, { label: _d2I18n2.default.t('Delete'), onClick: this.deleteInterpretation })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { style: _InterpretationsStyles2.default.interpretationCommentArea },
                            _react2.default.createElement(
                                'div',
                                { style: _InterpretationsStyles2.default.likeArea },
                                _react2.default.createElement(_ThumbUp2.default, { style: _InterpretationsStyles2.default.likeIcon }),
                                _react2.default.createElement(
                                    'span',
                                    { style: { color: "#22A" }, className: 'liked-by', title: likedByTooltip },
                                    interpretation.likes,
                                    ' ',
                                    _d2I18n2.default.t('people like this')
                                ),
                                _react2.default.createElement(_misc.ActionSeparator, null),
                                interpretation.comments.length + ' ' + _d2I18n2.default.t('people commented')
                            ),
                            showComments && _react2.default.createElement(_InterpretationComments2.default, {
                                d2: d2,
                                interpretation: interpretation,
                                onSave: this.saveComment,
                                onDelete: this.deleteComment,
                                newComment: newComment
                            })
                        )
                    )
                )
            );
        }
    }]);
    return Interpretation;
}(_react2.default.Component);

Interpretation.propTypes = {
    interpretation: _propTypes2.default.object.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    extended: _propTypes2.default.bool.isRequired
};

Interpretation.defaultProps = {
    extended: false
};

Interpretation.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};

exports.default = Interpretation;