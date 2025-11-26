// src/data/catalogue/types.ts

export interface CatalogueGame {
  id: string;
  name: string;
  slug: string;
  shortName: string;
  icon: string;
  coverImage: string;
  primaryColor: string;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
  hasBlueprint: boolean;
}
