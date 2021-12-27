interface Options {
  controls?: string,
  expiresIn?: number,
  totalScore?: number,
  endOnFail?: boolean
}

abstract class AbstractGame<T = any, R = any> {
  private _controls?: string;
  private _expiresIn?: number;
  private _expiresAt?: number;
  private _startAt: number = 0;
  private _totalScore?: number;
  private _endOnFail: boolean;
  private _status: string = "created";
  private _answers: number = 0;
  private _score: number = 0;

  protected abstract generateLevelNative(): T;

  protected abstract checkAnswerNative( answer: R ): boolean;

  constructor( {
    controls,
    expiresIn,
    totalScore,
    endOnFail = false
  }: Options = {} ){
    this._controls = controls;
    this._expiresIn = expiresIn;
    this._totalScore = totalScore;
    this._endOnFail = endOnFail;
  }

  get initialState(){
    return {
      controls: this._controls,
      expiresAt: this._expiresAt,
      totalScore: this._totalScore
    };
  }

  get state(){
    return {
      status: this._status,
      answers: this._answers,
      score: this._score
    };
  }

  initialize(): null | number{
    if( this._status !== "created" && this._status !== "ended" ){
      return 1;
    }

    const now = Math.floor( Date.now() / 1000 );

    this._startAt = now;
    this._status = "idle";
    this._answers = 0;
    this._score = 0;

    if( this._expiresIn ){
      this._expiresAt = now + this._expiresIn;
    }

    return null;
  }

  generateLevel(): [null, T] | [number, null]{
    const now = Math.floor( Date.now() / 1000 );

    if( this._status !== "idle" ){
      return [ 1, null ];
    }

    if( this._totalScore && this._answers === this._totalScore ){
      return [ 2, null ];
    }

    if( this._expiresAt && now >= this._expiresAt ){
      return [ 3, null ];
    }

    const data = this.generateLevelNative();

    this._status = "generated";

    return [ null, data ];
  }

  checkAnswer( answer: R ): null | number{
    const now = Math.floor( Date.now() / 1000 );

    if( this._status !== "generated" ){
      return 1;
    }

    if( this._totalScore && this._answers === this._totalScore ){
      return 2;
    }

    if( this._expiresAt && now >= this._expiresAt ){
      return 3;
    }

    const checkAnswerResult = this.checkAnswerNative( answer );
    let isRight = false;

    if( checkAnswerResult ){
      this._score++;
      isRight = true;
    }

    this._answers++;

    if( this._endOnFail && !isRight || this._answers === this._totalScore ){
      this._status = "failed";
    } else {
      this._status = "idle";
    }

    return null;
  }

  end(): number{
    const now = Math.floor( Date.now() / 1000 );
    const totalSeconds = now - this._startAt;

    this._status = "ended";

    return totalSeconds;
  }
}

export { AbstractGame };