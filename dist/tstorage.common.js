/**
 * Tstorage v1.1.4
 * (c) 2020/11/25 mentals@foxmail.com
 */
'use strict';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/**
 * Html5 localStorage和sessionStorage package
*/
var isWindow = !!window.localStorage;
var store = {
  verson: '1.1.4',
  storage: isWindow ? window.localStorage : null,
  session: {
    storage: isWindow ? window.sessionStorage : null,
    type: 'session'
  }
};
var api = {
  data: function data(table) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (this.disabled) return;
    /** Default table name */

    table = table || 'store';
    var nowTime = new Date().getTime();
    var data = null;
    /* Empty the table if settings is null */

    if (settings === null) {
      return delete this.storage[table];
    }

    try {
      data = JSON.parse(this.storage[table]);
    } catch (error) {
      data = {};
    }

    clearExpired(data, nowTime);

    if ('value' in settings && 'key' in settings) {
      var time = null;

      if ('time' in settings) {
        var _filterTime = filterTime(settings.time),
            type = _filterTime.type,
            value = _filterTime.value;

        switch (type) {
          case 'second':
            time = new Date().getTime() + value * 1000;
            break;

          case 'stamps':
            time = value;
            break;

          default:
            try {
              console.warn('Store failed!');
            } catch (error) {
              console.log('Store failed!');
            }

            return;
        }

        if (time <= nowTime) {
          try {
            console.warn('Storage time can only be future time!');
          } catch (error) {
            console.log('Storage time can only be future time!');
          }

          return;
        }
      }

      if (this.type != 'session' && time) {
        settings.value.limitTime = time + '';
      }

      data[settings.key] = settings.value;
    }

    if ('remove' in settings) {
      delete data[settings.key];
    }

    this.storage.setItem(table, JSON.stringify(data));
    return settings.key ? data[settings.key] : data;
  },
  has: function has(table, key) {
    if (this.disabled) return;
    if (table === '' || table === null || table === undefined) return undefined;
    var nowTime = new Date().getTime();
    var data = null;

    try {
      data = JSON.parse(this.storage[table]);
    } catch (error) {
      data = {};
    }

    if (this.storage[table] === undefined) {
      return undefined;
    }

    clearExpired(data, nowTime);
    this.storage[table] = JSON.stringify(data);
    return key ? data[key] || undefined : data || undefined;
  },
  clear: function clear() {
    if (this.disabled) return;
    this.storage.clear();
  },
  getAll: function getAll() {
    if (this.disabled) return;
    var res = {};
    this.forEach(function (k, v) {
      res[k] = v;
    });
    return res;
  },
  forEach: function forEach(callback) {
    if (this.disabled) return;

    for (var i = 0; i < this.storage.length; i++) {
      var key = this.storage.key(i);
      callback(key, this.data(key));
    }
  }
};

_extends(store, api);

_extends(store.session, api);

function filterTime(time) {
  if (time == '' || time <= 0) {
    return '';
  } // Timestamp


  var reg = /[/\-:]/g;

  if (!reg.test(time)) {
    return {
      type: 'second',
      value: time
    };
  }

  var arr = time.match(/:/g),
      str = time.split(' ', 2); // date time

  if (str.length == 1) {
    return {
      type: 'stamps',
      value: timeStamp(time)
    };
  } // have not :


  if (!arr || arr.length == 0) {
    // There are hours
    if (parseInt(str[1])) {
      return {
        type: 'stamps',
        value: timeStamp(time + ':00')
      };
    } else {
      return {
        type: 'stamps',
        value: timeStamp(str[0])
      };
    } // : is greater than two

  } else if (arr.length > 2) {
    return {
      type: 'nan',
      value: NaN
    };
  } // end is :


  if (time.charAt(time.length - 1) == ':') {
    return {
      type: 'stamps',
      value: timeStamp(time + '00')
    };
  }

  return {
    type: 'stamps',
    value: timeStamp(time)
  };
}

function timeStamp(params) {
  return new Date(params).getTime();
}

function clearExpired(data, nowTime) {
  for (var i in data) {
    if (nowTime > data[i].limitTime) {
      delete data[i];
    }
  }
}

try {
  var key = 'store';
  var value = {};
  store.data(key, value);

  if (JSON.stringify(store.data(key)) !== JSON.stringify(value)) {
    store.disabled = true;
  }

  store.data(key, null);
} catch (e) {
  store.disabled = true;
}

module.exports = store;
