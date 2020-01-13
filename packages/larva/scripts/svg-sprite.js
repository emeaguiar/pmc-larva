'use strict';

const SVGSpriter = require('svg-sprite');
const path = require('path');
const mkdirp = require('mkdirp');
const globby = require('globby');
const fs = require('fs');
const svgoConfig = require( './config/svgo-config.json' );
// const getSassVarsString = require( './lib/getSassVarsString' );

const config = {
	dest: 'build',
	log: null, // Logging verbosity (default: no logging)
	mode: {
		defs: {
			example: true
		}
	},
	shape: {
		id: {
			separator: '',
		},
		transform: {
			svgo: svgoConfig
		}
	},
	svg: {
		dimensionAttributes: false,
	}
};

const projectSvgPath = path.join( process.cwd(), './src/' );
const larvaSvgPath = path.join( process.cwd(), './node_modules/@penskemediacorp/larva-svg/src' );

const spriter = new SVGSpriter(config);

const svgFiles = [
	... globby.sync( [ larvaSvgPath, projectSvgPath ], {
		expandDirectories: {
			extensions: [ 'svg' ],
		}
	}),
];

let scssIcons = {};

console.log( `Looking for SVGs in ${path.relative( process.cwd(), larvaSvgPath )} and ${path.relative( process.cwd(), projectSvgPath )}...` );

svgFiles.forEach( file => {
	// Build Sass vars object
	// TODO: unfinished feature.
	// scssIcons[ path.basename( file, '.svg' ) ] = fs.readFileSync( file, { encoding: 'utf-8' } );

	spriter.add( file, path.basename( file ), fs.readFileSync( file, { encoding: 'utf-8' } ) );
});

console.log( 'Building SVG sprite...' );

// Write the Sass variables.
// TODO: unfinished feature.
// fs.writeFileSync( path.join( process.cwd(), './build/a-icon-svg.scss' ), getSassVarsString( scssIcons ) );

// Compile the sprite
spriter.compile( function( error, result, cssData ) {
	// Run through all configured output modes
	for ( var mode in result ) {
		// Run through all created resources and write them to disk
		for ( var type in result[mode] ) {
			mkdirp.sync( path.dirname( result[mode][type].path ) );
			fs.writeFileSync( result[mode][type].path, result[mode][type].contents );
		}
	}

	console.log( 'Completed building SVG sprite.' );
});
