const execPhp = require( 'exec-php' );
const path = require( 'path' );
const chalk = require( 'chalk' );
const getAppConfiguration = require( '@penskemediacorp/larva' ).getConfig;
const RELATIVE_OUPUT_PATH = '../template-parts/patterns'; // Not permitted to override this because it will break the include paths.

/**
 * Twig to PHP Parser
 * 
 * @param {string} twigDirPath Absolute path to Twig patterns
 * @param {string} phpDirPath Absolute path to PHP output
 * @param {object} config Containing 
 */

function twigToPhpParser( twigDirPath, phpDirPath, config = {} ) {

	return new Promise( ( resolve, reject ) => {

		execPhp( path.resolve( __dirname, './lib/twig-to-php-parser.php' ), config.phpBinaryPath, function( error, php, output ) {

			if ( error ) {
				reject( error );
			}

			php.twig_to_php_parser( twigDirPath, phpDirPath, function( error, result, output, printed ) {

				if ( error ) {
					reject( error );
				}

				resolve( result );

			});

		});

	});

};

function parseIncludePath( twigIncludeStr, patternName, dataName, config = {} ) {

	return new Promise( ( resolve, reject ) => {

		execPhp( path.resolve( __dirname, './lib/twig-to-php-parser.php' ), config.phpBinaryPath, function( error, php, output ) {

			if ( error ) {
				reject( error );
			}

			php.parse_include_path( twigIncludeStr, patternName, dataName, function( error, result, output, printed ) {

				if ( error ) {
					reject( error );
				}

				resolve( result );

			});

		});

	});

};

module.exports = {
	twigToPhpParser: twigToPhpParser,
	methods: {
		parseIncludePath: parseIncludePath
	},
	run: () => {
		let config = getAppConfiguration( 'parser' );
		let relativeSrcPath = config.relativeSrcOverride || './src/patterns';

		twigToPhpParser( path.resolve( process.cwd(), relativeSrcPath ), path.resolve( process.cwd(), RELATIVE_OUPUT_PATH ), config )
		.catch( e => console.log( e ) ) // PHP errors
		.then( result => console.log( chalk.green( 'Completed parsing Twig templates to PHP.' ) ) )
		.catch( e => console.log( e ) );
	}
};
