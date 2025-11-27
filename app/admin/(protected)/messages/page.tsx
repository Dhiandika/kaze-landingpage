import prisma from "@/lib/prisma";
import { Mail, Trash2, CheckCircle, Clock } from "lucide-react";
import { DeleteMessageButton } from "@/components/admin/DeleteMessageButton";
import { MarkReadButton } from "@/components/admin/MarkReadButton";

export default async function AdminMessagesPage() {
    const messages = await prisma.message.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
                <div className="text-sm text-gray-500">
                    {messages.length} messages ({messages.filter(m => !m.read).length} unread)
                </div>
            </div>

            <div className="grid gap-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`p-6 rounded-2xl border transition-all ${msg.read
                                ? "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 opacity-75"
                                : "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20 shadow-sm"
                            }`}
                    >
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-full ${msg.read ? "bg-gray-100 dark:bg-white/10 text-gray-500" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"}`}>
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{msg.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{msg.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock size={14} />
                                {new Date(msg.createdAt).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>

                        <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                            {msg.message}
                        </div>

                        <div className="flex justify-end gap-2">
                            {!msg.read && <MarkReadButton id={msg.id} />}
                            <DeleteMessageButton id={msg.id} />
                        </div>
                    </div>
                ))}

                {messages.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <Mail size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No messages yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
