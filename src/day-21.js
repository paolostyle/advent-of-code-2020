const getIngredientsAndAllergens = (input) => {
  const rows = input.split('\n');
  const knownAllergens = rows.map((row) => row.split('contains ')[1].slice(0, -1).split(', '));
  const ingredients = rows.map((row) => row.split(' (')[0].split(' '));

  return { knownAllergens, ingredients };
};

const uniqueFlat = (nestedArray) => Array.from(new Set(nestedArray.flat()));

const getCandidates = (knownAllergens, ingredients) =>
  uniqueFlat(knownAllergens).reduce((acc, allergen) => {
    const indexesToCheck = knownAllergens.reduce((indexes, row, index) => {
      if (row.includes(allergen)) {
        indexes.push(index);
      }
      return indexes;
    }, []);

    const uniqueIngredients = indexesToCheck.reduce(
      (acc, index) => acc.filter((ingredient) => ingredients[index].includes(ingredient)),
      ingredients[indexesToCheck[0]]
    );

    acc[allergen] = uniqueIngredients;
    return acc;
  }, {});

const puzzle1 = (input) => {
  const { knownAllergens, ingredients } = getIngredientsAndAllergens(input);
  const candidatesBreakdown = getCandidates(knownAllergens, ingredients);
  const candidates = uniqueFlat(Object.values(candidatesBreakdown));

  return ingredients.flat().reduce((acc, allergen) => {
    if (candidates.includes(allergen)) return acc;
    return acc + 1;
  }, 0);
};

const puzzle2 = (input) => {
  const { knownAllergens, ingredients } = getIngredientsAndAllergens(input);
  const candidatesBreakdown = Object.entries(getCandidates(knownAllergens, ingredients));
  const sortFn = (a, b) => a[1].length - b[1].length;
  const matches = [];

  candidatesBreakdown.sort(sortFn);

  while (candidatesBreakdown.length) {
    const [allergen, [matchedIngredient]] = candidatesBreakdown[0];
    matches.push([allergen, matchedIngredient]);

    candidatesBreakdown.shift();
    candidatesBreakdown.forEach((item) => {
      item[1] = item[1].filter((ingredient) => ingredient !== matchedIngredient);
    });

    if (candidatesBreakdown[0]?.[1].length !== 1) {
      candidatesBreakdown.sort(sortFn);
    }
  }

  return matches
    .sort()
    .map((pair) => pair[1])
    .join(',');
};

module.exports = {
  puzzle1,
  puzzle2,
};
