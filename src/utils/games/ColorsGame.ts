import { hslToHexSimple } from "../hslToHex";

import { AbstractGame } from "./AbstractGame";

function randInt( min: number, max: number ): number{
  const delta = max - min;
  const result = Math.floor( Math.random() * ( delta + 1 ) ) + min;

  return result;
}

class ColorsGame extends AbstractGame<{
  rightAnswers: number,
  expiresAt: number
}> {
  private _meta: [number, number] = [ 0, 0 ];

  constructor(){
    super( {
      status: "idle",
      rightAnswers: 0,
      expiresAt: Math.floor( Date.now() / 1000 ) + 20
    } );
  }

  generateLevel(): [null, any] | [number, null]{
    if( this.state.status !== "idle" ){
      return [ 1, null ];
    }

    if( this.state.expiresAt && Math.floor( Date.now() / 1000 ) >= this.state.expiresAt ){
      return [ 2, null ];
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

    if( this.state.expiresAt && Math.floor( Date.now() / 1000 ) >= this.state.expiresAt ){
      return 2;
    }

    const [ color0, color0Shifted ] = this._meta;
    const delta = Math.abs( color0 - color0Shifted );

    if( delta < 5 === answer ){
      this.state.rightAnswers++;
    }

    this.state.status = "idle";

    return null;
  }

  end(): void{
    this.state.status = "ended";
  }
}

export { ColorsGame };