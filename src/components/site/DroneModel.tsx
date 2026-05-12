'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ------------------------------------------------------------------ */
/*  Materials — Physical for premium clearcoat look                   */
/* ------------------------------------------------------------------ */
const carbonShell = {
  color: '#0c0c10',
  roughness: 0.45,
  metalness: 0.25,
  clearcoat: 0.85,
  clearcoatRoughness: 0.18,
  envMapIntensity: 1.2,
}

const matteBlack = {
  color: '#08080a',
  roughness: 0.78,
  metalness: 0.15,
  clearcoat: 0.2,
  clearcoatRoughness: 0.6,
}

const polishedMetal = {
  color: '#2a2a30',
  roughness: 0.12,
  metalness: 1,
  envMapIntensity: 1.4,
}

const champagne = {
  color: '#c9a96a',
  roughness: 0.18,
  metalness: 1,
  envMapIntensity: 1.6,
}

const rubber = {
  color: '#050505',
  roughness: 0.95,
  metalness: 0,
}

/* ------------------------------------------------------------------ */
/*  Screw — tiny detail that sells realism                            */
/* ------------------------------------------------------------------ */
function Screw({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.0055, 0.0055, 0.003, 12]} />
        <meshPhysicalMaterial color="#1a1a1f" roughness={0.35} metalness={0.95} />
      </mesh>
      {/* Phillips slot */}
      <mesh position={[0, 0.0018, 0]}>
        <boxGeometry args={[0.008, 0.0005, 0.0012]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[0, 0.0018, 0]}>
        <boxGeometry args={[0.0012, 0.0005, 0.008]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  PropellerBlade — twisted airfoil                                  */
/* ------------------------------------------------------------------ */
function PropellerBlade({ length = 0.38 }: { length?: number }) {
  // Build a twisted blade by stacking thin extruded segments along length
  const geometry = useMemo(() => {
    const segments = 12
    const positions: number[] = []
    const indices: number[] = []

    // Build a ribbon strip with twist
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const x = t * length
      const chord = 0.05 * (1 - t * 0.55) // taper
      const twist = (1 - t) * 0.55 // root twists more
      const ca = Math.cos(twist)
      const sa = Math.sin(twist)

      // Two points across chord (leading and trailing edges)
      // Leading edge (front)
      const yL = ca * (-chord * 0.35)
      const zL = sa * (-chord * 0.35)
      // Trailing edge (back) — slightly thinner
      const yT = ca * (chord * 0.65)
      const zT = sa * (chord * 0.65)

      positions.push(x, yL, zL)
      positions.push(x, yT, zT)
    }

    // Build quads (2 triangles per quad)
    for (let i = 0; i < segments; i++) {
      const a = i * 2
      const b = a + 1
      const c = a + 2
      const d = a + 3
      indices.push(a, b, d)
      indices.push(a, d, c)
      // back faces for solidity
      indices.push(a, d, b)
      indices.push(a, c, d)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()
    return geo
  }, [length])

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial color="#15151a" roughness={0.42} metalness={0.35} clearcoat={0.4} clearcoatRoughness={0.4} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Propeller — motor + spinning blades                               */
/* ------------------------------------------------------------------ */
function Propeller({ position, spin = 1 }: { position: [number, number, number]; spin?: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 28 * spin
  })

  return (
    <group position={position}>
      {/* Motor stator housing — outer can */}
      <mesh position={[0, -0.025, 0]}>
        <cylinderGeometry args={[0.058, 0.062, 0.05, 32]} />
        <meshPhysicalMaterial {...polishedMetal} />
      </mesh>
      {/* Motor coil ring — copper-ish */}
      <mesh position={[0, -0.012, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.018, 32]} />
        <meshPhysicalMaterial color="#5a3e1f" roughness={0.55} metalness={0.85} />
      </mesh>
      {/* Motor magnets line */}
      <mesh position={[0, -0.025, 0]}>
        <torusGeometry args={[0.061, 0.001, 8, 48]} />
        <meshPhysicalMaterial {...champagne} />
      </mesh>
      {/* Motor cap (bell rotor) */}
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.045, 0.054, 0.025, 32]} />
        <meshPhysicalMaterial color="#1a1a20" roughness={0.22} metalness={1} envMapIntensity={1.3} />
      </mesh>
      {/* Cap top recess */}
      <mesh position={[0, 0.029, 0]}>
        <cylinderGeometry args={[0.035, 0.04, 0.003, 32]} />
        <meshPhysicalMaterial color="#0a0a0c" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Spinning prop assembly */}
      <group ref={ref} position={[0, 0.036, 0]}>
        {/* Hub */}
        <mesh>
          <cylinderGeometry args={[0.014, 0.018, 0.012, 24]} />
          <meshPhysicalMaterial color="#3a3a40" roughness={0.15} metalness={1} envMapIntensity={1.4} />
        </mesh>
        {/* Hub cap screw */}
        <mesh position={[0, 0.007, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.003, 12]} />
          <meshPhysicalMaterial {...champagne} />
        </mesh>
        {/* 3 twisted blades */}
        <group rotation={[0, 0, 0]}>
          <PropellerBlade />
        </group>
        <group rotation={[0, (Math.PI * 2) / 3, 0]}>
          <PropellerBlade />
        </group>
        <group rotation={[0, (Math.PI * 4) / 3, 0]}>
          <PropellerBlade />
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Arm — single horizontal carbon tube                               */
/* ------------------------------------------------------------------ */
function Arm({ angle, length = 0.5 }: { angle: number; length?: number }) {
  return (
    <group rotation={[0, angle, 0]}>
      {/* Main carbon tube — horizontal */}
      <mesh position={[length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.028, length, 24]} />
        <meshPhysicalMaterial {...carbonShell} />
      </mesh>
      {/* Subtle champagne stripe along top */}
      <mesh position={[length / 2, 0.018, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.004, 0.004, length * 0.85, 12]} />
        <meshPhysicalMaterial {...champagne} />
      </mesh>
      {/* Root collar where arm meets body */}
      <mesh position={[0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.032, 0.032, 0.045, 24]} />
        <meshPhysicalMaterial {...polishedMetal} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  GimbalCamera — 2-axis yoke + lens hood                            */
/* ------------------------------------------------------------------ */
function GimbalCamera() {
  return (
    <group position={[0.225, -0.07, 0]}>
      {/* Vertical yoke (U-shape) — left arm */}
      <mesh position={[-0.005, 0.005, 0.045]}>
        <boxGeometry args={[0.025, 0.06, 0.008]} />
        <meshPhysicalMaterial {...polishedMetal} />
      </mesh>
      {/* Vertical yoke — right arm */}
      <mesh position={[-0.005, 0.005, -0.045]}>
        <boxGeometry args={[0.025, 0.06, 0.008]} />
        <meshPhysicalMaterial {...polishedMetal} />
      </mesh>
      {/* Yoke top connector */}
      <mesh position={[-0.005, 0.035, 0]}>
        <boxGeometry args={[0.025, 0.008, 0.085]} />
        <meshPhysicalMaterial {...polishedMetal} />
      </mesh>

      {/* Pivot motors (left/right) */}
      <mesh position={[-0.005, -0.005, 0.038]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.008, 16]} />
        <meshPhysicalMaterial color="#2a2a30" roughness={0.2} metalness={1} />
      </mesh>
      <mesh position={[-0.005, -0.005, -0.038]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.008, 16]} />
        <meshPhysicalMaterial color="#2a2a30" roughness={0.2} metalness={1} />
      </mesh>

      {/* Camera body — rounded box */}
      <mesh position={[0.005, -0.005, 0]}>
        <boxGeometry args={[0.075, 0.055, 0.065]} />
        <meshPhysicalMaterial {...carbonShell} />
      </mesh>
      {/* Camera body underside chamfer */}
      <mesh position={[0.005, -0.033, 0]}>
        <boxGeometry args={[0.068, 0.008, 0.058]} />
        <meshPhysicalMaterial {...matteBlack} />
      </mesh>

      {/* Lens housing (cylinder) */}
      <mesh position={[0.05, -0.005, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.024, 0.028, 0.038, 32]} />
        <meshPhysicalMaterial color="#1a1a1f" roughness={0.15} metalness={1} envMapIntensity={1.3} />
      </mesh>
      {/* Lens hood — slightly larger ring at front */}
      <mesh position={[0.07, -0.005, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.026, 0.024, 0.008, 32]} />
        <meshPhysicalMaterial color="#0a0a0c" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Champagne lens ring */}
      <mesh position={[0.063, -0.005, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.0235, 0.002, 12, 48]} />
        <meshPhysicalMaterial {...champagne} />
      </mesh>
      {/* Glass lens — transmissive */}
      <mesh position={[0.073, -0.005, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 0.004, 32]} />
        <meshPhysicalMaterial
          color="#050510"
          roughness={0.02}
          metalness={0}
          transmission={0.85}
          ior={1.6}
          thickness={0.01}
          envMapIntensity={1.8}
        />
      </mesh>
      {/* Inner lens reflection */}
      <mesh position={[0.066, -0.005, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.014, 0.014, 0.002, 32]} />
        <meshStandardMaterial color="#1a2030" emissive="#0a1422" emissiveIntensity={0.4} roughness={0.1} metalness={0.3} />
      </mesh>

      {/* Camera label area — micro detail */}
      <mesh position={[0.005, 0.018, 0.034]}>
        <boxGeometry args={[0.04, 0.005, 0.001]} />
        <meshPhysicalMaterial {...champagne} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Antenna with rubber base                                          */
/* ------------------------------------------------------------------ */
function Antenna({ position, height = 0.085 }: { position: [number, number, number]; height?: number }) {
  return (
    <group position={position}>
      {/* Base puck */}
      <mesh position={[0, -0.004, 0]}>
        <cylinderGeometry args={[0.012, 0.014, 0.008, 16]} />
        <meshPhysicalMaterial {...matteBlack} />
      </mesh>
      {/* Shaft */}
      <mesh position={[0, height / 2 + 0.005, 0]}>
        <cylinderGeometry args={[0.0035, 0.0045, height, 12]} />
        <meshPhysicalMaterial color="#1a1a1f" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Champagne tip */}
      <mesh position={[0, height + 0.011, 0]}>
        <sphereGeometry args={[0.0075, 16, 16]} />
        <meshPhysicalMaterial {...champagne} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Fuselage Top Shell — sculpted with LatheGeometry                  */
/* ------------------------------------------------------------------ */
function FuselageTop() {
  // Build a smooth tapered top profile rotated around X-axis (manually orient)
  // We'll instead build a custom rounded-rectangle extrude with a bevel profile
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    const w = 0.18
    const h = 0.115
    const r = 0.06
    s.moveTo(-w + r, -h)
    s.lineTo(w - r, -h)
    s.quadraticCurveTo(w, -h, w, -h + r)
    s.lineTo(w, h - r)
    s.quadraticCurveTo(w, h, w - r, h)
    s.lineTo(-w + r, h)
    s.quadraticCurveTo(-w, h, -w, h - r)
    s.lineTo(-w, -h + r)
    s.quadraticCurveTo(-w, -h, -w + r, -h)
    return s
  }, [])

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.05,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.012,
      bevelThickness: 0.012,
      curveSegments: 24,
    }),
    [],
  )

  return (
    <group rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.045, 0]}>
      <mesh>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshPhysicalMaterial {...carbonShell} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Fuselage Belly — chamfered underside                              */
