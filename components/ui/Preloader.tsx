"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check immediately if user has visited
        const hasVisited = sessionStorage.getItem("hasVisited");

        if (hasVisited) {
            setIsLoading(false);
            return;
        }

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsLoading(false);
                        sessionStorage.setItem("hasVisited", "true");
                    }, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)]"
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                >
                    <div className="w-full max-w-md px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-between items-end mb-4"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                                Kaze<span className="text-[var(--accent)]">Kreativ</span>
                            </h1>
                            <span className="text-xl font-mono">{progress}%</span>
                        </motion.div>

                        <div className="h-1 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[var(--accent)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-sm text-gray-500 text-center font-mono"
                        >
                            Strategic Growth Agency
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
