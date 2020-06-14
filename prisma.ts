export interface PrismaField {
  null?: true;
  id?: true;
  unique?: true;
  default?: unknown;
  relation?: {
    name?: string;
    references: string[];
  };
}
//json, array, string, int, float, boolean
