import { AbstractGame } from "./AbstractGame";

class CenterGame extends AbstractGame<{
  rightAnswers: number
}> {
  private _meta: number = 0;

  constructor(){
    super( {
      status: "idle",
      rightAnswers: 0
    } );
  }

  generateLevel(): [null, any] | [number, null]{
    if( this.state.status !== "idle" ){
      return [ 1, null ];
    }

    const data = {
      xOffset: Math.random() * 2 - 1,
      yOffset: Math.random() * 2 - 1
    };

    this._meta = Math.sqrt( Math.pow( data.xOffset, 2 ) + Math.pow( data.yOffset, 2 ) );
    this.state.status = "generated";

    return [ null, data ];
  }

  checkAnswer( answer: boolean ): null | number{
    if( this.state.status !== "generated" ){
      return 1;
    }

    if( this._meta < .6 === answer ){
      this.state.rightAnswers++;
    }

    this.state.status = "idle";

    return null;
  }

  end(): void{
    this.state.status = "end";
  }

  // checkAnswer( answer: boolean ): number | null{
  //   //
  // }
}

export { CenterGame };