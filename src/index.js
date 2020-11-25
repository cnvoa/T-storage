/**
 * Html5 localStorage和sessionStorage package
*/

const isWindow = !!window.localStorage

let store = {
  verson: '1.1.4',
  storage: isWindow ? window.localStorage : null,
  session: {
    storage: isWindow ? window.sessionStorage : null,
    type: 'session'
  }
}

let api = {
  data(table, settings = {}) {
    if (this.disabled) return;
    /** Default table name */
    table = table || 'store';

    const nowTime = new Date().getTime();

    let data = null;

    /* Empty the table if settings is null */
    if (settings === null) {
      return delete this.storage[table]
    }

    try {
      data = JSON.parse(this.storage[table])
    } catch (error) {
      data = {}
    }

    clearExpired(data, nowTime)

    if ('value' in settings && 'key' in settings) {
      let time = null;

      if ('time' in settings) {
				const { type, value } = filterTime(settings.time)
				switch (type) {
					case 'second':
						time = (new Date().getTime()) + (value * 1000)
						break;
					case 'stamps':
						time = value
						break;
					default:
						try {
							console.warn('Store failed!');
						} catch (error) {
							console.log('Store failed!');
						}
						return
				}

				if (time <= nowTime) {
					try {
						console.warn('Storage time can only be future time!');
					} catch (error) {
						console.log('Storage time can only be future time!');
					}
					return
				}
			}

      if (this.type != 'session' && time) {
        settings.value.limitTime = time + ''
      }
      data[settings.key] = settings.value
    }

    if ('remove' in settings) {
      delete data[settings.key]
    }

    this.storage.setItem(table, JSON.stringify(data))

    return settings.key ? data[settings.key] : data;
  },
  has(table, key) {
    if (this.disabled) return;
    if (table === '' || table === null || table === undefined) return undefined;

    const nowTime = new Date().getTime();
    let data = null
    try {
      data = JSON.parse(this.storage[table])
    } catch (error) {
      data = {}
    }

    if (this.storage[table] === undefined) {
      return undefined
    }

    clearExpired(data, nowTime)

    this.storage[table] = JSON.stringify(data)

    return key ? data[key] || undefined : data || undefined;
  },
  clear() {
    if (this.disabled) return;
    this.storage.clear()
  },
  getAll() {
    if (this.disabled) return;
    let res = {}
    this.forEach(function (k, v) {
      res[k] = v
    })
    return res
  },
  forEach(callback) {
    if (this.disabled) return;
    for (let i = 0; i < this.storage.length; i++) {
      let key = this.storage.key(i);
      callback(key, this.data(key));
    }
  }
}

Object.assign(store, api)
Object.assign(store.session, api)

function filterTime(time) {
	if (time == '' || time <= 0) {
    return ''
  }

  // Timestamp
  let reg = /[/\-:]/g;
  if (!reg.test(time)) {
    return { type: 'second', value: time }
  }

  let arr = time.match(/:/g),
    str = time.split(' ', 2);

  // date time
  if (str.length == 1) {
    return { type: 'stamps', value: timeStamp(time) }
  }

  // have not :
  if (!arr || arr.length == 0) {
    // There are hours
    if (parseInt(str[1])) {
      return { type: 'stamps', value: timeStamp(time + ':00') }
    } else {
      return { type: 'stamps', value: timeStamp(str[0]) }
    }
    // : is greater than two
  } else if (arr.length > 2) {
    return { type: 'nan', value: NaN }
  }

  // end is :
  if (time.charAt(time.length - 1) == ':') {
    return { type: 'stamps', value: timeStamp(time + '00') }
  }
  return { type: 'stamps', value: timeStamp(time) }
}

function timeStamp(params) {
  return new Date(params).getTime()
}

function clearExpired(data, nowTime) {
  for (let i in data) {
    if (nowTime > data[i].limitTime) {
      delete data[i]
    }
  }
}

try {
  let key = 'store';
  let value = {};
  store.data(key, value);
  if (JSON.stringify(store.data(key)) !== JSON.stringify(value)) {
    store.disabled = true;
  }
  store.data(key, null);
} catch (e) {
  store.disabled = true;
}

export default store
