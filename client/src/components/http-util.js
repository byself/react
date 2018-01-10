import 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch';

const CONTENT_TYPE = 'application/json';
var COMMON_HEADERS = {
	'Content-Type': CONTENT_TYPE
};

export default class HttpUtil {
	/**
	 * HTTP GET
	 * @param {string} path - the request path
	 * @returns {*|Promise.<TResult>} - promise
	 */
	static get(path) {
		return fetch(path, {
			headers: COMMON_HEADERS,
			credentials: 'same-origin'
		});
	}

	/**
	 * HTTP POST
	 * @param {string} path - the request path
	 * @param {Object} json - the post body
	 * @returns {*|Promise.<TResult>} - promise
	 */
	static post(path, json) {
		var body = HttpUtil.parseBody(json);
		return fetch(path, {
			method: 'POST',
			headers: COMMON_HEADERS,
			credentials: 'same-origin',
			body: body
		});
	}
	
	/**
	 * HTTP PUT
	 * @param {string} path - the request path
	 * @param {Object} json - the put body
	 * @returns {*|Promise.<TResult>} - promise
	 */
	static put(path, json) {
		var body = HttpUtil.parseBody(json);
		return fetch(path, {
			method: 'PUT',
			headers: COMMON_HEADERS,
			credentials: 'same-origin',
			body: body
		});
	}

	/**
	 * parse string/js object to json string
	 * @param {Object|string} json - post body or string
	 * @returns {string} - json string
	 */
	static parseBody(json) {
		var body = null;
		if (typeof json === 'string') {
			body = json;
		}
		if (typeof json === 'object') {
			body = JSON.stringify(json);
		}
		return body;
	}

	/**
	 * parse query string
	 * @returns {{}} - query object
	 */
	static parseQuery() {
		var s = window.location.search;
		var index = s.indexOf('?');
		var result = {};
		if (index === -1) return result;
		var arr = s.substr(index + 1).split('&');
		arr.forEach(function(item) {
			var equals = item.split('=');
			var key = decodeURIComponent(equals[0]);
			var val = decodeURIComponent(equals[1] || '');
			if (key.substr(-2) !== '[]') {
				result[key] = val;
			} else {
				key = key.substr(0, key.length - 2);
				if (!result[key]) result[key] = [val];
				else result[key].push(val);
			}
		});
		return result;
	}
}
