import { CellDto } from 'app/configuration/types/cell.dto';
import React from 'react';
import ExpandableMenuItem from './expandable-menu-item.comp';
import MenuItem from './menu-item.comp';

type ComponentMenuProps = {
  components: CellDto[];
};

export default function ComponentMenu({ components }: ComponentMenuProps) {
  return (
    <>
      {components.map((component, index) =>
        component.rooms && component.rooms.length > 0 ? (
          <ExpandableMenuItem cell={component} key={index} title={'Cell ' + (index + 1)} />
        ) : (
          <MenuItem title={component.id} key={index} />
        ),
      )}
    </>
  );
}
