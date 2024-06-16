import ThreeHex from 'components/3d-hex/3d-hex.comp';
import PropertiesPanel from '../properties-panel/properties-panel.comp';
import Toolbar from '../toolbar/toolbar.comp';
import React from 'react';
import ComponentsPanel from '../components-panel/components-panel.comp';

export default function DungeonConfigurator() {
  return (
    <>
      <Toolbar />
      <ThreeHex />
      <ComponentsPanel />
      <PropertiesPanel />
    </>
  );
}
