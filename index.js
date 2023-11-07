import Game from './game.js'
import BoardControl from './board-control.js'

// const events = () => {
//   const howToPlayButton = document.querySelector('.button.--howtoplay');
//   const howToPlayModal = document.querySelector('#how_to_play')

//   howToPlayButton.addEventListener('click', () => {
//     howToPlayModal.showModal();
//   })
// }

window.game = new Game()
const init = () => {
  // events();

  
  const boardControl = new BoardControl();

  boardControl.init(window.game);

  // console.log(game._getWord())
  // console.log(game.setUserWord('DYMEK'.split('')))
  // console.log(game.checkWord())
}

window.addEventListener('load', init)