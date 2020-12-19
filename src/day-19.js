const parseRule = (definition) => {
  const [, id, ruleRaw] = /(\d+): ((?:(?:\d+\s?)+ \| (?:\d+\s?)+)|(?:\d+\s?)+|(?:"a"|"b"))/.exec(
    definition
  );

  if (ruleRaw === '"a"' || ruleRaw === '"b"') {
    return { id: Number(id), rule: ruleRaw.replace(/\"/g, ''), rulesets: null };
  }

  const rulesets = ruleRaw.split(' | ').map((rule) => rule.split(' ').map(Number));

  return { id: Number(id), rule: null, rulesets };
};

const getData = (input) => {
  const [rules, messages] = input.split('\n\n');
  return {
    rules: rules
      .split('\n')
      .map(parseRule)
      .reduce((acc, rule) => {
        acc[rule.id] = rule;
        return acc;
      }, {}),
    messages: messages.split('\n'),
  };
};

const cartesian = (...a) => a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

const resolveRule = (id, rules) => {
  const { rule, rulesets } = rules[id];
  if (rule) {
    return [rule];
  } else {
    return rulesets
      .map((ruleset) => ruleset.map((rule) => resolveRule(rule, rules)))
      .map((options) => {
        if (options.every((i) => typeof i === 'string')) return options.join('');
        return cartesian(...options);
      })
      .flat();
  }
};

// bad solution but it's valid, will probably completely rewrite it considering part 2
const puzzle1 = (input) => {
  const { rules, messages } = getData(input);
  const validMessages = resolveRule(0, rules).map(i => i.join(''));
  return messages.filter((message) => validMessages.includes(message)).length;
};

const puzzle2 = (input) => {};

module.exports = {
  puzzle1,
  puzzle2,
};
