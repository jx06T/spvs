"use client";

import { createContext, useState, useRef, useContext, ReactNode } from "react";

type AnimationContextType = {
    triggerFallingFaces: (smile?: boolean) => void;
    isAnimating: number;
    isSmile: boolean;
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
    const [isAnimating, setIsAnimating] = useState<number>(0);
    const [isSmile, setIsSmile] = useState<boolean>(false);
    const animationTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    const triggerFallingFaces = (smile: boolean = false) => {
        setIsSmile(smile)
        setIsAnimating(isAnimating + 1);
        if (animationTimeoutId && animationTimeoutId.current) {
            clearTimeout(animationTimeoutId.current);
        }
        animationTimeoutId.current = setTimeout(() => {
            setIsAnimating(0)
        }, 4000);
    };

    return (
        <AnimationContext.Provider value={{ triggerFallingFaces, isAnimating, isSmile }}>
            {children}
        </AnimationContext.Provider>
    );
}

export function useAnimation() {
    const context = useContext(AnimationContext);
    if (context === undefined) {
        throw new Error("useAnimation must be used within an AnimationProvider");
    }
    return context;
}