/* ------------------------------------------------------------------ */
function FuselageBelly() {
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    const w = 0.155
    const h = 0.1
    const r = 0.045
    s.moveTo(-w + r, -h)
    s.lineTo(w - r, -h)
    s.quadraticCurveTo(w, -h, w, -h + r)
    s.lineTo(w, h - r)
    s.quadraticCurveTo(w, h, w - r, h)
    s.lineTo(-w + r, h)
    s.quadraticCurveTo(-w, h, -w, h - r)
    s.lineTo(-w, -h + r)
    s.quadraticCurveTo(-w, -h, -w + r, -h)
    return s
  }, [])

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.008,
      bevelThickness: 0.008,
      curveSegments: 16,
    }),
    [],
  )

  return (
    <group rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -0.02, 0]}>
      <mesh>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshPhysicalMaterial {...matteBlack} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Nose Cone — smooth aerodynamic                                    */
/* ------------------------------------------------------------------ */
function NoseCone({ flip = false }: { flip?: boolean }) {
  // LatheGeometry — true rotational nose
  const points = useMemo(() => {
    const pts: THREE.Vector2[] = []
    const N = 16
    for (let i = 0; i <= N; i++) {
      const t = i / N
      // Smooth bell curve
      const r = Math.sin(t * Math.PI * 0.5) * 0.06
      const y = t * 0.11
      pts.push(new THREE.Vector2(r, y))
    }
    return pts
  }, [])

  return (
    <group
      position={[flip ? -0.18 : 0.18, 0.025, 0]}
      rotation={[0, 0, flip ? Math.PI / 2 : -Math.PI / 2]}
    >
      <mesh>
        <latheGeometry args={[points, 32]} />
        <meshPhysicalMaterial {...carbonShell} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Main DroneModel                                                    */
/* ------------------------------------------------------------------ */
export default function DroneModel() {
  const droneRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (droneRef.current) {
      const t = state.clock.elapsedTime
      droneRef.current.position.y = Math.sin(t * 1.1) * 0.05
      droneRef.current.rotation.y = t * 0.2
      droneRef.current.rotation.x = Math.sin(t * 0.7) * 0.025
      droneRef.current.rotation.z = Math.sin(t * 0.9) * 0.018
    }
  })

  const armConfigs = [
    { angle: Math.PI * 0.25, propPos: [0.4, 0.025, 0.4] as [number, number, number], spin: 1 },
    { angle: -Math.PI * 0.25, propPos: [0.4, 0.025, -0.4] as [number, number, number], spin: -1 },
    { angle: Math.PI * 0.75, propPos: [-0.4, 0.025, 0.4] as [number, number, number], spin: -1 },
    { angle: -Math.PI * 0.75, propPos: [-0.4, 0.025, -0.4] as [number, number, number], spin: 1 },
  ]

  // Screw positions on top center panel
  const screwPositions: [number, number, number][] = [
    [0.13, 0.08, 0.08],
    [0.13, 0.08, -0.08],
    [-0.13, 0.08, 0.08],
    [-0.13, 0.08, -0.08],
    [0, 0.08, 0.09],
    [0, 0.08, -0.09],
  ]

  return (
    <group ref={droneRef} scale={1.15} castShadow receiveShadow>
      {/* ── FUSELAGE ── */}
      <FuselageTop />
      <FuselageBelly />
      <NoseCone />
      <NoseCone flip />

      {/* Carbon weave center panel */}
      <mesh position={[0, 0.078, 0]}>
        <boxGeometry args={[0.26, 0.004, 0.16]} />
        <meshPhysicalMaterial color="#0a0a0d" roughness={0.55} metalness={0.4} clearcoat={0.9} clearcoatRoughness={0.25} />
      </mesh>

      {/* Champagne accent stripe — centerline */}
      <mesh position={[0, 0.0805, 0]}>
        <boxGeometry args={[0.24, 0.0015, 0.006]} />
        <meshPhysicalMaterial {...champagne} />
      </mesh>

      {/* Panel separation line (longitudinal) */}
      <mesh position={[0, 0.079, 0]}>
        <boxGeometry args={[0.28, 0.001, 0.0008]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      {/* Panel separation line (transverse) */}
      <mesh position={[0, 0.079, 0]}>
        <boxGeometry args={[0.0008, 0.001, 0.18]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      {/* Screws on top panel */}
      {screwPositions.map((pos, i) => (
        <Screw key={i} position={pos} />
      ))}

      {/* Side intake vents — left & right */}
      {[0.085, -0.085].map((z, i) => (
        <group key={i}>
          {[0.06, 0, -0.06].map((x, j) => (
            <mesh key={j} position={[x, 0.048, z]}>
              <boxGeometry args={[0.04, 0.005, 0.004]} />
              <meshStandardMaterial color="#020203" />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── BATTERY PACK ── */}
      <mesh position={[-0.045, -0.06, 0]}>
        <boxGeometry args={[0.24, 0.04, 0.17]} />
        <meshPhysicalMaterial color="#08080a" roughness={0.55} metalness={0.35} clearcoat={0.4} clearcoatRoughness={0.5} />
      </mesh>
      {/* Battery release latch */}
      <mesh position={[-0.16, -0.06, 0]}>
        <boxGeometry args={[0.018, 0.022, 0.05]} />
        <meshPhysicalMaterial {...polishedMetal} />
      </mesh>
      {/* Battery contact indicator */}
      <mesh position={[-0.045, -0.082, 0]}>
        <boxGeometry args={[0.2, 0.0015, 0.003]} />
        <meshPhysicalMaterial {...champagne} />
      </mesh>
      {/* Battery LEDs (4 small) */}
      {[-0.04, -0.014, 0.012, 0.038].map((x, i) => (
        <mesh key={i} position={[x, -0.082, 0.01]}>
          <sphereGeometry args={[0.003, 8, 8]} />
          <meshStandardMaterial color="#fff8e0" emissive="#fff8e0" emissiveIntensity={1.8} />
        </mesh>
      ))}

      {/* ── FRONT SENSORS ── */}
      {/* Sensor housing cluster */}
      <mesh position={[0.25, 0.015, 0]}>
        <boxGeometry args={[0.02, 0.038, 0.085]} />
        <meshPhysicalMaterial color="#050508" roughness={0.15} metalness={0.6} clearcoat={0.7} clearcoatRoughness={0.3} />
      </mesh>
      {/* Stereoscopic obstacle sensors (twin glass) */}
      {[0.028, -0.028].map((z, i) => (
        <group key={i}>
          <mesh position={[0.261, 0.015, z]}>
            <sphereGeometry args={[0.01, 16, 16]} />
            <meshPhysicalMaterial color="#0a0a14" roughness={0.05} metalness={0.2} transmission={0.6} ior={1.5} thickness={0.005} envMapIntensity={1.4} />
          </mesh>
          {/* Sensor ring */}
          <mesh position={[0.262, 0.015, z]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.009, 0.0012, 8, 24]} />
            <meshPhysicalMaterial color="#2a2a30" roughness={0.2} metalness={1} />
          </mesh>
        </group>
      ))}

      {/* Status LED (warm white pulse) */}
      <mesh position={[0, 0.083, 0.075]}>
        <sphereGeometry args={[0.004, 12, 12]} />
        <meshStandardMaterial color="#fff5e0" emissive="#fff5e0" emissiveIntensity={2.5} />
      </mesh>
      {/* Rear nav LED (red) */}
      <mesh position={[-0.18, 0.04, 0]}>
        <sphereGeometry args={[0.005, 12, 12]} />
        <meshStandardMaterial color="#ff3a3a" emissive="#ff3a3a" emissiveIntensity={2} />
      </mesh>

      {/* ── CAMERA GIMBAL ── */}
      <GimbalCamera />

      {/* ── ARMS ── */}
      {armConfigs.map((cfg, i) => (
        <Arm key={i} angle={cfg.angle} />
      ))}

      {/* ── PROPELLERS ── */}
      {armConfigs.map((cfg, i) => (
        <Propeller key={i} position={cfg.propPos} spin={cfg.spin} />
      ))}

      {/* ── LANDING GEAR ── */}
      {([0.13, -0.13] as const).map((z, i) => (
        <group key={i}>
          {/* Skid bar */}
          <mesh position={[0, -0.105, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.008, 0.008, 0.22, 16]} />
            <meshPhysicalMaterial color="#15151a" roughness={0.4} metalness={0.7} clearcoat={0.4} />
          </mesh>
          {/* Rubber pads at ends */}
          {([0.09, -0.09] as const).map((x, j) => (
            <mesh key={j} position={[x, -0.115, z]}>
              <cylinderGeometry args={[0.013, 0.011, 0.008, 16]} />
              <meshPhysicalMaterial {...rubber} />
            </mesh>
          ))}
          {/* Struts */}
          {([0.058, -0.058] as const).map((x, j) => (
            <mesh key={j} position={[x, -0.075, z]} rotation={[0, 0, x > 0 ? -0.08 : 0.08]}>
              <cylinderGeometry args={[0.0045, 0.0055, 0.06, 12]} />
              <meshPhysicalMaterial color="#15151a" roughness={0.35} metalness={0.75} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── ANTENNAS ── */}
      <Antenna position={[-0.165, 0.075, 0.09]} />
      <Antenna position={[-0.165, 0.075, -0.09]} />
    </group>
  )
}
