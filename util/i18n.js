import moment from 'moment';
import i18n from '@dhis2/d2-i18n';

export function formatDate() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var uiLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

    if (typeof global.Intl !== 'undefined' && Intl.DateTimeFormat) {
        return new Intl.DateTimeFormat(uiLocale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(value));
    }

    return value.substr(0, 19).replace('T', ' ');
}

export function formatRelative(value, uiLocale) {
    var createdRelativeDate = moment(value, moment.ISO_8601).fromNow();

    return dateIsOver24Hours(createdRelativeDate) ? formatDate(value, uiLocale) : createdRelativeDate;
};

export function dateIsOver24Hours(relativeDate) {
    var shouldFormatToDate = false;
    ['day', 'year', 'month'].forEach(function (item) {
        if (relativeDate.includes(item)) {
            shouldFormatToDate = true;
        }
    });

    return shouldFormatToDate;
};

export function translateModelName(modelName) {
    switch (modelName) {
        case 'chart':
            return i18n.t('chart');
        case 'reportTable':
            return i18n.t('pivot table');
        case 'map':
            return i18n.t('map');
        case 'eventChart':
            return i18n.t('event chart');
        case 'eventReport':
            return i18n.t('event report');
        default:
            return i18n.t('object');
    }
}