function randomPosition(max) {
  return Math.floor(Math.random() * max + 0.999999);
}

function randomWithWeight(table) {
  const total = table.reduce((acc, t) => t.weight + acc, 0);
  const random = Math.floor(Math.random() * total + 0.999999);

  const { index } = table.reduce((prev, curr, currIndex) => {
    if (prev.index) return prev;

    const mod = prev.mod - curr.weight;
    if (mod <= 0) {
      return {
        index: currIndex,
        mod,
      };
    }

    return {
      ...prev,
      mod,
    };
  }, { index: undefined, mod: random });

  return index;
}

module.exports = { randomPosition, randomWithWeight };
