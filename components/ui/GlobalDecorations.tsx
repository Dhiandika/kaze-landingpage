"use client";

import { motion } from "framer-motion";

export default function GlobalDecorations() {
    return (
        <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden opacity-60 dark:opacity-30 dark:mix-blend-screen">
            {/* Tech Grid Overlay - Restored */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* Asymmetrical Ambient Glows */}
            {/* Top Right - Large Primary Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-[var(--accent)]/10 rounded-full blur-[120px]"
            />

            {/* Bottom Left - Secondary Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-[var(--accent-glow)]/10 rounded-full blur-[100px]"
            />

            {/* Bottom Right - Subtle Accent */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
                className="absolute -bottom-[10%] right-[20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
            />
        </div>
    );
}
