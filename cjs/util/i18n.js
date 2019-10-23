'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatDate = formatDate;
exports.formatRelative = formatRelative;
exports.translateModelName = translateModelName;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatDate(dateString) {
    var isoformat = dateString.split(".")[0];
    var localizedFormat = _moment2.default.localeData().longDateFormat('L');
    return (0, _moment2.default)(dateString, _moment2.default.ISO_8601).format(localizedFormat);
}

function formatRelative(dateString) {
    var isoformat = dateString.split(".")[0];
    return (0, _moment2.default)(dateString, _moment2.default.ISO_8601).fromNow();
}

function translateModelName(modelName) {
    switch (modelName) {
        case 'chart':
            return _d2I18n2.default.t('chart');
        case 'reportTable':
            return _d2I18n2.default.t('pivot table');
        case 'map':
            return _d2I18n2.default.t('map');
        case 'eventChart':
            return _d2I18n2.default.t('event chart');
        case 'eventReport':
            return _d2I18n2.default.t('event report');
        default:
            return _d2I18n2.default.t('object');
    }
}