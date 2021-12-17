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

  initialize(): number | null{
    if( this.status !== "initialize" && this.status !== "end" ){
      return 1;
    }

    this.status = "idle";

    this.state = {
      rightAnswers: 0,
      expiresAt: Math.floor( Date.now() / 1000 ) + 20
    };

    return null;
  }

  generateLevel(): [null, any] | [number, null]{
    if( this.status !== "idle" ){
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
    this.status = "generated";

    return [ null, data ];
  }

  checkAnswer( answer: boolean ): null | number{
    if( this.status !== "generated" ){
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

    this.status = "idle";

    return null;
  }
}

export { ColorsGame };