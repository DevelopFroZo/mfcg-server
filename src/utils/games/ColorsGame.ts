import { hslToHexSimple, randInt } from "..";

import { AbstractGame } from "./AbstractGame";

class ColorsGame extends AbstractGame<any, boolean> {
  private _meta: boolean = false;

  constructor(){
    super( {
      controls: "yesno",
      expiresIn: Number( process.env.GAME_COLORS_EXPIRES_IN! ),
      totalScore: Number( process.env.GAME_COLORS_TOTAL_SCORE! )
    } );
  }

  protected generateLevelNative(){
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

    this._meta = Math.abs( offset ) < 5;

    return data;
  }

  protected checkAnswerNative( answer: boolean ): boolean{
    return this._meta === answer;
  }
}

export { ColorsGame };