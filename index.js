'use strict';

const { promisify } = require( 'util' );

const timeout = promisify( setTimeout );

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

async function run() {
    console.log( 'run' );
    // await timeout( 5000 );
    // throw new Error( 'Test error' );
    setInterval( () => {
        console.log( 'interval' );
        if( randomInteger( 0, 9 ) >= 9 ) throw new Error( 'Test error' );
    }, 1500 );
}

run().catch( handleError );

process.on( 'uncaughtException', handleError );

function handleError( err ) {
    console.error( err );
    setTimeout( () => {
        process.exit( 1 );
    }, 1000 ).unref();
}