// utils/geometry.ts
import * as THREE from 'three';

/**
 * Generates points for a Cubic Bezier curve in 3D space.
 * @param start [x, y, z]
 * @param control1 [x, y, z] - The first "gravity" point
 * @param control2 [x, y, z] - The second "gravity" point
 * @param end [x, y, z]
 * @param segments How many points to generate (smoothness)
 */
export const getCubicCurve = (
  start: [number, number, number],
  control1: [number, number, number],
  control2: [number, number, number],
  end: [number, number, number],
  segments = 25
): [number, number, number][] => {
  const vStart = new THREE.Vector3(...start);
  const vControl1 = new THREE.Vector3(...control1);
  const vControl2 = new THREE.Vector3(...control2);
  const vEnd = new THREE.Vector3(...end);

  const curve = new THREE.CubicBezierCurve3(vStart, vControl1, vControl2, vEnd);
  
  return curve.getPoints(segments).map((v) => [v.x, v.y, v.z]);
};