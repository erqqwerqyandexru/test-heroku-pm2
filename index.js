'use strict';

const http = require( 'http' );
const morgan = require( 'morgan' );
const express = require( 'express' );

const {
    PORT
} = process.env;

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const app = express();

app.use( morgan( 'dev' ) );

const server = http.createServer( app );

server.listen( PORT, () => {
    const { port, address } = server.address();
    console.log( `Server listening ${address} on port ${port}` );
    setTimeout( () => {
        throw new Error( 'Test error' );
    }, randomInteger( 3000, 10000 ) )
});

process.on( 'uncaughtException', handleError );

function handleError( err ) {
    console.error( err );
    setTimeout( () => {
        process.exit( 1 );
    }, 1000 ).unref();
    server.close();
}