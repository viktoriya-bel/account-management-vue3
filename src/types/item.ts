import type { ItemType } from '@/enums/item';

export type ItemView = {
  label: string;
  type: ItemType;
  login: string;
  password: string;
};
