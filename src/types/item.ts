import type { ItemType } from '@/enums/item';

export type ItemView = {
  label: string;
  type: ItemType;
  login: string;
  password: string | null;
};

export interface ItemStore extends Omit<ItemView, 'label'> {
  label: { text: string }[];
}
