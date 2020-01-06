const spawn = require( 'cross-spawn' );

const getArgsFromCli = require( './getArgsFromCli' );

// Filter out the first CLI argument which is the Larva command,
// and not needed for the binary.
const argsWithoutLarvaCommand = ( () => {
	let cliArgs = getArgsFromCli();

	if ( cliArgs.length ) {
		cliArgs.shift();
	}

	return cliArgs.length ? cliArgs : [];
} )();

module.exports = function spawnScript( binaryFile, scriptArgs ) {

	spawn.sync(
		binaryFile,
		[
			... scriptArgs,
			... argsWithoutLarvaCommand
		], { stdio: 'inherit' }
	);
};
