"use client";

import { useState, useEffect, useRef } from "react";
import { useAnimation } from "../context/AnimationContext";
import { FaceWhitOpenMouth, FaceWithSquintingEyes } from "../utils/Icons";
interface Face {
    id: number;
    x: number;
    delay: number;
    duration: number;
    rotation: number;
}

export default function FallingFacesAnimation() {
    const { isAnimating, isSmile } = useAnimation();
    const [faces, setFaces] = useState<Face[]>([]);

    useEffect(() => {
        if (isAnimating === 0) {
            setFaces([]);
            return;
        }

        const newFaces: Face[] = Array.from({ length: 10 }, (_, i) => ({
            id: Math.random() * 10000,
            x: i * 9 + 10,
            delay: Math.random() * 1,
            duration: 1 + Math.random() * 2,
            rotation: Math.random() * 360,
        }));

        setFaces(newFaces);
    }, [isAnimating]);

    if (!isAnimating) return null;

    return (
        <>
            {faces.map((face) => (
                <div
                    key={face.id}
                    className="falling-face text-8xl"
                    style={{
                        left: `${face.x}%`,
                        top: `-100px`,
                        animationDuration: `${face.duration}s`,
                        animationDelay: `${face.delay}s`,
                    }}
                >
                    {isSmile ? <FaceWithSquintingEyes /> : <FaceWhitOpenMouth />}
                </div>
            ))}

            {isSmile && (
                <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 transition-opacity duration-500"
                    style={{
                        animation: 'shrinkOverlay2 2s forwards 0.5s'
                    }}
                >
                </div>
            )}
        </>
    );
}