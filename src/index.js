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

function noBrackets(newArr) {
  let prev;
  let next;
  let operator;

  while (newArr.includes('/')) {
    console.log(newArr);
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
      prev = newArr[i];
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

function expressionCalculator(expr) {
  let exprArr = expr.replace(/\s/g, '').split('');
  checkBrackets(exprArr);
  checkZero(exprArr);

  let newStr = '';

  exprArr.forEach(element => (/\d/.test(element)) ? newStr += element : newStr += ' ' + element + ' ');

  let newArr = newStr.split(' ').filter(el => el !== '');

  if (!newArr.includes('(') && !newArr.includes(')')) {
    return noBrackets(newArr);
  } else {
    let arr = [];
    let result = 0;
    console.log(newArr);
    while (newArr.includes(')')) {
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i] === ')') {
          let positionStart = i - 1;
          let k = 2;
          while (newArr[i - 1] !== '(') {
            k++;
            arr.push(newArr[i - 1]);
            positionStart--;
            i--;
          }

          arr.reverse();
          result = noBrackets(arr);
          // console.log(positionStart, k, result);
          newArr.splice(positionStart, k, result);
          arr = [];
        }
      }
    }
    console.log(newArr);
    return noBrackets(newArr);
  }
}



// expressionCalculator('59-13+(25*22/(47/38*(64/ 93-91+72)*66)+43-5)*39/55');
// expressionCalculator('11-92+48/((12/92+(53/74/22+(61/24/42-(13*85+100/77/11)+89)+9)+87)/91*92)');

module.exports = {
  expressionCalculator
}