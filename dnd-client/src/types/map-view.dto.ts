import { Creator } from './creator.dto';

export type MapView = {
  id: string;
  name: string;
  thumbnailUrl: string;
  createdAt: string;
  creator: Creator;
  tags: string[];
};
