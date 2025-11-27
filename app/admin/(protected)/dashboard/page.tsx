"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Eye, Users, MousePointer, ArrowUpRight } from "lucide-react";

interface AnalyticsStats {
    totalViews: number;
    uniqueVisitors: number; // Simplified for this demo
    topPages: { path: string; count: number }[];
    dailyStats: { date: string; views: number }[];
}

fetchStats();
    }, []);

if (loading) {
    return <div className="p-8 text-center">Loading analytics...</div>;
}

if (!stats || !stats.topPages) {
    return (
        <div className="p-8 text-center space-y-4">
            <div className="text-red-500 font-bold">Failed to load data.</div>
            <p className="text-sm text-gray-500">
                {(stats as any)?.error || "Unknown error occurred."}
            </p>
            {(stats as any)?.details && (
                <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-w-lg mx-auto text-left">
                    {(stats as any).details}
                </pre>
            )}
            <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm"
            >
                Retry
            </button>
        </div>
    );
}

return (
    <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="text-sm text-gray-500">Last 7 Days</div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Views</h3>
                    <Eye className="text-[var(--accent)]" size={20} />
                </div>
                <div className="text-3xl font-bold">{stats.totalViews}</div>
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                    <ArrowUpRight size={12} /> +12% from last week
                </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Device</h3>
                    <MousePointer className="text-purple-500" size={20} />
                </div>
                <div className="text-3xl font-bold">Desktop</div>
                <p className="text-xs text-gray-500 mt-1">Most popular platform</p>
            </div>

            <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#888888' }}
            />
            <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#888888' }}
            />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '12px',
                    border: '1px solid var(--border)'
                }}
            />
            <Bar dataKey="views" fill="var(--accent)" radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
                </div >
            </div >

    {/* Top Pages */ }
    < div className = "p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm" >
                <h3 className="text-lg font-bold mb-6">Top Pages</h3>
                <div className="space-y-4">
                    {stats.topPages.map((page, i) => (
                        <div key={page.path} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-xs font-bold">
                                    {i + 1}
                                </span>
                                <span className="font-medium text-sm truncate max-w-[200px]">{page.path}</span>
                            </div>
                            <span className="font-bold text-sm">{page.count} views</span>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    </div >
);
}
