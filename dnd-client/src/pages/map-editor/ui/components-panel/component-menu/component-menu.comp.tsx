import React from 'react';

import { CellDto } from 'entities/cell';

import ExpandableMenuItem from './expandable-menu-item.comp';
import MenuItem from './menu-item.comp';

type ComponentMenuProps = {
  components: CellDto[];
};

export default function ComponentMenu({ components }: ComponentMenuProps) {
  return (
    <>
      {components.map((component, index) => {
        if (!component) return null;
        if (component.rooms && component.rooms.length > 0) {
          return <ExpandableMenuItem cell={component} key={index} title={'Cell ' + (index + 1)} />;
        }
        return <MenuItem title={component.id} key={index} />;
      })}
    </>
  );
}
