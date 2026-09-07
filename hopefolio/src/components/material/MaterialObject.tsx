'use client';

import { useEffect, useRef } from 'react';
import type { MaterialForm } from './knot-geometry';

export interface MaterialObjectProps {
  form: MaterialForm;
  exploded: boolean;
  rotation: [number, number];
  progress: number;
  reducedMotion: boolean;
  ambient?: boolean;
  zoom?: number;
  onReady?: (backend: 'webgpu' | 'webgl') => void;
  onCaptureReady?: (capture: () => Promise<string>) => void;
  onError?: () => void;
}

type ThreeModule = typeof import('three/webgpu');

/** A local studio with demand rendering, or a restrained ambient motion mode. */
export default function MaterialObject(props: MaterialObjectProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const latest = useRef(props);
  const invalidate = useRef<() => void>(() => undefined);

  useEffect(() => {
    latest.current = props;
    invalidate.current();
  }, [props]);

  useEffect(() => {
    const element = hostRef.current;
    if (!element) return;
    const host = element;
    const ambient = Boolean(props.ambient);
    const cameraDistance = ambient ? 8.7 : 8.3;

    let disposed = false;
    let started = false;
    let visible = false;
    let frame = 0;
    let canvas: HTMLCanvasElement | undefined;
    let releaseScene: (() => void) | undefined;
    let draw: (() => void) | undefined;
    let resize: (() => void) | undefined;

    function stop() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (canvas) canvas.dataset.motion = 'settled';
    }

    function schedule() {
      if (!disposed && visible && !document.hidden && draw && !frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          draw?.();
        });
      }
    }

    invalidate.current = schedule;

    async function initialize() {
      if (started || disposed) return;
      started = true;
      let renderer: InstanceType<ThreeModule['WebGPURenderer']> | undefined;
      let initializingRenderer = false;
      const resources: { dispose: () => void }[] = [];
      const own = <T extends { dispose: () => void }>(resource: T): T => {
        resources.push(resource);
        return resource;
      };
      const release = () => {
        renderer?.domElement.remove();
        // Adapter requests and shader compilation cannot be cancelled. Retain
        // their resources until they settle, including after React unmounts.
        if (initializingRenderer) return;
        for (const resource of resources.splice(0)) resource.dispose();
        if (renderer) {
          if (renderer.hasInitialized()) renderer.dispose();
          renderer = undefined;
        }
      };
      releaseScene = release;

      try {
        const [THREE, { createRibbonGeometry }] = await Promise.all([
          import('three/webgpu'),
          import('./knot-geometry'),
        ]);
        if (disposed) return;

        renderer = new THREE.WebGPURenderer({
          antialias: true,
          alpha: true,
          forceWebGL: !('gpu' in navigator && navigator.gpu),
          powerPreference: 'low-power',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, ambient ? 0.85 : window.innerWidth < 600 ? 1.5 : 1.75));
        renderer.setClearColor(0x141513, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = ambient ? 0.8 : 0.88;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        canvas = renderer.domElement;
        canvas.dataset.motion = 'settled';
        canvas.dataset.renderCount = '0';
        renderer.domElement.className = 'material-object-canvas';
        renderer.domElement.setAttribute('aria-hidden', 'true');
        Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
        host.appendChild(renderer.domElement);

        // init() performs Three's WebGPU adapter check and WebGL2 fallback.
        initializingRenderer = true;
        try {
          await renderer.init();
        } finally {
          initializingRenderer = false;
        }
        if (disposed) { release(); return; }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
        camera.position.set(0, 0.05, cameraDistance);
        const sculpture = new THREE.Group();
        scene.add(sculpture);

        // A reflected photographic studio, separate from the visible scene.
        const studio = new THREE.Scene();
        studio.background = new THREE.Color(0x383c36);
        const wallGeometry = own(new THREE.PlaneGeometry(1, 1));
        function softbox(color: number, intensity: number, position: [number, number, number], size: [number, number]) {
          const material = own(new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide }));
          const panel = new THREE.Mesh(wallGeometry, material);
          panel.position.set(...position);
          panel.scale.set(size[0], size[1], 1);
          panel.lookAt(0, 0, 0);
          studio.add(panel);
        }
        softbox(0xf5f6ef, 2.7, [-4, 3, 4], [1.8, 5]);
        softbox(0xd9e3e7, 2.2, [4, 1, 2], [1, 4.5]);
        softbox(0xffffff, 3.5, [0, 5, -1], [5, 0.8]);
        softbox(0x899b79, 0.8, [-3, -2, -3], [3, 2]);
        softbox(0xf5ede0, 1.2, [1, -3, 3], [4, 0.5]);
        const pmrem = own(new THREE.PMREMGenerator(renderer));
        const environment = own(pmrem.fromScene(studio, 0.025, 0.1, 30, { size: 128 }));
        scene.environment = environment.texture;
        scene.environmentIntensity = ambient ? 0.85 : 0.95;

        const silver = own(new THREE.MeshPhysicalMaterial({
          color: 0xb6bdb2,
          metalness: 1,
          roughness: ambient ? 0.38 : 0.34,
          clearcoat: ambient ? 0.06 : 0.12,
          clearcoatRoughness: 0.35,
          envMapIntensity: 1.1,
          vertexColors: true,
        }));
        const paleSilver = own(silver.clone());
        paleSilver.color.set(0xc5cabe);
        paleSilver.roughness = ambient ? 0.36 : 0.32;
        const graphite = own(silver.clone());
        graphite.color.set(0x899285);
        graphite.roughness = ambient ? 0.4 : 0.36;
        // Match the form reflections used by material-atmosphere.css. Colors
        // are blended in Three's linear working space with the shape weights.
        const inlayColors = {
          knot: new THREE.Color(0xb7f34a),
          weave: new THREE.Color(0xa1b79b),
          bridge: new THREE.Color(0xd6a965),
          orbit: new THREE.Color(0xd6e1c7),
        };
        const inlay = own(new THREE.MeshPhysicalMaterial({
          color: inlayColors.knot,
          metalness: 0.3,
          roughness: 0.27,
          emissive: inlayColors.knot.clone().multiplyScalar(0.55),
          emissiveIntensity: ambient ? 0.22 : 0.3,
          clearcoat: 0.6,
        }));
        const groups: InstanceType<ThreeModule['Group']>[] = [];
        const meshes: InstanceType<ThreeModule['Mesh']>[] = [];
        for (let strand = 0; strand < 3; strand++) {
          const group = new THREE.Group();
          const ribbon = new THREE.Mesh(own(createRibbonGeometry(strand)), [paleSilver, silver, graphite][strand]);
          group.add(ribbon);
          meshes.push(ribbon);
          if (strand === 1) {
            const trace = new THREE.Mesh(own(createRibbonGeometry(strand, true)), inlay);
            group.add(trace);
            meshes.push(trace);
          }
          sculpture.add(group);
          groups.push(group);
        }

        scene.add(new THREE.HemisphereLight(0xf2f4e7, 0x272d26, 0.65));
        const key = new THREE.DirectionalLight(0xf6f4e9, ambient ? 1.15 : 1.5);
        key.position.set(-3, 5, 4);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xb7c8d2, ambient ? 0.9 : 1.1);
        rim.position.set(4, -1, -2);
        scene.add(rim);

        const state = { x: 0.16, y: -0.36, progress: 0, exploded: 0, weave: 0, orbit: 0, bridge: 0, zoom: 1 };
        resize = () => {
          if (!renderer || disposed) return;
          const width = Math.max(host.clientWidth, 1);
          const height = Math.max(host.clientHeight, 1);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          // Protect the silhouette in portrait embeds without changing geometry.
          camera.position.z = cameraDistance * Math.max(1, 0.91 / camera.aspect) / state.zoom;
          camera.updateProjectionMatrix();
          schedule();
        };
        resize();

        initializingRenderer = true;
        try {
          await renderer.compileAsync(scene, camera);
        } finally {
          initializingRenderer = false;
        }
        if (disposed) { release(); return; }

        let renderCount = 0;
        let renderMotion: 'ambient' | 'settled' | 'interacting' = 'settled';
        const recordRender = () => {
          if (!canvas) return;
          canvas.dataset.motion = renderMotion;
          canvas.dataset.renderCount = String(++renderCount);
        };
        const capture = async () => {
          if (disposed || !renderer) throw new Error('The material study is no longer available.');
          const activeRenderer = renderer;
          const pixelRatio = activeRenderer.getPixelRatio();
          const aspect = camera.aspect;
          const cameraDistance = camera.position.z;
          stop();
          try {
            activeRenderer.setPixelRatio(1);
            activeRenderer.setSize(1200, 1200, false);
            activeRenderer.setClearColor(0x080806, 0);
            camera.aspect = 1;
            camera.position.z = 8.3 / state.zoom;
            camera.updateProjectionMatrix();
            // Serialize in the same task as render, before either backend can
            // discard its presented buffer. No preserveDrawingBuffer is needed.
            activeRenderer.render(scene, camera);
            recordRender();
            return activeRenderer.domElement.toDataURL('image/png');
          } finally {
            activeRenderer.setPixelRatio(pixelRatio);
            activeRenderer.setClearColor(0x141513, 0);
            camera.aspect = aspect;
            camera.position.z = cameraDistance;
            camera.updateProjectionMatrix();
            resize?.();
            activeRenderer.render(scene, camera);
            recordRender();
            schedule();
          }
        };

        let previousTime = 0;
        let ambientTime = 0;
        let nextAmbientFrame = 0;
        const ambientFrameDuration = 1000 / 24;
        let ready = false;
        draw = () => {
          if (!renderer || disposed || !visible || document.hidden) return;
          const current = latest.current;
          const now = performance.now();
          const ambientMoving = ambient && !current.reducedMotion;
          if (ambientMoving) {
            if (now < nextAmbientFrame) { schedule(); return; }
            // Retain the fractional remainder, yielding 24 renders per second
            // on both 60Hz and 120Hz displays rather than rounding down to 20.
            nextAmbientFrame = nextAmbientFrame
              ? now + ambientFrameDuration - ((now - nextAmbientFrame) % ambientFrameDuration)
              : now + ambientFrameDuration;
          } else nextAmbientFrame = 0;
          const dt = previousTime ? Math.min((now - previousTime) / 1000, 0.05) : 1 / 60;
          previousTime = now;
          // Advance only while actually visible so returning to a tab does not
          // jump the atmospheric object forward through an unseen animation.
          if (ambientMoving) ambientTime += dt;
          const damping = current.reducedMotion ? 1 : 1 - Math.exp(-dt * 10);
          const progress = Math.max(0, Math.min(1, current.progress));
          const targets = {
            x: 0.16 + current.rotation[0],
            y: -0.36 + current.rotation[1],
            progress,
            exploded: current.exploded ? 1 : 0,
            weave: current.form === 'weave' ? 1 : 0,
            orbit: current.form === 'orbit' ? 1 : 0,
            bridge: current.form === 'bridge' ? 1 : 0,
            zoom: Math.max(0.8, Math.min(1.4, current.zoom ?? 1)),
          };
          let unsettled = false;
          for (const name of Object.keys(state) as (keyof typeof state)[]) {
            const delta = targets[name] - state[name];
            if (Math.abs(delta) > 0.0005 && damping < 1) {
              state[name] += delta * damping;
              unsettled = true;
            } else state[name] = targets[name];
          }
          camera.position.z = cameraDistance * Math.max(1, 0.91 / camera.aspect) / state.zoom;
          const breathX = ambientMoving ? Math.sin(ambientTime * Math.PI * 2 / 23) * 0.018 : 0;
          const breathY = ambientMoving ? Math.sin(ambientTime * Math.PI * 2 / 29) * 0.025 : 0;
          const breathScale = ambientMoving ? Math.sin(ambientTime * Math.PI * 2 / 19) * 0.004 : 0;
          sculpture.rotation.set(state.x + state.progress * 0.16 + breathX, state.y + state.progress * 0.28 + breathY, -0.2 + state.progress * 0.09);
          sculpture.scale.setScalar((1 - state.exploded * 0.1) * (ambient ? 0.98 + breathScale : 1));
          for (let i = 0; i < groups.length; i++) {
            const lane = i - 1;
            groups[i].position.set(lane * state.exploded * 0.44, lane * state.exploded * 0.13, lane * state.exploded * 0.68);
            groups[i].rotation.y = lane * state.exploded * 0.11;
          }
          for (const mesh of meshes) {
            if (mesh.morphTargetInfluences) {
              mesh.morphTargetInfluences[0] = state.weave;
              mesh.morphTargetInfluences[1] = state.orbit;
              mesh.morphTargetInfluences[2] = state.bridge;
            }
          }
          const knotWeight = Math.max(0, 1 - state.weave - state.bridge - state.orbit);
          inlay.color.setRGB(
            inlayColors.knot.r * knotWeight + inlayColors.weave.r * state.weave + inlayColors.bridge.r * state.bridge + inlayColors.orbit.r * state.orbit,
            inlayColors.knot.g * knotWeight + inlayColors.weave.g * state.weave + inlayColors.bridge.g * state.bridge + inlayColors.orbit.g * state.orbit,
            inlayColors.knot.b * knotWeight + inlayColors.weave.b * state.weave + inlayColors.bridge.b * state.bridge + inlayColors.orbit.b * state.orbit,
          );
          inlay.emissive.copy(inlay.color).multiplyScalar(0.55);
          try {
            renderMotion = ambientMoving ? 'ambient' : unsettled ? 'interacting' : 'settled';
            renderer.render(scene, camera);
            recordRender();
            if (!ready) {
              ready = true;
              renderer.domElement.dataset.ready = 'true';
              const backend = renderer.backend as typeof renderer.backend & { isWebGPUBackend?: boolean };
              latest.current.onReady?.(backend.isWebGPUBackend ? 'webgpu' : 'webgl');
              if (!ambient) latest.current.onCaptureReady?.(capture);
            }
            if (unsettled || ambientMoving) schedule();
          } catch {
            draw = undefined;
            stop();
            release();
            latest.current.onError?.();
          }
        };
        schedule();
      } catch {
        release();
        if (!disposed) latest.current.onError?.();
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        void initialize();
        schedule();
      } else stop();
    }, { threshold: 0.01 });
    observer.observe(host);
    const resizeObserver = new ResizeObserver(() => resize?.());
    resizeObserver.observe(host);
    const onVisibility = () => document.hidden ? stop() : schedule();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      invalidate.current = () => undefined;
      releaseScene?.();
    };
  }, [props.ambient]);

  return <div ref={hostRef} aria-hidden="true" className="material-object-renderer" style={{ position: 'absolute', inset: 0 }} />;
}
