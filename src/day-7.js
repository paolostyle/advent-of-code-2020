const getRuleset = (input) =>
  input.split('\n').map((rule) => {
    const [, parent, children] = /^(\w+ \w+) bags contain (.*)\.$/.exec(rule);
    if (children === 'no other bags') return { name: parent, children: [] };
    const childrenData = children.split(', ').map((child) => {
      const [, amount, name] = /^(\d) (\w+ \w+) bags?$/.exec(child);
      return { name, amount: parseInt(amount, 10) };
    });
    return { name: parent, children: childrenData };
  });

const traverse = (ruleset, ruleName) =>
  ruleset
    .find((rule) => rule.name === ruleName)
    .children.reduce((sum, child) => {
      sum += child.amount + child.amount * traverse(ruleset, child.name);
      return sum;
    }, 0);

const puzzle1 = (input) => {
  const ruleset = getRuleset(input);
  let usedBags = new Set();
  let currentBags = ['shiny gold'];

  // well... couldn't come up with something less imperative
  while (currentBags.length) {
    currentBags = ruleset
      .filter(
        (rule) => rule.children.filter((childRule) => currentBags.includes(childRule.name)).length
      )
      .map((rule) => rule.name);

    currentBags.forEach((bag) => usedBags.add(bag));
  }

  return usedBags.size;
};

const puzzle2 = (input) => traverse(getRuleset(input), 'shiny gold');

module.exports = {
  puzzle1,
  puzzle2,
};
