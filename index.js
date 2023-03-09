const { camelCase } = require("lodash");

function toCamelCase(data) {

	const object = (data) => {
		data = Object.entries({ ...data }).map(([key, value]) => {
			if (Array.isArray(value)) value = array(value)

			if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) value = object(value)

			return [camelCase(key), value]
		})
		return Object.fromEntries(data)
	}

	const array = (data) => {
		const result = [...data].map((item) => {
			if (Array.isArray(item)) return array(item)
			if (typeof item === 'object') return object(item)
			return item
		})
		return result
	}

	if (Array.isArray(data)) return array(data)

	if (typeof data === 'object') return object(data)

	return camelCase(data)
}

//test
const x = toCamelCase({
	UPPER: {
		UNDER_SCORE: true,
	},
	array: [{
		lower_case: true,
		"use spacing": true,
		arrayAgain: [
			{
				"THIS OBJECT": true,
				"USE&SIMBOL":true
			}
		]
	}]
})
console.log(x)
module.exports = toCamelCase