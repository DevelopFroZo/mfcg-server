import { createServer } from "http";

import dotenv from "dotenv";
import express from "express";
import { Server as SocketIoServer } from "socket.io";

import { AbstractGame } from "./utils/games/AbstractGame";
import { makeGame } from "./utils/games/makeGame";

async function index(){
  const PORT = process.argv[2] || 3001;
  const NODE_ENV = process.argv[3] || "development";

  dotenv.config();

  const app = express();
  const server = createServer( app );

  const io = new SocketIoServer( server, {
    cors: {
      origin: "*"
    }
  } );

  const games: Record<string, AbstractGame> = {};
  let usersCount = 0;

  app.use(
    express.static( "static" )
  );

  io.on( "connect", socket => {
    const socketId = socket.id;

    io.emit( "totalUsers", ++usersCount );

    console.log( `[C] ${socketId}` );

    socket.on( "initialize", ( gameName, isNew, cb ) => {
      console.log( `  [I]` );

      let game;

      // TODO MAKE SET
      if( isNew || !( socketId in games ) ){
        game = makeGame( gameName );
        games[ socketId ] = game;
      } else {
        game = games[ socketId ];
      }

      game.initialize();

      cb( game.initialState, game.state );
    } );

    socket.on( "generateLevel", cb => {
      console.log( `  [G]` );

      const game = games[ socketId ];
      const [ error, data ] = game.generateLevel();

      cb( data, game.state );
    } );

    socket.on( "checkAnswer", ( answer, cb ) => {
      const game = games[ socketId ];

      const error = game.checkAnswer( answer );

      cb( game.state );
    } );

    socket.on( "end", cb => {
      const game = games[ socketId ];
      const [ error, totalSeconds ] = game.end();

      cb( totalSeconds, game.state );
    } );

    socket.on( "disconnect", () => {
      console.log( `[D] ${socketId}` );

      delete games[ socketId ];

      io.emit( "totalUsers", --usersCount );
    } );
  } );

  server.listen( PORT, () => {
    console.log( `> \x1b[36mStarted \x1b[35m${NODE_ENV}\x1b[36m server on port \x1b[35m${PORT}\x1b[0m` );
  } );
}

index();

export default index;