import { BoxGeometry, CylinderGeometry } from 'three';

export const hex = new CylinderGeometry(1, 1, 1, 6, 1, false, Math.PI / 2, 2 * Math.PI);
export const blankSpace = new CylinderGeometry(1, 1, 0.0, 6, 1, false, Math.PI / 2, 2 * Math.PI);
