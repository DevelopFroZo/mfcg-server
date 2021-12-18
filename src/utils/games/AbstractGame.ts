interface State {
  status: string,
  startAt: number,
  endAt: number,
  rightAnswers: number,
  expiresAt?: number,
  totalLevels?: number
}

interface Q {
  expiresIn?: number,
  totalLevels?: number
}

abstract class AbstractGame {
  private _expiresIn?: number;

  private _state: State = {
    status: "created",
    startAt: 0,
    endAt: 0,
    rightAnswers: 0
  };

  constructor( {
    expiresIn,
    totalLevels
  }: Q = {} ){
    this._expiresIn = expiresIn;
    this._state.totalLevels = totalLevels;
  }

  get state(): State{
    return this._state;
  }

  initialize(): null | number{
    if( this._state.status !== "created" && this.state.status !== "ended" ){
      return 1;
    }

    const startAt = Math.floor( Date.now() / 1000 );

    this._state.status = "idle";
    this._state.startAt = startAt;
    this._state.rightAnswers = 0;

    if( this._expiresIn ){
      this._state.expiresAt = startAt + this._expiresIn;
    }

    return null;
  }

  end(): void{
    this._state.status = "ended";
  };

  abstract generateLevel(): [null, any] | [number, null];

  abstract checkAnswer( answer: boolean ): null | number;
}

export { AbstractGame };