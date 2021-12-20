import { hslToHexSimple, randInt } from "..";

import { AbstractGame } from "./AbstractGame";

class ColorsGame extends AbstractGame {
  private _meta: [number, number] = [ 0, 0 ];

  constructor(){
    super( {
      expiresIn: Number( process.env.GAME_COLORS_EXPIRES_IN! ),
      totalScore: Number( process.env.GAME_COLORS_TOTAL_SCORE! )
    } );
  }

  generateLevel(): [null, any] | [number, null]{
    if( this.state.status !== "idle" ){
      return [ 1, null ];
    }

    if( this.state.totalScore && this.state.answers === this.state.totalScore ){
      return [ 2, null ];
    }

    if( this.state.expiresAt && Math.floor( Date.now() / 1000 ) >= this.state.expiresAt ){
      return [ 3, null ];
    }

    const diff = 10;
    const color0 = randInt( diff, 360 - diff );
    const color1 = ( color0 + 180 ) % 360;
    const offset = randInt( -diff, diff );

    const data = {
      color0Hex: hslToHexSimple( color0 ),
      color1Hex: hslToHexSimple( color1 ),
      color2Hex: hslToHexSimple( color0 + offset ),
      color3Hex: hslToHexSimple( color1 + offset )
    };

    this._meta = [ color0, color0 + offset ];
    this.state.status = "generated";

    return [ null, data ];
  }

  checkAnswer( answer: boolean ): null | number{
    if( this.state.status !== "generated" ){
      return 1;
    }

    if( this.state.totalScore && this.state.answers === this.state.totalScore ){
      return 2;
    }

    if( this.state.expiresAt && Math.floor( Date.now() / 1000 ) >= this.state.expiresAt ){
      return 3;
    }

    const [ color0, color0Shifted ] = this._meta;
    const delta = Math.abs( color0 - color0Shifted );

    if( delta < 5 === answer ){
      this.state.score++;
    }

    this.state.answers++;
    this.state.status = "idle";

    return null;
  }
}

export { ColorsGame };