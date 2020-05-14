'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSharingText = undefined;

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSharingText = exports.getSharingText = function getSharingText(model) {
    var accessMapping = {
        '--------': _d2I18n2.default.t('None'),
        'r-------': _d2I18n2.default.t('Read'),
        'rw------': _d2I18n2.default.t('Read/Write')
    };

    var accessLevel = accessMapping[model.publicAccess] || _d2I18n2.default.t('Unknown');
    var publicAccess = _d2I18n2.default.t('Public') + ': ' + accessLevel;

    var userCount = (model.userAccesses || []).length;
    var userInfo = userCount > 2 ? _d2I18n2.default.t('{{count}} users', {
        count: userCount,
        defaultValue: '{{count}} user',
        defaultValue_plural: '{{count}} users'
    }) : (model.userAccesses || []).map(function (users) {
        return users.displayName;
    }).join(', ');

    var userGroupsCount = (model.userGroupAccesses || []).length;
    var userGroupsInfo = userGroupsCount > 2 ? _d2I18n2.default.t('{{count}} user groups', {
        count: userGroupsCount,
        defaultValue: '{{count}} user group',
        defaultValue_plural: '{{count}} user groups'
    }) : (model.userGroupAccesses || []).map(function (userGroup) {
        return userGroup.displayName;
    }).join(', ');

    return publicAccess + (userInfo ? ' + ' + userInfo : '') + (userGroupsInfo ? ' + ' + userGroupsInfo : '');
};