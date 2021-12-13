import { ColorsGame } from "./ColorsGame";
import { CenterGame } from "./CenterGame";

const games = {
  colors: ColorsGame,
  center: CenterGame
};

function makeGame( game: keyof typeof games ){
  return new games[ game ];
}

export { makeGame };