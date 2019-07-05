const path = require( 'path' );
const fs = require( 'fs' );

const rules = {
	'plugins': './scripts/stylelint-css-algorithms.js',
	'rules': {
		'block-opening-brace-space-before': 'always',
		'declaration-block-no-shorthand-property-overrides': true,
		'declaration-block-trailing-semicolon': 'always',
		'declaration-colon-space-after': 'always',
		'declaration-no-important': true,
		'font-family-no-missing-generic-family-keyword': true,
		'font-weight-notation': 'numeric',
		'function-calc-no-unspaced-operator': true,
		'max-empty-lines': 2,
		'property-no-unknown': true,
		'selector-max-specificity': '0,3,1',
		'selector-pseudo-element-colon-notation': 'double',
		'unit-no-unknown': true,
		'value-list-comma-space-after': 'always-single-line',
		'no-descending-specificity': true,
		'no-duplicate-at-import-rules': true,
		'no-duplicate-selectors': true,
		'function-blacklist': [ 'hsla', 'hsl' ],
		'function-url-scheme-blacklist': [ '/^http/', 'ftp' ],
		'function-url-no-scheme-relative': true,
		'number-max-precision': 3,
		'shorthand-property-no-redundant-values': true,
		'property-no-vendor-prefix': true,
		'property-blacklist': [ 'background', 'font', 'animation' ],
		'declaration-property-unit-blacklist': {
			'font-size': [ 'em', 'px', 'pt' ],
			'/^animation/': [ 's' ],
			'/^transition/': [ 's' ]
		},
		'declaration-block-single-line-max-declarations': 1,
		'selector-max-attribute': 3,
		'selector-max-combinators': 3,
		'selector-max-class': 2,
		'selector-max-compound-selectors': 2,
		'at-rule-blacklist': [ 'extend' ],
		'no-unknown-animations': true,
		'font-family-name-quotes': 'always-where-recommended',
		'function-name-case': 'lower',
		'function-url-quotes': 'always',
		'number-leading-zero': 'always',
		'string-quotes': 'single',
		'value-list-comma-space-after': 'always-single-line',
		'property-case': 'lower',
		'declaration-bang-space-before': 'always',
		'declaration-colon-space-after': 'always',
		'declaration-colon-space-before': 'never',
		'declaration-block-semicolon-newline-after': 'always',
		'block-closing-brace-newline-after': [
			'always', {
				'ignoreAtRules': [ 'if', 'else' ]
			}
		],
		'declaration-block-trailing-semicolon': 'always',
		'block-opening-brace-newline-after': 'always-multi-line',
		'selector-list-comma-newline-after': 'always',
		'selector-combinator-space-after': 'always',
		'selector-list-comma-space-after': 'always-single-line',
		'comment-no-empty': true,
		'at-rule-empty-line-before': [
			'always', {
				'ignore': [ 'after-comment', 'first-nested', 'blockless-after-blockless' ],
				'ignoreAtRules': [ 'else', 'import' ]
			}
		],
		'rule-empty-line-before': [
			'always-multi-line', {
				'ignore': [ 'first-nested', 'after-comment' ]
			}
		],
		'max-nesting-depth': [ 2, {
			'ignore': [ 'pseudo-classes' ],
			'ignoreAtRules': [ 'media', 'include' ]
		} ],
		'selector-nested-pattern': '^(?!&__|&--).*', // Disallow BEM concatenation - https://regex101.com/r/yZWeYK/3

		'plugin/css-algorithms': [
			{
				'name': 'a-space-children',
				'allowed-properties': [ 
					'margin-top', 
					'margin-left', 
					'display', 
					'--a-space-children-spacer',
					'flex-wrap' 
				]
			}
		]
	}
};

module.exports = rules;