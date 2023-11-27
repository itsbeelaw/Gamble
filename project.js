const prompt = require("prompt-sync") ();

const ROWS = 3;
const COLS = 3;

//object
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
}
//1. Deposit some money

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Welcome to Granny Gamble, the best slot machine of the South! Enter a deposit amount: $");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Please enter a number greater than 0")
        }
        else if (numberDepositAmount === 5) {
            console.log("Granny doesn't like the number 5. Choose a different number")
        }
        else {
            console.log("Whoa, big spender! Let me add this to your bank...")
            return numberDepositAmount;
        }
    }    
};

//2. Determine number of lines to bet on

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("How many slot rows are you betting on? (1-3)?: ");
        const numberLineAmount = parseInt(lines);

        if (isNaN(numberLineAmount) || ![1,2,3].includes(numberLineAmount)) {
            console.log("Pick a number between 1-3");
        }
        
        else {
            console.log("Got it!")
            return numberLineAmount;
        }
};
};
//3. Collect a bet amount

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("How much money do ya wanna bet per row, sug? $");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("We checked the bank and uh...choose a different number sug: ");
        } 
        
        else {
            console.log("Alright, let's spin!!")
            return numberBet;
        }
    }
};

//4. Spin the slot machine and transpose

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
        const reels = [];
        for (let i = 0; i < COLS; i++) {
            reels.push([]);
            const reelSymbols = [...symbols];
            for (let j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1);
            }
        }

        return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push ([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }

    return rows;
};

const printRows = (rows) => {
    for(const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

//5. Check if user won

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
};

const game = () => {
    let balance = deposit();

    while (true) {
        console.log("Balance = $" + balance);
        const numberLineAmount = getNumberOfLines ();
        const bet = getBet(balance, numberLineAmount);
        balance -= bet * numberLineAmount;
        const reels =spin();
        const rows = transpose(reels);
        printRows(rows);
//6. Give or take user winnings

        const winnings = getWinnings(rows, bet, numberLineAmount);
        balance += winnings;
        console.log("You won $" + winnings.toString());

        if (balance <=0) {
            console.log("You're all of out money, sug")
            break;
        }
//7. offer play again 

        const playAgain = prompt("Do you want to play again (y/n)? ");

        if (playAgain != "y") break;
    };
};

game();

