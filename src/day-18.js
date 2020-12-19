const getInput = (input) => input.split('\n');

const bracketExpression = /\([\d\s\+\*]+\)/g;
const bracketsMatch = /\(|\)/g;
const addition = /\d+ \+ \d+/g;

const simpleEvaluator = (expression) =>
  expression.split(' ').reduce(
    (acc, digitOrOperator) => {
      if (['*', '+'].includes(digitOrOperator)) {
        acc.currentOperator = digitOrOperator;
      } else {
        if (acc.currentOperator === '+') {
          acc.currentValue = acc.currentValue + Number(digitOrOperator);
        } else if (acc.currentOperator === '*') {
          acc.currentValue = acc.currentValue * Number(digitOrOperator);
        } else {
          acc.currentValue = Number(digitOrOperator);
        }
        acc.currentOperator = null;
      }

      return acc;
    },
    { currentValue: null, currentOperator: null }
  ).currentValue;

const getExpressionEvaluator = (regExp, replacer, finalEvaluator) => (expression) => {
  let simplifiedExpression = expression;
  while (simplifiedExpression.match(regExp)) {
    simplifiedExpression = simplifiedExpression.replace(regExp, replacer);
  }
  return finalEvaluator(simplifiedExpression);
};

const removeBrackets = (val) => val.replace(bracketsMatch, '');

const sum = (input, evaluator) =>
  getInput(input).reduce((sum, expression) => evaluator(expression) + sum, 0);

const puzzle1 = (input) => {
  const evaluator = getExpressionEvaluator(
    bracketExpression,
    (val) => simpleEvaluator(removeBrackets(val)),
    simpleEvaluator
  );

  return sum(input, evaluator);
};

const puzzle2 = (input) => {
  const additionEvaluator = getExpressionEvaluator(addition, simpleEvaluator, simpleEvaluator);
  const evaluator = getExpressionEvaluator(
    bracketExpression,
    (val) => additionEvaluator(removeBrackets(val)),
    additionEvaluator
  );

  return sum(input, evaluator);
};

module.exports = {
  puzzle1,
  puzzle2,
};
