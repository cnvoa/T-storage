const path = require('path');
const babel = require('rollup-plugin-babel');
const { eslint } = require('rollup-plugin-eslint');
const version = require('../package.json').version;
const banner =
	`/**
 * Tstorage v${version}
 * (c) ${new Date().toLocaleDateString()} mentals@foxmail.com
 */`

const resolve = _path => path.resolve(__dirname, '../', _path)

const configs = {
	umdDev: {
		input: resolve('src/index.js'),
		file: resolve('dist/tstorage.js'),
		format: 'umd',
		env: 'development'
	},
	umdProd: {
		input: resolve('src/index.js'),
		file: resolve('dist/tstorage.min.js'),
		format: 'umd',
		env: 'production'
	},
	esm: {
		input: resolve('src/index.js'),
		file: resolve('dist/tstorage.esm.js'),
		format: 'esm'
	},
	cjs: {
		input: resolve('src/index.js'),
		file: resolve('dist/tstorage.common.js'),
		format: 'cjs'
	}
}

function genConfig(opts) {
	const config = {
		input: {
			input: opts.input,
			plugins: [
				eslint({
					throwOnError: true,
					throwOnWarning: true,
					include: ['src/**'],
					exclude: ['node_modules/**']
				}),
				babel({
					exclude: 'node_modules/**'
				})
			]
		},
		output: {
			banner,
			file: opts.file,
			format: opts.format,
			name: 'Tstorage'
		}
	}

	return config
}

function mapValus(obj, fn) {
	const res = {}
	Object.keys(obj).forEach(key => {
		res[key] = fn(obj[key])
	})

	return res
}

module.exports = mapValus(configs, genConfig);
