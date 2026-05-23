var fs = require( 'fs' ),
    gameIdUpperCase = process.env.GAME_ID.toUpperCase(),
    partnerId = process.env[`V_VIEWER_${gameIdUpperCase}_PARTNER`],
    indexPath = process.argv[2] || 'src/index.template.demo.js';

    console.log("gameIdUpperCase", gameIdUpperCase);
    console.log("partnerId", partnerId);    
fs.writeFileSync( 'src/index.js', fs.readFileSync( indexPath,
{
    encoding: 'utf8',
    flag: 'r'
} )
.replace( /\$\{partner\}/g, partnerId )
);
