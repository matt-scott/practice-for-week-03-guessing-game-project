const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

let secretNumber;
let numAttempts;

let randomInRange = function (min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}


let checkGuess = function (num) {
    if (num > secretNumber) {
        console.log('Too high.');
        return false;
    }
    else if (num < secretNumber) {
        console.log('Too low.');
        return false;
    }
    else {
        console.log('Correct!');
        return true;
    }
};


const askGuess = function () {
    rl.question('Enter a guess: ', (answer) => {
    let num = Number(answer);
    let checker = checkGuess(num);
    numAttempts--;

    if (checker === true) {
        console.log('You win!')
        rl.close();
    }
    else {
        if (numAttempts === 0) {
            console.log('You lose.');
            rl.close();
        }
        else {
            askGuess();
        }
    }

  });
};

let askRange = function () {
    rl.question('Enter a min number: ', (answerOne) => {

        rl.question ('Enter a max number: ', (answerTwo) => {
            console.log("I'm thinking of a number between " + answerOne + " and " + answerTwo + "...");
            let firstNum = Number(answerOne);
            let secondNum = Number(answerTwo);

            secretNumber = randomInRange(firstNum, secondNum);
            askGuess();
        })

    })
}

let askLimit = function () {
    rl.question('Enter a turn limit for the game: ', (answer) => {
        numAttempts = Number(answer);
        askRange();
    })
}

askLimit();
