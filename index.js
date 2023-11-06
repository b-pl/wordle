import Game from './game.js'
import BoardControl from './board-control.js'


const init = () => {
  const game = new Game()
  const boardControl = new BoardControl();

  boardControl.init(game);

  // console.log(game._getWord())
  // console.log(game.setUserWord('DYMEK'.split('')))
  // console.log(game.checkWord())
}

window.addEventListener('load', init)