import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, PlusCircle, LayoutDashboard } from 'lucide-react';

export default function Sidebar({ sources, onAddSource }) {
    return (
        <div className="w-72 border-r border-emerald-900/10 dark:border-emerald-100/10 bg-[#f8faf9] dark:bg-[#0f1714] flex flex-col h-full shadow-[1px_0_40px_-20px_rgba(16,185,129,0.1)] z-20 relative">
            <div className="p-5 border-b border-emerald-900/10 dark:border-emerald-100/10">
                <div className="flex items-center gap-2 font-semibold text-lg text-emerald-950 dark:text-emerald-50">
                    <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                    <span>DeepLecture</span>
                </div>
            </div>

            <div className="p-5 bg-emerald-50/50 dark:bg-emerald-900/20">
                <Button
                    variant="default"
                    className="w-full flex items-center gap-2 rounded-lg shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200"
                    onClick={onAddSource}
                >
                    <PlusCircle className="w-4 h-4" />
                    Add Source
                </Button>
            </div>

            <ScrollArea className="flex-1 px-4 py-5">
                <div className="space-y-1">
                    <div className="px-2 mb-3 text-xs font-semibold text-emerald-800/60 dark:text-emerald-200/60 uppercase tracking-wider">
                        Your Sources
                    </div>
                    {sources.length === 0 ? (
                        <div className="px-2 py-3 text-sm text-emerald-900/40 dark:text-emerald-100/40 italic">
                            No sources added yet.
                        </div>
                    ) : (
                        sources.map((source, i) => (
                            <button
                                key={i}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30 text-left text-emerald-950 dark:text-emerald-50 transition-colors border border-transparent hover:border-emerald-200/50 dark:hover:border-emerald-700/50"
                            >
                                <LayoutDashboard className="w-4 h-4 text-emerald-600/70 dark:text-emerald-400/70" />
                                <span className="truncate">{source.url}</span>
                            </button>
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
