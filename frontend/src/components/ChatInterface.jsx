import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Bot, Loader2, Link2 } from 'lucide-react';
import { chatWithLecture } from '@/services/api';
import { cn } from '@/lib/utils';

export default function ChatInterface({ hasSources }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chatWithLecture(userMessage.content);
            const botMessage = {
                role: 'bot',
                content: result.answer,
                sources: result.sources || []
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error('Chat error:', err);
            setMessages((prev) => [
                ...prev,
                { role: 'bot', content: 'An error occurred while generating the response.', error: true }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!hasSources) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#fdfdfc] dark:bg-[#0a0f0d]">
                <div className="max-w-md space-y-4">
                    <div className="w-16 h-16 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200/50 dark:border-emerald-800/30">
                        <BookOpenIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-semibold text-emerald-950 dark:text-emerald-50">Welcome to DeepLecture</h2>
                    <p className="text-emerald-800/60 dark:text-emerald-200/60 leading-relaxed">
                        Start by adding a YouTube lecture URL from the sidebar. Once processed, you can chat with the content.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-[2] flex flex-col min-h-0 overflow-hidden bg-[#ffffff] dark:bg-[#0a0f0d] relative shadow-[-10px_0_40px_-20px_rgba(16,185,129,0.05)] z-10">

            {/* Header */}
            <div className="h-16 shrink-0 border-b border-emerald-900/5 dark:border-emerald-100/5 flex items-center px-8 bg-white/80 dark:bg-[#0a0f0d]/80 backdrop-blur-md z-10 sticky top-0">
                <h2 className="font-semibold text-emerald-950 dark:text-emerald-50 text-lg">Chat Session</h2>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-8 py-6" ref={scrollRef}>
                <div className="space-y-8 pb-20 max-w-3xl mx-auto">
                    {messages.length === 0 ? (
                        <div className="text-center mt-24">
                            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 dark:border-emerald-800/30">
                                <Bot className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
                            </div>
                            <p className="text-emerald-900/50 dark:text-emerald-100/50 font-medium">Ask a question about your uploaded lectures!</p>
                        </div>
                    ) : (
                        messages.map((m, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex gap-4",
                                    m.role === 'user' ? "flex-row-reverse" : ""
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border",
                                    m.role === 'user' ? "bg-emerald-600 border-emerald-700 text-white" : "bg-white dark:bg-[#121c18] border-emerald-100 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400"
                                )}>
                                    {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>

                                <div className={cn(
                                    "flex flex-col gap-2 max-w-[80%]",
                                    m.role === 'user' ? "items-end" : "items-start"
                                )}>
                                    <div className={cn(
                                        "px-5 py-3.5 rounded-2xl text-[15px] shadow-sm",
                                        m.role === 'user'
                                            ? "bg-emerald-600 text-white rounded-tr-sm"
                                            : m.error
                                                ? "bg-red-50 text-red-600 border border-red-100 rounded-tl-sm dark:bg-red-900/20 dark:border-red-900/50"
                                                : "bg-white dark:bg-[#121c18] border border-emerald-900/5 dark:border-emerald-100/5 text-emerald-950 dark:text-emerald-50 rounded-tl-sm"
                                    )}>
                                        <div className="whitespace-pre-wrap leading-relaxed">
                                            {m.content}
                                        </div>
                                    </div>

                                    {m.sources && m.sources.length > 0 && (
                                        <div className="flex flex-col gap-1.5 mt-2">
                                            <span className="text-[11px] font-semibold text-emerald-800/50 dark:text-emerald-200/50 uppercase tracking-widest flex items-center gap-1.5 pl-1">
                                                <Link2 className="w-3 h-3" /> Sources
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {m.sources.map((source, idx) => (
                                                    <div key={idx} className="text-[11px] px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-md text-emerald-700 dark:text-emerald-300 max-w-xs truncate cursor-help hover:bg-emerald-100 transition-colors" title={source.text}>
                                                        Chunk {idx + 1}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}

                    {isLoading && (
                        <div className="flex gap-4 items-center animate-in fade-in duration-300">
                            <div className="w-8 h-8 rounded-full bg-white dark:bg-[#121c18] border border-emerald-100 dark:border-emerald-800/50 text-emerald-600 flex items-center justify-center shadow-sm">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="flex gap-2.5 bg-white dark:bg-[#121c18] border border-emerald-900/5 dark:border-emerald-100/5 px-5 py-3.5 rounded-2xl rounded-tl-sm items-center shadow-sm">
                                <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                                <span className="text-[15px] text-emerald-900/60 dark:text-emerald-100/60">Generating response...</span>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="shrink-0 p-6 bg-[#ffffff]/80 dark:bg-[#0a0f0d]/80 backdrop-blur-xl border-t border-emerald-900/5 dark:border-emerald-100/5">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative flex items-center group">
                    <Input
                        placeholder="Message DeepLecture..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        className="pr-14 py-7 rounded-2xl border-emerald-900/10 dark:border-emerald-100/10 bg-[#f4f7f5] dark:bg-[#121c18] shadow-inner focus-visible:ring-emerald-500 focus-visible:bg-[#eef2ef] dark:focus-visible:bg-[#1a2b24] text-[15px] text-emerald-950 dark:text-emerald-50 placeholder:text-emerald-900/40 dark:placeholder:text-emerald-100/40 transition-all"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-3 h-10 w-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-transform active:scale-95"
                    >
                        <Send className="w-4 h-4 ml-0.5" />
                    </Button>
                </form>
                <div className="text-center mt-3">
                    <span className="text-[11px] text-emerald-900/40 dark:text-emerald-100/40">
                        DeepLecture AI can make mistakes. Verify important information.
                    </span>
                </div>
            </div>
        </div>
    );
}

// Inline BookOpenIcon for the placeholder
function BookOpenIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    );
}
