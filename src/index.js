function eval() {
    // Do not use eval!!!
    return;
}

function checkZero(expr) {
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === "/" && expr[i + 1] === '0') {
            throw 'TypeError: Division by zero.';
        }
    }
}

function checkBrackets(expr) {
    let leftBrackets = expr.filter(el => el == '(').length
    let rightBrackets = expr.filter(el => el == ')').length

    if (leftBrackets != rightBrackets) {
        throw 'ExpressionError: Brackets must be paired';
    }
}

function calc(prev, operator, next) {
    switch (operator) {
        case '+':
            return Number(prev) + Number(next);
        case '-':
            return prev - next;
        case '*':
            return prev * next;
        case '/':
            return prev / next;
    }
}

function expressionCalculator(expr) {
    let exprArr = expr.replace(/\s/g, '').split('');
    checkBrackets(exprArr);
    checkZero(exprArr);

    let newStr = '';

    exprArr.forEach(element => (/\d/.test(element)) ? newStr += element : newStr += ' ' + element + ' ');

    let newArr = newStr.split(' ').filter(el => el !== '');

    if (!newArr.includes('(') && !newArr.includes(')')) {
        let prev;
        let next;
        let operator;

        while (newArr.includes('/')) {
            for (let i = 0; i < newArr.length; i++) {
                (newArr[i] === '/') ? newArr.splice(i - 1, 3, calc(newArr[i - 1], newArr[i], newArr[i + 1])): false;
            }
        }

        while (newArr.includes('*')) {
            for (let i = 0; i < newArr.length; i++) {
                (newArr[i] === '*') ? newArr.splice(i - 1, 3, calc(newArr[i - 1], newArr[i], newArr[i + 1])): false;
            }
        }

        for (let i = 0; i < newArr.length; i++) {
            if (i === 0 && /\d/.test(newArr[i])) {
                prev = Number(newArr[i])
            } else {
                if (/[\-\+]/.test(newArr[i])) {
                    operator = newArr[i];
                    next = newArr[i + 1];
                    prev = calc(prev, operator, next);
                }
            }
        }
        return prev;
    }

    console.log(newArr);
}

module.exports = {
    expressionCalculator
}