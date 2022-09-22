'use strict';

const assert = require('assert');
const readline = require('readline');
const colors = require('colors')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  var solutionArray = solution.split("") // 'abcd' => ['a', 'b', 'c', 'd']
  var guessArray = guess.split("")
  let correctLetterLocations = 0
  let correctLetters = 0
  let targetIndex
  let hint
  for (let i = 0; i < guessArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
        correctLetterLocations++
        solutionArray[i] = null
    }
  }
    
  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray.indexOf(guessArray[i]) != -1) {
      correctLetters++
    }
  }
  hint = `[${guess}] | ${colors.green(correctLetterLocations)}: Correct letter and spot. ${colors.red(correctLetters)}: Correct letter wrong spot.`
  board.push(hint)
  if (board.length > 9) {
    console.log(`${colors.red("YOU LOSE! The solution was: [" + solution + "]")}`)
  }
}

const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  if (guess === solution) {
    console.log("You guessed it!")
  } else {
    generateHint(guess)
  }
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}