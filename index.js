import Game from './game.js'
import BoardControl from './board-control.js'
import Stats from './stats.js'


const init = () => {
  window.game = new Game()
  window.stats = new Stats();
  const boardControl = new BoardControl();

  boardControl.init(window.game);
}

window.addEventListener('load', init)