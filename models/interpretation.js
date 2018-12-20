import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import { pick, last } from 'lodash/fp';
import { apiFetch, apiFetchWithResponse } from '../api/api';
import Comment from './comment';

function getInterpretationIdFromResponse(response) {
    var location = response.headers.get('location');
    if (location) {
        return last(location.split('/'));
    } else {
        throw new Error("Could not get interpretation ID");
    }
}

var Interpretation = function () {
    function Interpretation(parent, attributes) {
        var _this = this;

        _classCallCheck(this, Interpretation);

        this._parent = parent;
        _Object$assign(this, attributes);
        this.comments = (attributes.comments || []).map(function (commentAttrs) {
            return new Comment(_this, commentAttrs);
        });
    }

    _createClass(Interpretation, [{
        key: 'save',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(d2) {
                var _this2 = this;

                var modelId, modelName, isNewInterpretation, sharingPayload;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                modelId = this._parent.id;
                                modelName = this._parent.modelDefinition.name;
                                isNewInterpretation = !this.id;

                                if (!isNewInterpretation) {
                                    _context.next = 10;
                                    break;
                                }

                                // Set initial sharing of interpretation from the parent object
                                sharingPayload = { object: pick(Interpretation.sharingFields, this._parent) };
                                _context.next = 7;
                                return apiFetchWithResponse(d2, '/interpretations/' + modelName + '/' + modelId, "POST", this.text).then(getInterpretationIdFromResponse).then(function (interpretationId) {
                                    _this2.id = interpretationId;
                                    var sharingUrl = '/sharing?type=interpretation&id=' + interpretationId;
                                    return apiFetch(d2, sharingUrl, "PUT", sharingPayload).then(function () {
                                        return _this2;
                                    });
                                });

                            case 7:
                                return _context.abrupt('return', _context.sent);

                            case 10:
                                _context.next = 12;
                                return apiFetch(d2, '/interpretations/' + this.id, "PUT", this.text).then(function () {
                                    return _this2;
                                });

                            case 12:
                                return _context.abrupt('return', _context.sent);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }()
    }, {
        key: 'delete',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(d2) {
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return apiFetch(d2, '/interpretations/' + this.id, "DELETE");

                            case 2:
                                return _context2.abrupt('return', _context2.sent);

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function _delete(_x2) {
                return _ref2.apply(this, arguments);
            }

            return _delete;
        }()
    }, {
        key: 'like',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(d2, value) {
                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return apiFetch(d2, '/interpretations/' + this.id + '/like', value ? "POST" : "DELETE");

                            case 2:
                                return _context3.abrupt('return', _context3.sent);

                            case 3:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function like(_x3, _x4) {
                return _ref3.apply(this, arguments);
            }

            return like;
        }()
    }]);

    return Interpretation;
}();

Interpretation.sharingFields = ["publicAccess", "externalAccess", "userGroupAccesses", "userAccesses"];
export default Interpretation;