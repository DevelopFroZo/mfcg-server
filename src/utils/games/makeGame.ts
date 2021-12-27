import { CenterGame } from "./CenterGame";
import { CompareColors } from "./CompareColors";
import { ColorsGame } from "./ColorsGame";

const games = {
  center: CenterGame,
  compare_colors: CompareColors,
  colors: ColorsGame
};

function makeGame( game: keyof typeof games ){
  return new games[ game ];
}

export { makeGame };