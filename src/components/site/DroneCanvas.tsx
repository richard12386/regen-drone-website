'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, SMAA, BrightnessContrast, HueSaturation } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

const DroneModel = dynamic(() => import('./DroneModel'), { ssr: false })

interface DroneCanvasProps {
  className?: string
  interactive?: boolean
}

export default function DroneCanvas({ className = '', interactive = false }: DroneCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [1.5, 0.85, 1.8], fov: 36 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        dpr={[1, 2]}
        shadows
      >
        {/* Warm key light from upper right (golden hour feel) */}
        <directionalLight
          position={[4, 6, 3]}
          intensity={1.2}
          color="#ffe8c8"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />
        {/* Cool fill from left */}
        <directionalLight
          position={[-4, 2, -1]}
          intensity={0.45}
          color="#a8b4c8"
        />
        {/* Rim light from behind */}
        <directionalLight
          position={[-2, 3, -4]}
          intensity={0.7}
          color="#fff0d0"
        />
        {/* Soft top fill */}
        <directionalLight
          position={[0, 8, 0]}
          intensity={0.3}
          color="#ffffff"
        />
        {/* Ambient */}
        <ambientLight intensity={0.12} color="#8a92a6" />

        <Suspense fallback={null}>
          <DroneModel />
          {/* Warehouse env gives varied reflections — windows + metal + concrete */}
          <Environment preset="warehouse" environmentIntensity={0.85} />
          <ContactShadows
            position={[0, -0.6, 0]}
            opacity={0.55}
            scale={5}
            blur={3}
            far={2}
            color="#000000"
            resolution={1024}
          />
        </Suspense>

        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.1}
            rotateSpeed={0.45}
          />
        )}

        {/* Post-processing — cinematic finish */}
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.85}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
          <BrightnessContrast brightness={0.0} contrast={0.06} />
          <HueSaturation hue={0} saturation={-0.05} />
          <Vignette
            offset={0.35}
            darkness={0.6}
            blendFunction={BlendFunction.NORMAL}
          />
          <SMAA />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
