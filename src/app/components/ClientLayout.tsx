"use client";

import { AnimationProvider } from "../context/AnimationContext";
import FallingFacesAnimation from "./FallingFacesAnimation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <AnimationProvider>
            <FallingFacesAnimation />
            {children}
        </AnimationProvider>
    );
}