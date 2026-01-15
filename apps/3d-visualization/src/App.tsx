import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import GUI from 'lil-gui';
import FatLinesScene from './components/FatLinesScene';

export interface SceneParams {
  lineType: 'Line2' | 'gl.LINE';
  worldUnits: boolean;
  width: number;
  alphaToCoverage: boolean;
  dashed: boolean;
  dashScale: number;
  dashGapSize: number;
}

const defaultParams: SceneParams = {
  lineType: 'Line2',
  worldUnits: false,
  width: 5,
  alphaToCoverage: true,
  dashed: false,
  dashScale: 1,
  dashGapSize: 1,
};

export default function App() {
  const guiRef = useRef<GUI | null>(null);
  const [params, setParams] = useState<SceneParams>(defaultParams);

  useEffect(() => {
    const gui = new GUI();
    guiRef.current = gui;

    const paramsObj = { ...defaultParams };

    gui
      .add(paramsObj, 'lineType', ['Line2', 'gl.LINE'])
      .onChange((value: SceneParams['lineType']) => {
        setParams((prev) => ({ ...prev, lineType: value }));
      });

    gui.add(paramsObj, 'worldUnits').onChange((value: boolean) => {
      setParams((prev) => ({ ...prev, worldUnits: value }));
    });

    gui.add(paramsObj, 'width', 1, 10).onChange((value: number) => {
      setParams((prev) => ({ ...prev, width: value }));
    });

    gui.add(paramsObj, 'alphaToCoverage').onChange((value: boolean) => {
      setParams((prev) => ({ ...prev, alphaToCoverage: value }));
    });

    gui.add(paramsObj, 'dashed').onChange((value: boolean) => {
      setParams((prev) => ({ ...prev, dashed: value }));
    });

    gui.add(paramsObj, 'dashScale', 0.5, 2).onChange((value: number) => {
      setParams((prev) => ({ ...prev, dashScale: value }));
    });

    gui
      .add(paramsObj, 'dashGapSize', 0.5, 2)
      .name('dash/gap')
      .onChange((value: number) => {
        setParams((prev) => ({ ...prev, dashGapSize: value }));
      });

    return () => {
      gui.destroy();
    };
  }, []);

  return (
    <>
      <div className="info">
        <a href="https://threejs.org" target="_blank" rel="noopener noreferrer">
          three.js
        </a>{' '}
        - fat lines - React version
      </div>
      <Canvas
        camera={{
          fov: 40,
          near: 1,
          far: 1000,
          position: [-40, 0, 60],
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        dpr={window.devicePixelRatio}
      >
        <FatLinesScene params={params} />
      </Canvas>
    </>
  );
}
