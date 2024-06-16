import { RoomDto } from 'types/room.dto';

export interface RoomChildDto extends RoomDto {
  parentId: string;
}
