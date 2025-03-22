"use client";

import { useState, useEffect, useRef } from "react";
import { useAnimation } from "../context/AnimationContext";
import { FaceWhitOpenMouth, FaceWithSquintingEyes } from "../utils/Icons";

interface Face {
    x: number;
    y: number;
    vy: number;
    id: number;
    f: number;
    rotation: number;
}

export default function FallingFacesAnimation() {
    const { isAnimating, isSmile } = useAnimation();
    const animationFrameId = useRef<number | null>(null);
    const lastTime = useRef(Date.now());
    const [fallingFaces, setFallingFaces] = useState<Face[]>([]);

    const addFallingFace = () => {
        const newFallingFaces = Array.from({ length: 10 }, (_, i: number) => {
            return {
                id: Math.random() * 10000,
                x: i * 9 + 10,
                y: -20,
                f: Math.random() * -50,
                vy: 0.1,
                rotation: Math.random() * 360,
            }
        });

        setFallingFaces(prev => [...prev, ...newFallingFaces]);
    };

    useEffect(() => {
        if (isAnimating == 0) {
            setFallingFaces([]);
            return;
        }

        addFallingFace();
    }, [isAnimating]);

    useEffect(() => {
        if (!isAnimating || fallingFaces.length === 0) return;

        const updateFaces = () => {
            setFallingFaces(prev =>
                prev
                    .map(face => (
                        face.f > 0 ?
                            {
                                ...face,
                                y: face.y + face.vy,
                                vy: face.vy + 0.01 * (Date.now() - lastTime.current),
                                rotation: face.rotation + 1,
                            } : {
                                ...face,
                                f: face.f + 1
                            }))
                    .filter(face => face.y < 100)
            );

            lastTime.current = Date.now();
            animationFrameId.current = requestAnimationFrame(updateFaces);
        };

        animationFrameId.current = requestAnimationFrame(updateFaces);

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [isAnimating, fallingFaces.length]);

    if (!isAnimating) return null;

    return (
        <>
            {fallingFaces.map(face => (
                <div
                    key={face.id}
                    className="absolute text-8xl z-30 bg-black/30 rounded-full"
                    style={{
                        left: `${face.x}%`,
                        top: `${face.y}%`,
                        transform: `rotate(${face.rotation}deg)`,
                    }}
                >
                    {
                        isSmile ?
                            <FaceWithSquintingEyes /> :
                            <FaceWhitOpenMouth />
                    }
                </div>
            ))}
            {isSmile &&
                <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 transition-opacity duration-500"
                    style={{
                        animation: 'shrinkOverlay2 2s forwards 0.5s'
                    }}
                >
                </div>
            }
        </>
    );
}
