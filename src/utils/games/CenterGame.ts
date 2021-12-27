import { randInt } from "../randInt";

import { AbstractGame } from "./AbstractGame";

const imgs = [
  {
    path: "/img/cat0.png",
    x: 53,
    y: 66
  }
];

class CenterGame extends AbstractGame<any, boolean> {
  private _meta: boolean = false;

  constructor(){
    super( {
      controls: "yesno",
      totalScore: 10
    } );
  }

  protected generateLevelNative(){
    const img = imgs[ randInt( 0, imgs.length - 1 ) ];

    const rawX = Math.random() * 2 - 1;
    const rawY = Math.random() * 2 - 1;
    const x = ( img.x + rawX ) / 100;
    const y = ( img.y + rawY ) / 100;

    const data = {
      imagePath: img.path,
      scale: { x, y }
    };

    this._meta = Math.sqrt( Math.pow( rawX, 2 ) + Math.pow( rawY, 2 ) ) < .5;

    return data;
  }

  protected checkAnswerNative( answer: boolean ): boolean{
    return this._meta === answer;
  }
}

export { CenterGame };