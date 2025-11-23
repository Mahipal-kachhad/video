import { JSX, forwardRef } from "react";
import { DoubleSide, Texture, Mesh } from "three";

type Props = JSX.IntrinsicElements["mesh"] & {
  texture: Texture;
  opacity: number;
};

const SphereModel = forwardRef<Mesh, Props>(({ texture, opacity, ...props }, ref) => {
  return (
    <mesh ref={ref} {...props} scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 60, 40]} />
      <meshBasicMaterial 
        side={DoubleSide} 
        map={texture} 
        transparent={true} 
        opacity={opacity} 
        depthWrite={false}
        depthTest={true}
        toneMapped={false}
      />
    </mesh>
  );
});

export default SphereModel;