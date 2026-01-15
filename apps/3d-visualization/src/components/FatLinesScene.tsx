/* eslint-disable react/no-unknown-property */
import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import type { SceneParams } from '../App';
import { hilbert3D, generateSplinePoints, generateLineData } from '../utils/hilbert';

interface FatLinesSceneProps {
  params: SceneParams;
}

export default function FatLinesScene({ params }: FatLinesSceneProps) {
  const { size } = useThree();
  const matLineRef = useRef<LineMaterial | null>(null);

  // Generate the Hilbert curve data once
  const lineData = useMemo(() => {
    // Generate Hilbert curve points
    const hilbertPoints = hilbert3D(new THREE.Vector3(0, 0, 0), 20, 1);

    // Create smooth spline through the points
    const splinePoints = generateSplinePoints(hilbertPoints, 12);

    // Generate positions and colors
    return generateLineData(splinePoints);
  }, []);

  // Create Line2 geometry
  const line2Geometry = useMemo(() => {
    const geometry = new LineGeometry();
    geometry.setPositions(lineData.positions);
    geometry.setColors(lineData.colors);
    return geometry;
  }, [lineData]);

  // Create Line2 material - created once, updated via useEffect
  const line2Material = useMemo(() => {
    const material = new LineMaterial({
      color: 0xffffff,
      linewidth: 5,
      vertexColors: true,
      dashed: false,
      alphaToCoverage: true,
      worldUnits: false,
    });
    return material;
  }, []);

  // Create standard THREE.Line geometry for comparison
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(lineData.positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineData.colors, 3));
    return geometry;
  }, [lineData]);

  // Create standard line material
  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
    });
  }, []);

  // Create Line2 object
  const line2Object = useMemo(() => {
    return new Line2(line2Geometry, line2Material);
  }, [line2Geometry, line2Material]);

  // Create standard Line object
  const lineObject = useMemo(() => {
    return new THREE.Line(lineGeometry, lineMaterial);
  }, [lineGeometry, lineMaterial]);

  // Store material ref
  useEffect(() => {
    matLineRef.current = line2Material;
  }, [line2Material]);

  // Update material when params change
  useEffect(() => {
    if (matLineRef.current) {
      matLineRef.current.linewidth = params.width;
      matLineRef.current.dashed = params.dashed;
      matLineRef.current.alphaToCoverage = params.alphaToCoverage;
      matLineRef.current.worldUnits = params.worldUnits;

      if (params.dashed) {
        matLineRef.current.dashScale = params.dashScale;
        matLineRef.current.dashSize = 1;
        matLineRef.current.gapSize = params.dashGapSize;
      }

      matLineRef.current.needsUpdate = true;
    }
  }, [params]);

  // Update material resolution on every frame (needed for Line2)
  useFrame(() => {
    if (matLineRef.current) {
      matLineRef.current.resolution.set(size.width, size.height);
    }
  });

  // Set initial resolution
  useEffect(() => {
    if (matLineRef.current) {
      matLineRef.current.resolution.set(size.width, size.height);
    }
  }, [size]);

  return (
    <>
      <color attach="background" args={['#000']} />

      <OrbitControls enableDamping dampingFactor={0.25} minDistance={10} maxDistance={500} />

      {/* Fat Line (Line2) */}
      {params.lineType === 'Line2' && <primitive object={line2Object} />}

      {/* Standard gl.LINE */}
      {params.lineType === 'gl.LINE' && <primitive object={lineObject} />}
    </>
  );
}
