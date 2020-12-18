import { Name, Region, Turnout } from '../types/main';

export const findTopRegions = (a: Turnout[]) => {
  const byYear = groupWith((x) => x.year, a);
  return maxPercentagePerKey(byYear).flatMap((x) => x[1]);
};

export const insertWith = <K, A>(f: (o: A, n: A) => A, v: A, k: K, m: Map<K, A>) => {
  let m2 = new Map(m);
  const old = m2.get(k);
  return old === undefined ? m2.set(k, v) : m2.set(k, f(old, v));
};

export const groupWith = <K, A>(f: (x: A) => K, a: A[]): Map<K, A[]> =>
  a.reduce((m, a) => insertWith((x, y) => x.concat(y), [a], f(a), m), new Map());

export const maxPercentagePerKey = (m: Map<string, Turnout[]>): Array<[string, Turnout[]]> => {
  const result: Array<[string, Turnout[]]> = [];
  m.forEach((v, k) => {
    const maxv = v.reduce((acc, curr) => (curr.percentage > acc.percentage ? curr : acc));
    const maxItems = v.filter((x) => x.percentage === maxv.percentage);
    result.push([k, maxItems]);
  });
  return result;
};

export const addRegionNames = (a: Turnout[], a2: Name[]) => {
  return a.map((x) => ({ ...a2.find((y) => y.code === x.code), ...x }));
};

export const joinTopRegions = (a: Region[]) => {
  const m: Map<string, Region[]> = groupWith((x) => x.year, a);
  const array = [];
  for (let value of m.values()) {
    const obj = value.map((x) => x.name).join(', ');
    array.push(
      value.map(function (x) {
        return {
          year: x.year,
          code: x.code,
          percentage: x.percentage,
          name: obj,
        };
      })
    );
  }
  return array.flat().filter((x, i, a) => i === a.findIndex((y) => y.year === x.year));
};
