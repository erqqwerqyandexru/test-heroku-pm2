'use strict';

const Heroku = require( 'heroku-client' );

const {
    HEROKU_APP_ID,
    HEROKU_API_KEY
} = process.env;

const heroku = new Heroku({ token: HEROKU_API_KEY });

require( './index.js' );

process.on( 'uncaughtException', handleHerokuError );

function handleHerokuError( err ) {
    console.log( 'Heroku error' );

    // Hook for process.exit()
    const processExit = process.exit;
    process.exit = () => {};

    restartAllDynos().then( () => {}, () => {} );

    setTimeout( () => {
        processExit( 1 );
    }, 5000 ).unref();
}

async function restartAllDynos() {
    return heroku.delete( `/apps/${HEROKU_APP_ID}/dynos` );
}