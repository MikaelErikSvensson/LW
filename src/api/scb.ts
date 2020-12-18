import turnoutQuery from './turnoutQuery';
import { Name, Turnout } from '../types/main';

export const fetchTurnout = async (url: string) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      query: turnoutQuery,
      response: { format: 'json' },
    }),
  });
  return response.json();
};

export const parseTurnout = (turnoutResponse: any): Turnout | undefined => {
  const code = turnoutResponse.key[0];
  const year = turnoutResponse.key[1];
  const percentage = parseFloat(turnoutResponse.values[0]);
  if (code === undefined || year === undefined || percentage === undefined) {
    return undefined;
  } else {
    return { code, year, percentage };
  }
};

export const getRegionTurnout = async (url: string): Promise<Turnout[] | undefined> => {
  const response = await fetchTurnout(url);
  const result: Turnout[] = response.data.map((x: any) => parseTurnout(x));
  return result;
};

export const fetchNames = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export const parseNames = (namesResponse: any): Name | undefined => {
  const code = namesResponse[0];
  const name = namesResponse[1];
  if (code === undefined || name === undefined) {
    return undefined;
  } else {
    return { code, name };
  }
};

export const getRegionNames = async (url: string): Promise<Name[] | undefined> => {
  const response = await fetchNames(url);
  const namesAndCodes = response.variables[0].values.map((e: number, i: number) => [
    e,
    response.variables[0].valueTexts[i],
  ]);
  const result: Name[] = namesAndCodes.map((x: any) => parseNames(x));
  return result;
};
