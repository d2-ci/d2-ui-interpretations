import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Reply from '@material-ui/icons/Reply';
import Create from '@material-ui/icons/Create';
import Share from '@material-ui/icons/Share';
import Delete from '@material-ui/icons/Delete';
import i18n from '@dhis2/d2-i18n';

import styles from './styles/Icons.style';

export var Icons = {
	visibility: {
		icon: React.createElement(Visibility, { style: styles.interpretationCommentIcon }),
		tooltip: i18n.t('View')
	},
	visibilityOff: {
		icon: React.createElement(VisibilityOff, { style: styles.interpretationCommentIcon }),
		tooltip: i18n.t('Exit View')
	},
	like: {
		icon: React.createElement(ThumbUpIcon, { style: styles.interpretationCommentIcon }),
		tooltip: i18n.t('Like')
	},
	unlike: {
		icon: React.createElement(ThumbUpIcon, { style: _extends({}, styles.interpretationCommentIcon, styles.likedThumbUp) }),
		tooltip: i18n.t('Unlike')
	},
	reply: {
		icon: React.createElement(Reply, { style: styles.interpretationCommentIcon }),
		tooltip: i18n.t('Reply')
	},
	edit: {
		icon: React.createElement(Create, { style: styles.interpretationCommentIcon }),
		tooltip: i18n.t('Edit')
	},
	share: {
		icon: React.createElement(Share, { style: styles.interpretationCommentIcon }),
		tooltip: i18n.t('Share') },
	delete: {
		icon: React.createElement(Delete, { style: styles.interpretationCommentIcon }),
		tooltip: i18n.t('Delete')
	}
};