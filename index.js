import Game from './game.js'


const init = () => {
  const game = new Game()

  console.log(game._getWord())
  console.log(game.setUserWord('DYMEK'.split('')))
  console.log(game.checkWord())
}

window.addEventListener('load', init)