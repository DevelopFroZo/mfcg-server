import { ColorsGame } from "./ColorsGame";

const games = {
  colors: ColorsGame
};

function makeGame( game: keyof typeof games ){
  return new games[ game ];
}

export { makeGame };