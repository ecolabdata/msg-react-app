export type BaseResultCard = {
  id: string;
  score: number;
  highlight: Record<string, unknown>;
};

export type ReservedPublicMarkets = {
  label: string | null;
  code: string | null;
};

export type Department = {
  department: string | null;
};
