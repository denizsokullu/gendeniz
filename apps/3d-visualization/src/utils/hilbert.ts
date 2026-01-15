import * as THREE from 'three';

/**
 * Attempt to generate a Hilbert curve in 3D space using recursive algorithm
 * Based on Three.js GeometryUtils.hilbert3D
 */
export function hilbert3D(
  center: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
  size: number = 10,
  iterations: number = 1,
  v0: number = 0,
  v1: number = 1,
  v2: number = 2,
  v3: number = 3,
  v4: number = 4,
  v5: number = 5,
  v6: number = 6,
  v7: number = 7
): THREE.Vector3[] {
  const half = size / 2;

  const vec_s: [
    THREE.Vector3,
    THREE.Vector3,
    THREE.Vector3,
    THREE.Vector3,
    THREE.Vector3,
    THREE.Vector3,
    THREE.Vector3,
    THREE.Vector3,
  ] = [
    new THREE.Vector3(center.x - half, center.y + half, center.z - half),
    new THREE.Vector3(center.x - half, center.y + half, center.z + half),
    new THREE.Vector3(center.x - half, center.y - half, center.z + half),
    new THREE.Vector3(center.x - half, center.y - half, center.z - half),
    new THREE.Vector3(center.x + half, center.y - half, center.z - half),
    new THREE.Vector3(center.x + half, center.y - half, center.z + half),
    new THREE.Vector3(center.x + half, center.y + half, center.z + half),
    new THREE.Vector3(center.x + half, center.y + half, center.z - half),
  ];

  const vec: THREE.Vector3[] = [
    vec_s[v0 as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7],
    vec_s[v1 as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7],
    vec_s[v2 as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7],
    vec_s[v3 as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7],
    vec_s[v4 as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7],
    vec_s[v5 as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7],
    vec_s[v6 as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7],
    vec_s[v7 as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7],
  ];

  if (--iterations >= 0) {
    const tmp: THREE.Vector3[] = [];

    tmp.push(...hilbert3D(vec[0], half, iterations, v0, v3, v4, v7, v6, v5, v2, v1));
    tmp.push(...hilbert3D(vec[1], half, iterations, v0, v7, v6, v1, v2, v5, v4, v3));
    tmp.push(...hilbert3D(vec[2], half, iterations, v0, v7, v6, v1, v2, v5, v4, v3));
    tmp.push(...hilbert3D(vec[3], half, iterations, v2, v3, v0, v1, v6, v7, v4, v5));
    tmp.push(...hilbert3D(vec[4], half, iterations, v2, v3, v0, v1, v6, v7, v4, v5));
    tmp.push(...hilbert3D(vec[5], half, iterations, v4, v3, v2, v5, v6, v1, v0, v7));
    tmp.push(...hilbert3D(vec[6], half, iterations, v4, v3, v2, v5, v6, v1, v0, v7));
    tmp.push(...hilbert3D(vec[7], half, iterations, v6, v5, v2, v1, v0, v3, v4, v7));

    return tmp;
  }

  return vec;
}

/**
 * Generate a smooth spline curve from points using Catmull-Rom interpolation
 */
export function generateSplinePoints(
  controlPoints: THREE.Vector3[],
  divisions: number = 12
): THREE.Vector3[] {
  // Filter out any undefined values
  const validPoints = controlPoints.filter((p): p is THREE.Vector3 => p !== undefined);
  const spline = new THREE.CatmullRomCurve3(validPoints);
  return spline.getPoints(validPoints.length * divisions);
}

/**
 * Generate positions and colors arrays for line geometry
 */
export function generateLineData(points: THREE.Vector3[]): {
  positions: number[];
  colors: number[];
} {
  const positions: number[] = [];
  const colors: number[] = [];
  const color = new THREE.Color();

  // Filter out any undefined values
  const validPoints = points.filter((p): p is THREE.Vector3 => p !== undefined);
  const totalPoints = validPoints.length;

  validPoints.forEach((point, i) => {
    positions.push(point.x, point.y, point.z);

    // Generate rainbow colors along the line
    const t = i / (totalPoints - 1);
    color.setHSL(t, 1.0, 0.5);
    colors.push(color.r, color.g, color.b);
  });

  return { positions, colors };
}
