interface State {
  status: string,
  startAt: number,
  endAt: number,
  answers: number,
  score: number,
  expiresAt?: number,
  totalScore?: number
}

interface Options {
  controls?: string,
  expiresIn?: number,
  totalScore?: number
}

abstract class AbstractGame {
  private _controls?: string;
  private _expiresIn?: number;

  private _state: State = {
    status: "created",
    startAt: 0,
    endAt: 0,
    answers: 0,
    score: 0
  };

  constructor( {
    controls,
    expiresIn,
    totalScore
  }: Options = {} ){
    this._controls = controls;
    this._expiresIn = expiresIn;
    this._state.totalScore = totalScore;
  }

  get controls(): undefined | string{
    return this._controls;
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
    this._state.score = 0;

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