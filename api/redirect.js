'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.itemTypeMap = exports.getLink = exports.getBaseUrl = exports.getId = exports.extractFavorite = exports.EVENT_CHART = exports.EVENT_REPORT = exports.REPORT_TABLE = exports.MAP = exports.CHART = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _itemTypeMap;

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHART = exports.CHART = 'CHART';
var MAP = exports.MAP = 'MAP';
var REPORT_TABLE = exports.REPORT_TABLE = 'REPORT_TABLE';
var EVENT_REPORT = exports.EVENT_REPORT = 'EVENT_REPORT';
var EVENT_CHART = exports.EVENT_CHART = 'EVENT_CHART';

var extractFavorite = exports.extractFavorite = function extractFavorite(item) {
    if (!(0, _isObject2.default)(item)) {
        return null;
    }

    switch (item.type) {
        case REPORT_TABLE:
            return item.reportTable;
        case CHART:
            return item.chart;
        case MAP:
            return item.map;
        case EVENT_REPORT:
            return item.eventReport;
        case EVENT_CHART:
            return item.eventChart;
        default:
            return item.reportTable || item.chart || item.map || item.eventReport || item.eventChart || {};
    }
};

var getId = exports.getId = function getId(item) {
    return extractFavorite(item).id;
};

var getBaseUrl = exports.getBaseUrl = function getBaseUrl(d2) {
    var api = d2.Api.getApi();
    var idx = api.baseUrl.indexOf('/api');
    return idx > -1 ? api.baseUrl.slice(0, idx) : api.baseUrl;
};

var getLink = exports.getLink = function getLink(item, d2) {
    var baseUrl = getBaseUrl(d2);
    var appUrl = itemTypeMap[item.type].appUrl(getId(item));

    return baseUrl + '/' + appUrl;
};

var itemTypeMap = exports.itemTypeMap = (_itemTypeMap = {}, (0, _defineProperty3.default)(_itemTypeMap, REPORT_TABLE, {
    id: REPORT_TABLE,
    appUrl: function appUrl(id) {
        return 'dhis-web-pivot/?id=' + id;
    },
    propName: 'reportTable',
    appName: _d2I18n2.default.t('Pivot Tables'),
    detailsTitle: _d2I18n2.default.t('Table details')
}), (0, _defineProperty3.default)(_itemTypeMap, CHART, {
    id: CHART,
    appUrl: function appUrl(id) {
        return 'dhis-web-data-visualizer/#/' + id;
    },
    propName: 'chart',
    appName: _d2I18n2.default.t('Visualizer'),
    detailsTitle: _d2I18n2.default.t('Chart details')
}), (0, _defineProperty3.default)(_itemTypeMap, MAP, {
    id: MAP,
    appUrl: function appUrl(id) {
        return 'dhis-web-maps/?id=' + id;
    },
    propName: 'maps',
    appName: _d2I18n2.default.t('Maps'),
    detailsTitle: _d2I18n2.default.t('Map details')
}), (0, _defineProperty3.default)(_itemTypeMap, EVENT_REPORT, {
    id: EVENT_REPORT,
    appUrl: function appUrl(id) {
        return 'dhis-web-event-reports/?id=' + id;
    },
    propName: 'eventReport',
    appName: _d2I18n2.default.t('Event Reports'),
    detailsTitle: _d2I18n2.default.t('Table details')
}), (0, _defineProperty3.default)(_itemTypeMap, EVENT_CHART, {
    id: EVENT_CHART,
    appUrl: function appUrl(id) {
        return 'dhis-web-event-visualizer/?id=' + id;
    },
    propName: 'eventChart',
    appName: _d2I18n2.default.t('Event Visualizer'),
    detailsTitle: _d2I18n2.default.t('Table details')
}), _itemTypeMap);