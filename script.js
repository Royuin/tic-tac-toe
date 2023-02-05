const gameboardModule = (() => {
  const board = [];

  function makeBoard() {
    const body = document.querySelector('body');
    const wrapper = document.createElement('div');
    body.appendChild(wrapper);
    wrapper.classList = 'gameboard-wrapper';

    for (let i = 0; i < 9; i += 1) {
      const square = wrapper.appendChild(document.createElement('div'));
      square.classList = 'square';
      square.dataset.index = i;
    }
  }

  makeBoard(board);

  return board;
})();

function playerFactory(name, marker) {
  return { name, marker };
}

const player1 = playerFactory('player1', 'X');
const player2 = playerFactory('Player2', 'O');

const gameFunctions = (() => {
  const startBtn = document.querySelector('.start');

  function textEventListener(element, currentPlayer) {
    element.addEventListener('click', () => {
      const thisElement = element;
      thisElement.textContent = currentPlayer.marker;
    });
  }

  function squareSelectorLoop(currentPlayer) {
    for (let i = 0; i < 9; i += 1) {
      const currentSquare = gameboardModule[i];
      if (
        currentSquare.textContent !== 'X' &&
        currentSquare.textContent !== 'O'
      ) {
        textEventListener(currentSquare, currentPlayer);
      }
    }
  }

  startBtn.addEventListener('click', () => {
    const currentPlayer = player1;
    squareSelectorLoop(currentPlayer);
  });
})();
