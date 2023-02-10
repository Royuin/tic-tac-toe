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

  function updateGameboard() {
    for (let i = 0; i < 9; i += 1) {
      const currentSquare = document.querySelector(`[data-index='${i}']`);

      currentSquare.textContent = board[i];
    }
  }

  return { board, updateGameboard };
})();

function playerFactory(name, marker) {
  return { name, marker };
}

let player1;
let player2;

const addPlayersBtn = document.querySelector('.add-players');
const form = document.querySelector('form');
addPlayersBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const p1 = document.getElementById('p1').value;
  const p2 = document.getElementById('p2').value;
  player1 = playerFactory(p1, 'X');
  player2 = playerFactory(p2, 'O');
  if (form.style.display !== 'none') {
    form.style.display = 'none';
  } else {
    form.style.display = 'grid';
  }
});

const gameFunctions = (() => {
  const gameInfo = {
    currentPlayer: undefined,
    winner: undefined,
  };
  const startBtn = document.querySelector('.start');

  function checkForWinner() {
    const display = document.querySelector('.display');
    const array = gameboardModule.board;
    const p1Marker = player1.marker;
    const p2Marker = player2.marker;
    if (
      (array[0] === p1Marker &&
        array[1] === p1Marker &&
        array[2] === p1Marker) ||
      (array[0] === p1Marker &&
        array[4] === p1Marker &&
        array[8] === p1Marker) ||
      (array[0] === p1Marker &&
        array[3] === p1Marker &&
        array[6] === p1Marker) ||
      (array[1] === p1Marker &&
        array[4] === p1Marker &&
        array[7] === p1Marker) ||
      (array[2] === p1Marker &&
        array[5] === p1Marker &&
        array[8] === p1Marker) ||
      (array[2] === p1Marker &&
        array[4] === p1Marker &&
        array[6] === p1Marker) ||
      (array[3] === p1Marker &&
        array[4] === p1Marker &&
        array[5] === p1Marker) ||
      (array[6] === p1Marker && array[7] === p1Marker && array[8] === p1Marker)
    ) {
      gameInfo.winner = player1;
      display.textContent = `${gameInfo.winner.name} wins!`;
    }
    if (
      (array[0] === p2Marker &&
        array[1] === p2Marker &&
        array[2] === p2Marker) ||
      (array[0] === p2Marker &&
        array[4] === p2Marker &&
        array[8] === p2Marker) ||
      (array[0] === p2Marker &&
        array[3] === p2Marker &&
        array[6] === p2Marker) ||
      (array[1] === p2Marker &&
        array[4] === p2Marker &&
        array[7] === p2Marker) ||
      (array[2] === p2Marker &&
        array[5] === p2Marker &&
        array[8] === p2Marker) ||
      (array[2] === p2Marker &&
        array[4] === p2Marker &&
        array[6] === p2Marker) ||
      (array[3] === p2Marker &&
        array[4] === p2Marker &&
        array[5] === p2Marker) ||
      (array[6] === p2Marker && array[7] === p2Marker && array[8] === p2Marker)
    ) {
      gameInfo.winner = player2;
      display.textContent = `${gameInfo.winner.name} wins!`;
    } else if (
      (array[0] === p1Marker || array[0] === p2Marker) &&
      (array[1] === p1Marker || array[1] === p2Marker) &&
      (array[2] === p1Marker || array[2] === p2Marker) &&
      (array[3] === p1Marker || array[3] === p2Marker) &&
      (array[4] === p1Marker || array[4] === p2Marker) &&
      (array[5] === p1Marker || array[5] === p2Marker) &&
      (array[6] === p1Marker || array[6] === p2Marker) &&
      (array[7] === p1Marker || array[7] === p2Marker) &&
      (array[8] === p1Marker || array[8] === p2Marker)
    ) {
      gameInfo.winner = null;
      display.textContent = 'Tie game!';
    }
  }

  function takeTurnEventListener(element, index) {
    element.addEventListener('click', () => {
      if (gameInfo.winner !== undefined) {
        return;
      }
      if (
        gameboardModule.board[index] !== 'X' &&
        gameboardModule.board[index] !== 'O'
      ) {
        gameboardModule.board[index] = gameInfo.currentPlayer.marker;
        gameboardModule.updateGameboard();
        if (gameInfo.currentPlayer === player1) {
          gameInfo.currentPlayer = player2;
        } else if (gameInfo.currentPlayer === player2) {
          gameInfo.currentPlayer = player1;
        }
      }
      checkForWinner();
    });
  }

  function squareSelectorLoop() {
    let currentSquare;
    for (let i = 0; i < 9; i += 1) {
      currentSquare = document.querySelector(`[data-index='${i}']`);
      const index = currentSquare.dataset.index;
      takeTurnEventListener(currentSquare, index);
    }
  }

  startBtn.addEventListener('click', () => {
    gameInfo.winner = undefined;
    gameboardModule.board.length = 0;
    gameboardModule.updateGameboard();
    document.querySelector('.display').textContent = '';
    gameInfo.currentPlayer = player1;
    squareSelectorLoop(gameInfo.currentPlayer);
  });
})();
