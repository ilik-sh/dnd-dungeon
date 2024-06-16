import { MapControls } from '@react-three/drei';

export default function CustomControls() {
  return <MapControls mouseButtons={{ MIDDLE: 2 }} enableRotate={false} target={[4, 0, 5.2]} />;
}
