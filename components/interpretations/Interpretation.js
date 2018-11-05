import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import some from 'lodash/fp/some';
import InterpretationComments from './InterpretationComments';
import InterpretationDialog from './InterpretationDialog';
import { Link, ActionSeparator, WithAvatar, getUserLink } from './misc';
import { userCanManage } from '../../util/auth';
import styles from './InterpretationsStyles.js';
import CommentModel from '../../models/comment';
import { formatDate } from '../../util/i18n';

var Interpretation = function (_React$Component) {
    _inherits(Interpretation, _React$Component);

    function Interpretation(props) {
        _classCallCheck(this, Interpretation);

        var _this = _possibleConstructorReturn(this, (Interpretation.__proto__ || _Object$getPrototypeOf(Interpretation)).call(this, props));

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

    _createClass(Interpretation, [{
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
            var newComment = CommentModel.getReplyForInterpretation(this.context.d2, this.props.interpretation);
            this.setState({ newComment: newComment });
        }
    }, {
        key: 'deleteInterpretation',
        value: function deleteInterpretation() {
            var _this3 = this;

            var interpretation = this.props.interpretation;


            if (confirm(i18n.t('Are you sure you want to remove this interpretation?'))) {
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
            var currentUserLikesInterpretation = some(function (user) {
                return user.id === d2.currentUser.id;
            }, likedBy);

            return React.createElement(
                'div',
                null,
                interpretationToEdit && React.createElement(InterpretationDialog, {
                    interpretation: interpretationToEdit,
                    onSave: this.saveInterpretationAndClose,
                    onClose: this.closeInterpretationDialog
                }),
                sharingDialogIsOpen && React.createElement(SharingDialog, {
                    open: true,
                    onRequestClose: this.closeSharingDialog,
                    d2: d2,
                    id: interpretation.id,
                    type: "interpretation"
                }),
                React.createElement(
                    'div',
                    { style: styles.interpretationDescSection },
                    React.createElement(
                        'div',
                        { style: styles.interpretationName },
                        getUserLink(d2, interpretation.user),
                        React.createElement(
                            'span',
                            { style: styles.date },
                            formatDate(interpretation.created)
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: styles.interpretationTextWrapper },
                        React.createElement(
                            'div',
                            { style: extended ? styles.interpretationText : styles.interpretationTextLimited },
                            interpretation.text
                        )
                    ),
                    React.createElement(
                        'div',
                        null,
                        showActions && React.createElement(
                            'div',
                            { className: 'actions', style: styles.actions },
                            currentUserLikesInterpretation ? React.createElement(Link, { label: i18n.t('Unlike'), onClick: this.unlike }) : React.createElement(Link, { label: i18n.t('Like'), onClick: this.like }),
                            React.createElement(ActionSeparator, null),
                            React.createElement(Link, { label: i18n.t('Reply'), onClick: this.reply }),
                            userCanManage(d2, interpretation) && React.createElement(
                                'span',
                                { className: 'owner-actions' },
                                React.createElement(ActionSeparator, null),
                                React.createElement(Link, { label: i18n.t('Edit'), onClick: this.openInterpretationDialog }),
                                React.createElement(ActionSeparator, null),
                                React.createElement(Link, { label: i18n.t('Share'), onClick: this.openSharingDialog }),
                                React.createElement(ActionSeparator, null),
                                React.createElement(Link, { label: i18n.t('Delete'), onClick: this.deleteInterpretation })
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: styles.interpretationCommentArea },
                            React.createElement(
                                'div',
                                { style: styles.likeArea },
                                React.createElement(ThumbUpIcon, { style: styles.likeIcon }),
                                React.createElement(
                                    'span',
                                    { style: { color: "#22A" }, className: 'liked-by', title: likedByTooltip },
                                    interpretation.likes,
                                    ' ',
                                    i18n.t('people like this')
                                ),
                                React.createElement(ActionSeparator, null),
                                interpretation.comments.length + ' ' + i18n.t('people commented')
                            ),
                            showComments && React.createElement(InterpretationComments, {
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
}(React.Component);

Interpretation.propTypes = {
    interpretation: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    extended: PropTypes.bool.isRequired
};

Interpretation.defaultProps = {
    extended: false
};

Interpretation.contextTypes = {
    d2: PropTypes.object.isRequired
};

export default Interpretation;