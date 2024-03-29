import Game from './game.js'
import BoardControl from './board-control.js'

const init = () => {
  window.game = new Game()
  const boardControl = new BoardControl();
  window.boardControl = boardControl

  boardControl.init(window.game);
}

window.addEventListener('load', init)