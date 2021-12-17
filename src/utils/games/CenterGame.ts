import { AbstractGame } from "./AbstractGame";

class CenterGame extends AbstractGame<{
  rightAnswers: number
}> {
  private _meta: number = 0;

  initialize(): number | null{
    if( this.status !== "initialize" && this.status !== "end" ){
      return 1;
    }

    this.status = "idle";

    this.state = {
      rightAnswers: 0
    };

    return null;
  }

  generateLevel(): [null, any] | [number, null]{
    if( this.status !== "idle" ){
      return [ 1, null ];
    }

    const data = {
      xOffset: Math.random() * 2 - 1,
      yOffset: Math.random() * 2 - 1
    };

    this._meta = Math.sqrt( Math.pow( data.xOffset, 2 ) + Math.pow( data.yOffset, 2 ) );
    this.status = "generated";

    return [ null, data ];
  }

  checkAnswer( answer: boolean ): null | number{
    if( this.status !== "generated" ){
      return 1;
    }

    if( this._meta < .6 === answer ){
      this.state.rightAnswers++;
    }

    this.status = "idle";

    return null;
  }
}

export { CenterGame };