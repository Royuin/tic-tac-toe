const gameboardModule = (() => {
  const gameboard = {
    board: [],
  };

  function makeBoard(Array) {
    const body = document.querySelector('body');
    const wrapper = document.createElement('div');
    body.appendChild(wrapper);
    wrapper.classList = 'gameboard-wrapper';

    for (let i = 0; i < 9; i += 1) {
      const square = wrapper.appendChild(document.createElement('div'));
      square.classList = 'square';
      square.dataset.index = i;
      Array.push(square);
    }
  }

  makeBoard(gameboard.board);

  gameboard.board[4].textContent = 'O';
  gameboard.board[1].textContent = 'X';

  return gameboard.board;
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

  startBtn.addEventListener('click', () => {
    const currentPlayer = player1;
  });
})();
