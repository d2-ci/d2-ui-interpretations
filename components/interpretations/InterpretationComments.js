import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Link, ActionSeparator, WithAvatar, getUserLink } from './misc';
import CommentTextarea from './CommentTextarea';
import { userCanManage } from '../../util/auth';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import orderBy from 'lodash/fp/orderBy';
import styles from './InterpretationsStyles.js';
import { formatRelative } from '../../util/i18n';

var Comment = function Comment(_ref) {
    var comment = _ref.comment,
        showManageActions = _ref.showManageActions,
        onEdit = _ref.onEdit,
        onDelete = _ref.onDelete,
        onReply = _ref.onReply;
    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { style: styles.commentText },
            comment.text
        ),
        React.createElement(
            'span',
            { style: styles.tipText },
            formatRelative(comment.created)
        ),
        React.createElement(ActionSeparator, { labelText: '' }),
        showManageActions ? React.createElement(
            'span',
            null,
            React.createElement(Link, { label: i18n.t('Edit'), value: comment, onClick: onEdit }),
            React.createElement(ActionSeparator, null),
            React.createElement(Link, { label: i18n.t('Reply'), value: comment, onClick: onReply }),
            React.createElement(ActionSeparator, null),
            React.createElement(Link, { label: i18n.t('Delete'), value: comment, onClick: onDelete })
        ) : React.createElement(Link, { label: i18n.t('Reply'), value: comment, onClick: onReply })
    );
};

var InterpretationComments = function (_React$Component) {
    _inherits(InterpretationComments, _React$Component);

    function InterpretationComments(props) {
        _classCallCheck(this, InterpretationComments);

        var _this = _possibleConstructorReturn(this, (InterpretationComments.__proto__ || _Object$getPrototypeOf(InterpretationComments)).call(this, props));

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

    _createClass(InterpretationComments, [{
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
            if (window.confirm(i18n.t('Are you sure you want to remove this comment?'))) {
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

            var sortedComments = orderBy(["created"], ["asc"], interpretation.comments);
            var commentsToShowOnInit = 3;
            var comments = showOnlyFirstComments ? sortedComments.slice(0, commentsToShowOnInit) : sortedComments;
            var hiddenCommentsCount = showOnlyFirstComments ? sortedComments.length - comments.length : 0;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'interpretation-comments' },
                    comments.map(function (comment) {
                        return React.createElement(
                            WithAvatar,
                            { key: comment.id, user: comment.user },
                            React.createElement(
                                'div',
                                { style: styles.commentAuthor },
                                getUserLink(d2, comment.user)
                            ),
                            commentToEdit && commentToEdit.id === comment.id ? React.createElement(CommentTextarea, {
                                comment: comment,
                                onPost: _this2.onUpdate,
                                onCancel: _this2.onCancelEdit
                            }) : React.createElement(Comment, {
                                comment: comment,
                                showManageActions: userCanManage(d2, comment),
                                onEdit: _this2.onEdit,
                                onDelete: _this2.onDelete,
                                onReply: _this2.onReply
                            })
                        );
                    }),
                    showOnlyFirstComments && hiddenCommentsCount > 0 && React.createElement(
                        'div',
                        { style: { width: "100%", textAlign: "center" } },
                        React.createElement(
                            Button,
                            { onClick: this.onShowMoreComments, style: { display: "inline-block" } },
                            React.createElement(
                                'span',
                                { style: styles.showMoreComments },
                                hiddenCommentsCount,
                                ' ',
                                i18n.t("more comments")
                            )
                        )
                    )
                ),
                newComment && React.createElement(
                    WithAvatar,
                    { user: d2.currentUser },
                    React.createElement(CommentTextarea, {
                        comment: newComment,
                        onPost: this.onSave
                    })
                )
            );
        }
    }]);

    return InterpretationComments;
}(React.Component);

InterpretationComments.contextTypes = {
    d2: PropTypes.object.isRequired
};
InterpretationComments.propTypes = {
    interpretation: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    newComment: PropTypes.object
};
export default InterpretationComments;
;