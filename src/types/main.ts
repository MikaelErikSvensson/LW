export type TableProps = {
  topRegions: Turnout[];
  regionNames: Name[];
};
export type Turnout = {
  code: string;
  year: string;
  percentage: number;
};
export type Region = Turnout & {
  name: string;
};
export type Name = {
  code: string;
  name: string;
};
