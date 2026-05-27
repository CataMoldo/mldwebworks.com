"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BeamsBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5,
        angle: angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        hue: 190 + Math.random() * 70,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
    };
}

export function BeamsBackground({
    className,
    children,
    intensity = "strong",
}: BeamsBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const [isDark, setIsDark] = useState(true);
    const MINIMUM_BEAMS = 20;

    const opacityMap = {
        subtle: 0.7,
        medium: 0.85,
        strong: 1,
    };

    useEffect(() => {
        const checkTheme = () => setIsDark(document.documentElement.classList.contains("dark"));
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            const totalBeams = MINIMUM_BEAMS * 1.5;
            beamsRef.current = Array.from({ length: totalBeams }, () =>
                createBeam(canvas.width, canvas.height)
            );
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);
            
            // LOGICA ACCENTUATĂ PENTRU LIGHT MODE
            // Pe Dark: luminozitate 65% (neon). Pe Light: 15% (contrast înalt).
            const lightness = isDark ? "65%" : "15%";
            
            // Creștem opacitatea de bază pe Light mode pentru a le face vizibile
            const baseOpacity = isDark ? beam.opacity : beam.opacity * 2.5;
            const pulsingOpacity = baseOpacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity];
            
            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

            gradient.addColorStop(0, `hsla(${beam.hue}, 85%, ${lightness}, 0)`);
            gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, ${lightness}, ${pulsingOpacity * 0.5})`);
            gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, ${lightness}, ${pulsingOpacity})`);
            gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, ${lightness}, ${pulsingOpacity})`);
            gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, ${lightness}, ${pulsingOpacity * 0.5})`);
            gradient.addColorStop(1, `hsla(${beam.hue}, 85%, ${lightness}, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = "blur(35px)";
            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;
                if (beam.y + beam.length < -100) {
                    const column = index % 3;
                    const spacing = canvas.width / 3;
                    beam.y = canvas.height + 100;
                    beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
                }
                drawBeam(ctx, beam);
            });
            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();
        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            cancelAnimationFrame(animationFrameRef.current);
            observer.disconnect();
        };
    }, [intensity, isDark]);

    return (
        <div className={cn("relative w-full min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500", className)}>
            <canvas ref={canvasRef} className="fixed inset-0" />
            {/* Overlay-ul este puțin mai opac în Light mode pentru a ajuta la contrastul elementelor */}
            <div className="fixed inset-0 bg-white/70 dark:bg-neutral-950/40 backdrop-blur-[2px] transition-colors duration-500" />
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}