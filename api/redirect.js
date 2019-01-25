import _defineProperty from 'babel-runtime/helpers/defineProperty';

var _itemTypeMap;

import i18n from '@dhis2/d2-i18n';
import isObject from 'lodash/isObject';

export var CHART = 'CHART';
export var MAP = 'MAP';
export var REPORT_TABLE = 'REPORT_TABLE';
export var EVENT_REPORT = 'EVENT_REPORT';
export var EVENT_CHART = 'EVENT_CHART';

export var extractFavorite = function extractFavorite(item) {
    if (!isObject(item)) {
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

export var getId = function getId(item) {
    return extractFavorite(item).id;
};

export var getBaseUrl = function getBaseUrl(d2) {
    var api = d2.Api.getApi();
    var idx = api.baseUrl.indexOf('/api');
    return idx > -1 ? api.baseUrl.slice(0, idx) : api.baseUrl;
};

export var getLink = function getLink(item, d2) {
    var baseUrl = getBaseUrl(d2);
    var appUrl = itemTypeMap[item.type].appUrl(getId(item));

    return baseUrl + '/' + appUrl;
};

export var itemTypeMap = (_itemTypeMap = {}, _defineProperty(_itemTypeMap, REPORT_TABLE, {
    id: REPORT_TABLE,
    appUrl: function appUrl(id) {
        return 'dhis-web-pivot/?id=' + id;
    },
    propName: 'reportTable',
    appName: i18n.t('Pivot Tables')
}), _defineProperty(_itemTypeMap, CHART, {
    id: CHART,
    appUrl: function appUrl(id) {
        return 'dhis-web-data-visualizer/#/' + id;
    },
    propName: 'chart',
    appName: i18n.t('Visualizer')
}), _defineProperty(_itemTypeMap, MAP, {
    id: MAP,
    appUrl: function appUrl(id) {
        return 'dhis-web-maps/?id=' + id;
    },
    propName: 'maps',
    appName: i18n.t('Maps')
}), _defineProperty(_itemTypeMap, EVENT_REPORT, {
    id: EVENT_REPORT,
    appUrl: function appUrl(id) {
        return 'dhis-web-event-reports/?id=' + id;
    },
    propName: 'eventReport',
    appName: i18n.t('Event Reports')
}), _defineProperty(_itemTypeMap, EVENT_CHART, {
    id: EVENT_CHART,
    appUrl: function appUrl(id) {
        return 'dhis-web-event-visualizer/?id=' + id;
    },
    propName: 'eventChart',
    appName: i18n.t('Event Visualizer')
}), _itemTypeMap);