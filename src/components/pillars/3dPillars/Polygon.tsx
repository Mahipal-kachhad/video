"use client";

import { useMemo, useRef, useState, useLayoutEffect } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Line2 } from "three-stdlib";

interface PolygonProps {
  points: [number, number, number][];
  borderColor?: string;
  fillColor?: string;
  fillOpacity?: number;
  target?: string;
  onClick?: () => void;
}

export default function Polygon({
  points,
  borderColor = "#ff0000",
  fillColor = "#000000",
  fillOpacity = 0.1,
  target,
  onClick,
}: PolygonProps) {
  const [hovered, setHover] = useState(false);

  // Refs
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<Line2>(null);
  const lastQuat = useRef(new THREE.Quaternion());
  const fadeState = useRef(0);

  // 1. Geometry Setup (unchanged)
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array(points.flat());
    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    const indices = [];
    for (let i = 1; i < points.length - 1; i++) {
      indices.push(0, i, i + 1);
    }
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [points]);

  const linePoints = useMemo(() => {
    if (points.length === 0) return [];
    const vectors = points.map((p) => new THREE.Vector3(...p));
    vectors.push(vectors[0]);
    return vectors;
  }, [points]);

  useLayoutEffect(() => {
    if (lineRef.current && lineRef.current.material) {
      const mat = lineRef.current.material as any;

      mat.transparent = true;
      mat.depthWrite = false; 
      mat.toneMapped = false;
      mat.needsUpdate = true;
    }
  }, [linePoints]);
  useFrame((state, delta) => {
    const angleDiff = state.camera.quaternion.angleTo(lastQuat.current);
    lastQuat.current.copy(state.camera.quaternion);
    const isMoving = angleDiff > 0.0001;

    const targetOpacity = hovered || isMoving ? 1 : 0;
    fadeState.current = THREE.MathUtils.lerp(
      fadeState.current,
      targetOpacity,
      delta * 5
    );

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = fillOpacity * fadeState.current;
      mat.visible = true;
    }

    if (lineRef.current && lineRef.current.material) {
      const mat = lineRef.current.material as any;
      mat.opacity = 1 * fadeState.current;
      mat.visible = mat.opacity > 0.01;
    }
  });

  useMemo(() => {
    if (typeof document !== "undefined") {
      document.body.style.cursor = hovered && onClick ? "pointer" : "auto";
    }
  }, [hovered, onClick]);

  if (points.length < 3) return null;

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHover(false);
      }}
      renderOrder={2}
    >
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial
          color={fillColor}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthTest={true}
          depthWrite={false}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      <Line
        ref={lineRef}
        points={linePoints}
        color={borderColor}
        lineWidth={1.5}
        polygonOffset={true}
        polygonOffsetFactor={-4}
        polygonOffsetUnits={-4}
      />
    </group>
  );
}
