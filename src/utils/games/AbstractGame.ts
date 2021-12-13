interface DefaultState {
  status: string
}

abstract class AbstractGame<T extends Record<string, any>, R = DefaultState & T> {
  private _state: R;

  constructor( state: R ){
    this._state = state;
  }

  get state(): R{
    return this._state;
  }

  abstract generateLevel(): [null, any] | [number, null];

  abstract checkAnswer( answer: boolean ): null | number;

  abstract end(): void;
}

export { AbstractGame };