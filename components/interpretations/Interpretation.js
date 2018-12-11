import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import { withStyles } from '@material-ui/core/styles';
import some from 'lodash/fp/some';
import InterpretationComments from './InterpretationComments';
import NewInterpretation from './NewInterpretation';
import InterpretationActionButton from './InterpretationActionButton';
import { getUserLink } from './misc';
import { userCanManage } from '../../util/auth';
import CommentModel from '../../models/comment';
import { formatRelative } from '../../util/i18n';
import styles from './styles/Interpretation.style';
export var Interpretation = function (_React$Component) {
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
        _this.closeInterpretation = _this.closeInterpretation.bind(_this);
        _this.deleteInterpretation = _this.deleteInterpretation.bind(_this);
        _this.openInterpretation = _this.openInterpretation.bind(_this);
        _this.view = _this.view.bind(_this);
        _this.exitView = _this.exitView.bind(_this);
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
        key: 'view',
        value: function view() {
            this.props.onSelect(this.props.interpretation.id);
        }
    }, {
        key: 'exitView',
        value: function exitView() {
            this.props.onSelect(null);
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

            if (window.confirm(i18n.t('Are you sure you want to remove this interpretation?'))) {
                this.props.interpretation.delete().then(function () {
                    return _this3.notifyChange(null);
                });
            }
        }
    }, {
        key: 'openInterpretation',
        value: function openInterpretation() {
            this.setState({ interpretationToEdit: this.props.interpretation });
        }
    }, {
        key: 'closeInterpretation',
        value: function closeInterpretation() {
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
            this.closeInterpretation();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                interpretation = _props.interpretation,
                extended = _props.extended,
                model = _props.model;
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
            }).sort().join('\n');
            var currentUserLikesInterpretation = some(function (user) {
                return user.id === d2.currentUser.id;
            }, likedBy);

            return React.createElement(
                Fragment,
                null,
                sharingDialogIsOpen && React.createElement(SharingDialog, {
                    open: true,
                    onRequestClose: this.closeSharingDialog,
                    d2: d2,
                    id: interpretation.id,
                    type: 'interpretation'
                }),
                interpretationToEdit ? React.createElement(NewInterpretation, {
                    model: model,
                    newInterpretation: interpretationToEdit,
                    onSave: this.props.onSave,
                    onClose: this.closeInterpretation,
                    isNew: false
                }) : React.createElement(
                    'div',
                    { className: classes.interpretationDescSection },
                    React.createElement(
                        'div',
                        { className: classes.interpretationName },
                        getUserLink(d2, interpretation.user),
                        React.createElement(
                            'span',
                            { className: classes.date },
                            formatRelative(interpretation.created, this.context.locale)
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: classes.interpretationTextWrapper },
                        React.createElement(
                            'div',
                            {
                                className: extended ? classes.interpretationText : classes.interpretationTextLimited
                            },
                            interpretation.text
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: classes.interpretationCommentArea },
                        !!interpretation.likes && React.createElement(
                            'span',
                            { className: classes.intepretationLikes },
                            interpretation.likes,
                            ' ',
                            interpretation.likes > 1 ? i18n.t('likes') : i18n.t('like')
                        ),
                        !!interpretation.comments.length && React.createElement(
                            'span',
                            null,
                            interpretation.comments.length + ' ' + (interpretation.comments.length > 1 ? i18n.t('replies') : i18n.t('reply'))
                        )
                    ),
                    showActions ? React.createElement(
                        'div',
                        { className: classes.actions },
                        currentUserLikesInterpretation ? React.createElement(InterpretationActionButton, {
                            iconType: 'like',
                            tooltip: i18n.t('Unlike'),
                            onClick: this.unlike
                        }) : React.createElement(InterpretationActionButton, {
                            iconType: 'unlike',
                            tooltip: i18n.t('Like'),
                            onClick: this.like
                        }),
                        React.createElement(InterpretationActionButton, {
                            iconType: 'reply',
                            tooltip: i18n.t('Reply'),
                            onClick: this.reply
                        }),
                        React.createElement(InterpretationActionButton, {
                            iconType: 'visibilityOff',
                            tooltip: i18n.t('Exit View'),
                            onClick: this.exitView
                        }),
                        userCanManage(d2, interpretation) && React.createElement(
                            Fragment,
                            null,
                            React.createElement(InterpretationActionButton, {
                                iconType: 'share',
                                tooltip: i18n.t('Share'),
                                onClick: this.openSharingDialog
                            }),
                            React.createElement(InterpretationActionButton, {
                                iconType: 'edit',
                                tooltip: i18n.t('Edit'),
                                onClick: this.openInterpretation
                            }),
                            React.createElement(InterpretationActionButton, {
                                iconType: 'delete',
                                tooltip: i18n.t('Delete'),
                                onClick: this.deleteInterpretation
                            })
                        )
                    ) : React.createElement(
                        'div',
                        { className: classes.actions },
                        React.createElement(InterpretationActionButton, {
                            iconType: 'visibility',
                            tooltip: i18n.t('View'),
                            onClick: this.view
                        })
                    )
                ),
                showComments && React.createElement(InterpretationComments, {
                    d2: d2,
                    interpretation: interpretation,
                    onSave: this.saveComment,
                    onDelete: this.deleteComment,
                    newComment: newComment
                })
            );
        }
    }]);

    return Interpretation;
}(React.Component);

Interpretation.propTypes = {
    classes: PropTypes.object.isRequired,
    interpretation: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    extended: PropTypes.bool.isRequired
};

Interpretation.defaultProps = {
    extended: false
};

Interpretation.contextTypes = {
    d2: PropTypes.object.isRequired,
    locale: PropTypes.string
};

export default withStyles(styles)(Interpretation);