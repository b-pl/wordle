class BoardControl {
  constructor() {
    this.game = undefined;
    this.activeTileId = 1;
    this.activeRowId = 1;
    this.correctPositions = [];
    this.inWordPositions = [];
    this.userInputResults = [];
  }

  /**
   * Updates activeTileId; false - decrement; true - increment 
   * @param {bool} increment 
   */
  updateActiveTileId(increment) {
    if (increment) this.activeTileId += 1;
    else this.activeTileId -= 1;

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
   * @param {array} elements - array of selectors to toggle data-is_active attribute
   */
  toggleActiveAttribute(elements) {
    elements.forEach((element) => {
      if (element.getAttribute('data-is_active') === 'true') element.setAttribute('data-is_active', 'false')
      else element.setAttribute('data-is_active', 'true')
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
      const tileToClear = activeTile.textContent ? activeTile : (prevTile.parentElement.getAttribute('data-is_active') === 'true' ? prevTile : false );
      if (tileToClear) this.clearTile(tileToClear);
      if (!prevTile) return;

      this.toggleActiveAttribute([prevTile, activeTile]);
      this.updateActiveTileId(0);

      return
    }

    // set next tile as active
    if (position && ((this.activeTileId % 5 !== 0 ) || goToNextRow)) {
      const nextTile = document.querySelector(`[data-tile_id="${this.activeTileId + 1}"]`);
      this.toggleActiveAttribute([activeTile, nextTile])
      this.updateActiveTileId(1);
      if (goToNextRow) {
        const currentRow = document.querySelector(`[data-row_id="${this.activeRowId}"]`);
        const nextRow = document.querySelector(`[data-row_id="${this.activeRowId + 1}"]`);
        this.updateActiveRowId();
        this.toggleActiveAttribute([currentRow, nextRow])
      }

      return
    }
  }

  isRowComplete() {
    let isComplete = true;
    const tiles = document.querySelectorAll(`[data-row_id="${this.activeRowId}"] .tile`);

    for (let tile of tiles) {
      if (tile.textContent === '') {
        isComplete = false;
        break;
      }
    }

    return isComplete
  }

  /**
   * Mark keyboard key as correctPosition letter or inWord letter
   * @param {char} letterToMark 
   * @param {string} typeOfMark - 'correctPosition' or 'inWord'
   */
  markKeys(letterToMark, typeOfMark) {
    const keyboardKey = document.querySelector(`.keyboard_key[value="${letterToMark.toLowerCase()}"]`);
    const isCorrectPosition = keyboardKey.getAttribute('data-marked') === 'correctPosition' ? true : false;

    if (typeOfMark === 'correctPosition') return keyboardKey.setAttribute('data-marked', 'correctPosition')
    if (typeOfMark === 'inWord' && !isCorrectPosition) return keyboardKey.setAttribute('data-marked', 'inWord')
  }

  /**
   * Marks tiles and keys as inCorrectPosition or inWord
   * If isWon === true, mark all tiles as correct
   * @param {bool} isWon 
   */
  markTilesAndKeys(isWon) {
    if (isWon) return document.querySelector('.row[data-is_active="true"]').setAttribute('data-iswon', 'true')

    const rowIndexInArray = this.activeRowId - 1;
    const userInputRowInArray = this.userInputResults[rowIndexInArray];
    // console.log(userInputRowInArray)
    const uniqueinWordPositionsRowInArray = userInputRowInArray
      .sort((a, b) => a.type > b.type ? 1 : -1)
      .reduce((accumulator, current) => {
        if (!accumulator.find((item) => item.letter === current.letter)) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);

    for (let el of uniqueinWordPositionsRowInArray) {
      if (el.type === 'correctPosition') {
        document.querySelector(`[data-tile_id="${el.id}"]`).setAttribute('data-marked', 'correctPosition');

        this.markKeys(el.letter, 'correctPosition')
      } else {
        document.querySelector(`[data-tile_id="${el.id}"]`).setAttribute('data-marked', 'inWord');

        this.markKeys(el.letter, 'inWord')
      }
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

    return wordArray;
  }

  enterKeyEvent() {
    if (!this.isRowComplete()) return false;
    this.game.setUserWord(this.createUserWordArray())

    const isWon = this.game.isWon();    
    if (isWon === true) {
      this.markTilesAndKeys(true);
      return this.gameWon();
    }

    this.userInputResults.push(isWon)
    this.markTilesAndKeys()
    this.setActiveTile(1, true);

    return
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

  handleClickEvents() {
    const resetButton = document.querySelector('.--reset');

    resetButton.addEventListener('click', () => { this.resetBoard() })
  }

  gameWon = () => {
    return console.log('You\'ve won!')
  }

  resetBoard = () => {
    // reset stats
    this.activeTileId = 1;
    this.activeRowId = 1;
    this.correctPositions = [];
    this.inWordPositions = [];
    this.userInputResults = [];

    // reset front
    const marked = document.querySelectorAll('[data-marked]');
    const isActive = document.querySelectorAll('[data-is_active]');
    const tiles = document.querySelectorAll('.tile')

    marked.forEach((el) => {el.removeAttribute('data-marked')});
    isActive.forEach((el) => {el.removeAttribute('data-is_active')})
    tiles.forEach((el) => {el.textContent = ''})

    const firstRow = document.querySelector('[data-row_id="1"]');
    const firstTile = document.querySelector('[data-tile_id="1"]');

    firstRow.setAttribute('data-is_active', 'true')
    firstTile.setAttribute('data-is_active', 'true')

    // reset game
    this.game.resetGame();
  }

  init = (game) => {
    this.game = game;

    this.handleKeyboardKeyClick();
    this.handleClickEvents()
  }
}

export default BoardControl