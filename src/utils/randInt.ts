function randInt( min: number, max: number ): number{
  const delta = max - min;
  const result = Math.floor( Math.random() * ( delta + 1 ) ) + min;

  return result;
}

export { randInt };