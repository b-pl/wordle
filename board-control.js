import Game from './game.js'

class BoardControl {
  constructor() {
    this.game = undefined;
    this.activeTileId = 1;
    this.correctPositions = [];
    this.inWordPositions = [];
    this.activeRowId = 1;
  }

  /**
   * Clears text-content for tile
   * @param {element} tile 
   */
  clearTile(tile) {
    return tile.textContent = '';
  }

  // to powinno przyjmować tablicę elementów
  toggleTileActiveAttribute(tile) {
    if (tile.getAttribute('data-is_active') === 'true') tile.setAttribute('data-is_active', 'false')
    else tile.setAttribute('data-is_active', 'true')

    return
  }

  /**
   * Sets active tile
   * @param {bool} position - true -> next / false -> prev
   * @param {bool} goToNextRow 
   */
  setActiveTile(position, goToNextRow) {
    const activeTile = document.querySelector(`[data-tile_id="${this.activeTileId}"]`);
    if (!activeTile) return false;

    // set prev tile as active
    if (!position && ( (this.activeTileId - 1) !== 0 && (this.activeTileId - 1 % 5 !== 0) )) {
      // zmienic na selector tile_id
      const prevTile = activeTile.previousElementSibling;
      this.clearTile(prevTile)
      // powinno być pojedyncze wywolanie
      this.toggleTileActiveAttribute(activeTile)
      this.toggleTileActiveAttribute(prevTile)
      // decrement
      this.activeTileId -= 1;

      return
    }

    // set next tile as active
    if (position && ((this.activeTileId % 5 !== 0 ) || goToNextRow)) {
      // pojedyncze wywolanie
      this.toggleTileActiveAttribute(activeTile)
      this.toggleTileActiveAttribute(document.querySelector(`[data-tile_id="${this.activeTileId + 1}"]`))
      // increment
      this.activeTileId +=  1;
      if (goToNextRow) this.activeRowId += 1;

      return
    }
  }

  createUserWordArray() {
    const wordArray = []
    const wordTiles = document.querySelectorAll(`[data-row_id="${this.activeRowId}"] .tile`);
    for (let el of wordTiles) {
      wordArray.push(el.textContent.toUpperCase());
    }

    return wordArray;
  }

  handleKeyboardKeyClick() {
    const keys = document.querySelectorAll('.keyboard_key:not(.keyboard_key--special)');
    const backspaceKey = document.querySelector('.keyboard_key.--backspace');
    const enterKey = document.querySelector('.keyboard_key.--enter');

    keys.forEach((key) => {
      key.addEventListener('click', () => {
        const activeTile = document.querySelector(`[data-tile_id="${this.activeTileId}"]`);
        if (activeTile.textContent !== '') return false

        activeTile.textContent = key.getAttribute('value');
        this.setActiveTile(1);
      })
    })

    backspaceKey.addEventListener('click', () => this.setActiveTile(0));

    enterKey.addEventListener('click', () => {
      this.game.setUserWord(this.createUserWordArray())

      const isWon = this.game.isWon();
      if (isWon === true) return this.gameWon();

      if (isWon.isInCorrectPosition.length) this.correctPositions.push(isWon.isInCorrectPosition)
      if (isWon.isInWord.length) this.inWordPositions.push(isWon.isInWord)
      this.setActiveTile(1, true);
    })
  }

  gameWon = () => {
    return alert('You\'ve won!')
  }

  init = (game) => {
    this.game = game;

    this.handleKeyboardKeyClick();
  }
}

export default BoardControl