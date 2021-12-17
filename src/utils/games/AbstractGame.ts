abstract class AbstractGame<T extends Record<string, any>> {
  private _status: string = "initialize";
  private _state: T = {} as T;

  get status(): string{
    return this._status;
  }

  get state(): T{
    return this._state;
  }

  set status( status: string ){
    this._status = status;
  }

  set state( state: T ){
    this._state = state;
  }

  abstract initialize(): null | number;

  abstract generateLevel(): [null, any] | [number, null];

  abstract checkAnswer( answer: boolean ): null | number;

  end(): void{
    this.status = "ended";
  };
}

export { AbstractGame };