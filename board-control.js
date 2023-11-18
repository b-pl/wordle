class BoardControl {
  constructor() {
    this.game = undefined;
    this.activeTileId = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')).activeTile : 1;
    this.activeRowId = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')).activeRow : 1;
    this.userInputResults = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')).userInputResults : [];
    this.keyboardBlocked = false;

    if (localStorage.getItem('data')) this.loadData();
    if (localStorage.getItem('darkmode') && localStorage.getItem('darkmode') === 'true') this.setThemeOnLoad();
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
   * @param {bool} goToNextRow 
   */
  setNextTileActive(goToNextRow) {
    const activeTile = document.querySelector(`[data-tile_id="${this.activeTileId}"]`);
    const isLastTileInRow = this.activeTileId % 5 === 0 ? true : false;

    if (!isLastTileInRow || goToNextRow) {
      const nextTile = document.querySelector(`[data-tile_id="${this.activeTileId + 1}"]`);
      this.toggleActiveAttribute([activeTile, nextTile])
      this.updateActiveTileId(1);
    }

    if (goToNextRow) {
      const currentRow = document.querySelector(`[data-row_id="${this.activeRowId}"]`);
      const nextRow = document.querySelector(`[data-row_id="${this.activeRowId + 1}"]`);
      this.updateActiveRowId();
      this.toggleActiveAttribute([currentRow, nextRow])
    }

    return;
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
    if (typeOfMark !== 'correctPosition' && typeOfMark !== 'inWord' && !keyboardKey.hasAttribute('data-marked')) return keyboardKey.setAttribute('data-marked', 'notInWord')
  }

  /**
   * Marks tiles and keys as inCorrectPosition or inWord
   * If isWon === true, mark all tiles as correct
   * @param {bool} isWon 
   */
  markTilesAndKeys(isWon) {
    if (isWon) return document.querySelector('.row[data-is_active="true"]').setAttribute('data-iswon', 'true')

    const userInputRowInArray = this.userInputResults[this.activeRowId - 1];
    // console.log(userInputRowInArray)
    const uniqueInWordPositionsRowInArray = userInputRowInArray
      .sort((a, b) => a.type > b.type ? 1 : -1)
      .reduce((accumulator, current) => {
        if (!accumulator.find((item) => item.letter === current.letter)) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);

    for (let el of uniqueInWordPositionsRowInArray) {
      if (el.type === 'correctPosition') {
        document.querySelector(`[data-tile_id="${el.id}"]`).setAttribute('data-marked', 'correctPosition');

        this.markKeys(el.letter, 'correctPosition')
      } else {
        document.querySelector(`[data-tile_id="${el.id}"]`).setAttribute('data-marked', 'inWord');

        this.markKeys(el.letter, 'inWord')
      }
    }

    const leftLetters = document.querySelectorAll(`[data-row_id="${this.activeRowId}"] .tile:not([data-marked])`);
    for (let el of leftLetters) {
      const letterValue = el.textContent;
      this.markKeys(letterValue);
      el.setAttribute('data-marked', 'notInWord')
    }

    return
  }

  createUserWordArray() {
    const wordArray = [];
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

  // Events on word enter
  enterKeyEvent() {
    if (this.keyboardBlocked) return false;
    
    if (!this.isRowComplete()) return false;
    this.game.setUserWord(this.createUserWordArray())

    // If game's won
    const isWon = this.game.isWon();    
    if (isWon === true) {
      this.markTilesAndKeys(true);
      return this.gameWon();
    }
    this.userInputResults.push(isWon)

    // If game's lost
    if (this.activeRowId === 6) {
      return this.gameLost();
    }

    // If game continues
    this.markTilesAndKeys()
    this.setNextTileActive(true);

    return
  }

  backspaceEvent() {
    if (this.keyboardBlocked) return false;

    const activeTileElement = document.querySelector(`[data-tile_id="${this.activeTileId}"]`);
    if (this.activeTileId === 1) return this.clearTile(activeTileElement);

    if (activeTileElement.textContent !== '') {
      this.clearTile(activeTileElement);
      return;
    }

    const prevTileElement = document.querySelector(`[data-tile_id="${this.activeTileId - 1}"]`);    
    if (this.activeRowId == prevTileElement.parentElement.dataset.row_id) {
      prevTileElement.textContent = '';
      this.toggleActiveAttribute([prevTileElement, activeTileElement]);
      this.updateActiveTileId(0);
      return;
    }
  }

  keyEvent(value) {
    if (this.keyboardBlocked) return false;

    const activeTile = document.querySelector(`[data-tile_id="${this.activeTileId}"]`);
    if (activeTile.textContent !== '') return false;

    activeTile.textContent = value;
    this.setNextTileActive();

    return;
  }

  handleKeyClick() {
    const keys = document.querySelectorAll('.keyboard_key:not(.keyboard_key--special)');
    const backspaceKey = document.querySelector('.keyboard_key.--backspace');
    const enterKey = document.querySelector('.keyboard_key.--enter');

    keys.forEach((key) => {
      key.addEventListener('click', () => this.keyEvent(key.getAttribute('value')));
    })
    backspaceKey.addEventListener('click', () => this.backspaceEvent());
    enterKey.addEventListener('click', () => this.enterKeyEvent())

    // physical keyboard events
    window.addEventListener('keydown', (e) => {
      // letters
      if (e.code.includes('Key')) this.keyEvent(e.key);

      // backspace
      if (e.code === 'Backspace') this.backspaceEvent();

      // enter
      if (e.code === 'Enter') this.enterKeyEvent()
    })
  }

  statsOpenEvent() {
    const statsModal = document.querySelector('#stats');
    if (!statsModal) return false;
    this.keyboardBlocked = true;

    statsModal.showModal();

    const stats = this.game.stats.getStats();
    for (let [key, value] of Object.entries(stats)){
      if (document.querySelector(`.--${key}`)) {
          document.querySelector(`.--${key} .item_value`).textContent = (key === 'lowTime' || key === 'highTime') ?
                                                                        this.game.stats.timer.getFormattedTime(value) :
                                                                        value;
      }
    };

    document.querySelector('.--progress .item_value').textContent = `${localStorage.getItem('guessed')
                                                                    ? JSON.parse(localStorage.getItem('guessed')).length
                                                                    : 0} / ${this.game.localDictionary.length}`

    return;
  }

  statsCloseEvent() {
    this.keyboardBlocked = false;
    const statsModal = document.querySelector('#stats');
    if (!statsModal) return false;

    statsModal.close();
  }

  toggleThemeEvent() {
    const toggleCheckbox = document.querySelector('#toggle_theme');
    toggleCheckbox.checked = !toggleCheckbox.checked;

    document.querySelector('html').classList.toggle('dark');
    localStorage.setItem('darkmode', toggleCheckbox.checked)

    return;
  }

  handleEvents() {
    const resetButton = document.querySelector('.--reset');
    const statsButton = document.querySelector('.--stats');
    const closeStatsButton = document.querySelector('.close_button');
    const statsModal = document.querySelector('#stats');
    const themeSwitch = document.querySelector('.theme_switch')

    resetButton.addEventListener('click', () => this.resetBoard());
    statsButton.addEventListener('click', () => this.statsOpenEvent());
    closeStatsButton.addEventListener('click', () => this.statsCloseEvent());
    statsModal.addEventListener('close', () => this.statsCloseEvent());
    themeSwitch.addEventListener('click', () => this.toggleThemeEvent());
  }

  gameWon() {
    this.statsOpenEvent();
    document.querySelector('#won_headline').classList.remove('hidden');
    document.querySelector('.--word').textContent = this.game.answerWord.join('');
    this.removeData()

    return;
  }

  gameLost() {
    this.statsOpenEvent();
    document.querySelector('#lost_headline').classList.remove('hidden');
    document.querySelector('.--word').classList.remove('hidden');
    document.querySelector('.--word').textContent = this.game.answerWord.join('');
    this.removeData()

    return;
  }

  resetBoard = () => {
    // reset stats
    this.activeTileId = 1;
    this.activeRowId = 1;
    this.userInputResults = [];

    // reset front
    const marked = document.querySelectorAll('[data-marked]');
    const isActive = document.querySelectorAll('[data-is_active]');
    const tiles = document.querySelectorAll('.tile')

    marked.forEach((el) => {el.removeAttribute('data-marked')});
    isActive.forEach((el) => {el.removeAttribute('data-is_active')})
    tiles.forEach((el) => {el.textContent = ''})

    const wonRow = document.querySelector('[data-iswon]');
    if (wonRow) wonRow.removeAttribute('data-iswon');

    const firstRow = document.querySelector('[data-row_id="1"]');
    const firstTile = document.querySelector('[data-tile_id="1"]');

    firstRow.setAttribute('data-is_active', 'true')
    firstTile.setAttribute('data-is_active', 'true')

    // reset stats modal
    document.querySelectorAll('.endgame_headline').forEach((el) => el.classList.add('hidden'));
    document.querySelector('.--word').textContent = '';
    document.querySelector('.--word').classList.add('hidden')

    // reset game
    this.game.resetGame();
    this.removeData();

    return;
  }

  saveData() {
    if (this.game.timesGuessed === 6 || this.game.timesGuessed === 0 || this.game.gameWon === true) return false;
    // tiles data
    const tiles = document.querySelectorAll('.tile');
    const tilesArr = [];
    tiles.forEach((tile) => {
      if (tile.textContent !== '') {
        const obj = {
          tileId: tile.dataset.tile_id,
          marked: tile.dataset.marked,
          value: tile.textContent
        }
  
        tilesArr.push(obj)
      }
    });
  
    // keyboard data
    const keys = document.querySelectorAll('.keyboard_key');
    const keysArr = [];
    keys.forEach((key) => {
      if (key.dataset.marked) {
        const obj = {
          value: key.getAttribute('value'),
          marked: key.dataset.marked
        }
  
        keysArr.push(obj)
      }
    });

    const data = {
      tiles: tilesArr,
      keys: keysArr,
      answer: this.game.answerWord,
      time: this.game.stats.timer.currentTime,
      timesGuessed: this.game.timesGuessed,
      activeRow: this.activeRowId,
      activeTile: this.activeTileId,
      userInputResults: this.userInputResults
    }

    return localStorage.setItem('data', JSON.stringify(data));
  }

  loadData() {
    const data = JSON.parse(localStorage.getItem('data'));
    const tiles = data.tiles;
    const keys = data.keys;

    tiles.forEach((el) => {
      const tile = document.querySelector(`.tile[data-tile_id="${el.tileId}"]`);
      tile.textContent = el.value.toUpperCase();
      (el.marked && el.marked !== '') ? tile.dataset.marked = el.marked : '';
    })
  
    keys.forEach((el) => {
      const key = document.querySelector(`.keyboard_key[value="${el.value}"]`)
      key.dataset.marked = el.marked && el.marked !== '' ? el.marked : '';
    })

    return
  }

  setThemeOnLoad() {
    const toggleCheckbox = document.querySelector('#toggle_theme');
    toggleCheckbox.checked = true;
    document.querySelector('html').classList.add('dark');

    return;
  }

  removeData() {
    return localStorage.getItem('data') ? localStorage.removeItem('data') : '';
  }

  init = (game) => {
    this.game = game;

    this.handleKeyClick();
    this.handleEvents();

    window.addEventListener('beforeunload', () => this.saveData());
  }
}

export default BoardControl