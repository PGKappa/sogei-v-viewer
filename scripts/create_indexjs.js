var fs = require( 'fs' ),
    gameIdUpperCase = (process.env.GAME_ID).toUpperCase(),
    partnerId = process.env[`V_VIEWER_${gameIdUpperCase}_PARTNER`],
    indexPath = `${process.argv[2]}`,
    outputIndexPath = `${process.argv[3]}`;

    console.log("gameIdUpperCase", gameIdUpperCase);
    console.log("partnerId", partnerId);    
fs.writeFileSync( outputIndexPath, fs.readFileSync( indexPath,
{
    encoding: 'utf8',
    flag: 'r'
} )
.replace( /\$\{partner\}/g, partnerId )
);
