import i18n from '@dhis2/d2-i18n';

var accessMapping = {
    '--------': i18n.t('None'),
    'r-------': i18n.t('Read'),
    'rw------': i18n.t('Read/Write')
};

export var getSharingText = function getSharingText(model) {
    var publicAccessValue = accessMapping[model.publicAccess] || i18n.t('Unknown');
    var publicAccess = i18n.t('Public') + ': ' + publicAccessValue;

    var userCount = (model.userAccesses || []).length;
    var userInfo = userCount > 2 ? userCount + ' ' + i18n.t('Users') : (model.userAccesses || []).map(function (users) {
        return users.displayName;
    }).join(', ');

    var userGroupsCount = (model.userGroupAccesses || []).length;
    var userGroupsInfo = userGroupsCount > 2 ? userGroupsCount + ' ' + i18n.t('user groups') : (model.userGroupAccesses || []).map(function (userGroup) {
        return userGroup.displayName;
    }).join(', ');

    return publicAccess + (userInfo ? ' + ' + userInfo : '') + (userGroupsInfo ? ' + ' + userGroupsInfo : '');
};