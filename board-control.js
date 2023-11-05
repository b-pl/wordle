import Game from './game.js'

class BoardControl {
  constructor() {
    this.game = undefined;
    this.activeTileId = 1;
    this.activeRowId = 1;
    this.correctPositions = [];
    this.inWordPositions = [];
  }

  /**
   * Updates activeTileId; false - decrement; true - increment 
   * @param {bool} increment 
   */
  updateActiveTileId(increment) {
    // console.log(`updated tile id from ${this.activeTileId}`)
    if (increment) this.activeTileId += 1;
    else this.activeTileId -= 1;
    // console.log(`to ${this.activeTileId}`)

    return
  }

  updateActiveRowId() {
    return this.activeRowId += 1;
  } 

  /**
   * Clears text-content for tile
   * @param {element} tile 
   */
  clearTile(tile) {
    return tile.textContent = '';
  }

  /**
   * Toggles data-is_active attribute
   * @param {array} tiles - array of selectors to toggle data-is_active attribute
   */
  toggleTilesActiveAttribute(tiles) {
    // console.group('toggleTilesActiveAttribute')
    // console.log(tiles)
    // console.groupEnd('toggleTilesActiveAttribute')
    tiles.forEach((tile) => {
      if (tile.getAttribute('data-is_active') === 'true') tile.setAttribute('data-is_active', 'false')
      else tile.setAttribute('data-is_active', 'true')
    })

    return
  }

  /**
   * Sets active tile
   * Clears tile
   * @param {bool} position - true -> next / false -> prev
   * @param {bool} goToNextRow 
   */
  setActiveTile(position, goToNextRow) {
    const activeTile = document.querySelector(`[data-tile_id="${this.activeTileId}"]`);
    const isRowActive = activeTile.parentElement.getAttribute('data-is_active') === 'true' ? true : false;

    if (!position) {
      const prevTile = this.activeTileId - 1 !== 0 && isRowActive ? document.querySelector(`[data-tile_id="${this.activeTileId - 1}"]`) : false;
      const tileToClear = activeTile.textContent ? activeTile : prevTile;
      // console.group('setActiveTile')
      // console.log(`@params: position = ${position}, goToNextRow = ${goToNextRow}`)
      // console.log(`function consts: activeTile = ${activeTile}, isRowActive = ${isRowActive}`)
      // console.log(`!position consts: prevTile = ${prevTile}, tileToClear = ${tileToClear}`)
      // console.groupEnd('setActiveTile')
      if (tileToClear) this.clearTile(tileToClear);
      if (!prevTile) return;

      this.toggleTilesActiveAttribute([prevTile, activeTile]);
      this.updateActiveTileId(0);

      return
    }

    // set next tile as active
    if (position && ((this.activeTileId % 5 !== 0 ) || goToNextRow)) {
      const nextTile = document.querySelector(`[data-tile_id="${this.activeTileId + 1}"]`);
      this.toggleTilesActiveAttribute([activeTile, nextTile])
      this.updateActiveTileId(1);
      if (goToNextRow) this.updateActiveRowId();

      return
    }
  }

  createUserWordArray() {
    const wordArray = []
    const wordTiles = document.querySelectorAll(`[data-row_id="${this.activeRowId}"] .tile`);
    for (let el of wordTiles) {
      const letterObj = {
        letter: el.textContent.toUpperCase(),
        tileId: el.getAttribute('data-tile_id')
      }
      wordArray.push(letterObj);
    }
    console.group(`createUserWordArray`)
    console.log(`wordArray = ${wordArray}`)
    console.groupEnd(`createUserWordArray`)

    return wordArray;
  }

  enterKeyEvent() {
    this.game.setUserWord(this.createUserWordArray())

    const isWon = this.game.isWon();
    console.log(isWon)
    if (isWon === true) return this.gameWon();

    if (isWon.correctPositionTileId.length) this.correctPositions.push(isWon.correctPositionTileId)
    if (isWon.inWordTileId.length) this.inWordPositions.push(isWon.inWordTileId)

    console.log(this.correctPositions)
    console.log(this.inWordPositions)
    this.setActiveTile(1, true);
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

    enterKey.addEventListener('click', () => this.enterKeyEvent())

    // physical keyboard events
    window.addEventListener('keydown', (e) => {
      // console.log(e.code)
      // console.log(e.key)
      // letters
      if (e.code.includes('Key')) {
        const activeTile = document.querySelector(`[data-tile_id="${this.activeTileId}"]`);
        if (activeTile.textContent !== '') return false

        activeTile.textContent = e.key
        this.setActiveTile(1);
      }

      // backspace
      if (e.code === 'Backspace') this.setActiveTile(0)

      // enter
      if (e.code === 'Enter') this.enterKeyEvent()
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