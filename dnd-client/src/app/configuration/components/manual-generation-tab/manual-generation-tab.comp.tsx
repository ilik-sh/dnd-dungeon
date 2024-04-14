import ConfigureMap from './configure-map.comp';
import Sidebar from '../sidebar/sidebar.comp';

import ThreeHex from 'components/3d-hex/3d-hex.comp';
import Toolbar from '../toolbar/toolbar.comp';

type Props = {};

export default function ManualGenerationTab({}: Props) {
  return (
    <>
      <Toolbar />
      <ConfigureMap />
      <div style={{ width: '80%', height: '800px' }}>
        <ThreeHex />
      </div>
      <Sidebar />
    </>
  );
}
