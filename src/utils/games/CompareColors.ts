import { hslToHexSimple, randInt } from "..";

import { AbstractGame } from "./AbstractGame";

class CompareColors extends AbstractGame<any, number> {
  private _meta: number = 0;

  constructor(){
    super( {
      expiresIn: Number( process.env.GAME_COMPARE_COLORS_EXPIRES_IN! ),
      totalScore: Number( process.env.GAME_COMPARE_COLORS_TOTAL_SCORE! )
    } );
  }

  protected generateLevelNative(){
    const minDiff = 5;
    const maxDiff = 10;
    const diff = Math.pow( -1, Math.round( Math.random() ) ) * randInt( minDiff, maxDiff );
    const color0 = randInt( maxDiff, 360 - maxDiff );
    const color1 = color0 + diff;
    const color0Hex = hslToHexSimple( color0 );
    const color1Hex = hslToHexSimple( color1 );
    const data = [ color0Hex, color0Hex, color0Hex, color0Hex ];
    const rnd = randInt( 0, 3 );

    data[ rnd ] = color1Hex;
    this._meta = rnd;

    return data;
  }

  protected checkAnswerNative( answer: number ): boolean{
    return this._meta === answer;
  }
}

export { CompareColors };