import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2, Youtube } from 'lucide-react';
import { addYoutube } from '@/services/api';

export default function AddSourceModal({ open, onOpenChange, onSourceAdded }) {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url.trim()) return;

        setIsLoading(true);
        setError('');

        try {
            const result = await addYoutube(url);
            onSourceAdded({ url, chunks: result.chunks });
            setUrl('');
            onOpenChange(false);
        } catch (err) {
            console.error('Error adding source:', err);
            setError(err.response?.data?.detail || 'Failed to process video. Make sure the backend is running and the URL is valid.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-[#fdfdfc] dark:bg-[#0f1714] border border-emerald-900/10 dark:border-emerald-100/10 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.1)]">
                <DialogHeader>
                    <DialogTitle className="text-emerald-950 dark:text-emerald-50">Add a YouTube Source</DialogTitle>
                    <DialogDescription className="text-emerald-800/60 dark:text-emerald-200/60">
                        Paste a YouTube URL to transcribe and embed its lecture content.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 pt-4">
                    <div className="space-y-2">
                        <div className="relative group">
                            <Youtube className="absolute left-3.5 top-3 h-4 w-4 text-emerald-600/50 transition-colors group-focus-within:text-emerald-600" />
                            <Input
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="pl-10 py-5 rounded-xl border-emerald-900/15 dark:border-emerald-100/15 bg-white/50 dark:bg-[#121c18]/50 focus-visible:ring-emerald-500 transition-all text-[15px]"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        {error && <p className="text-[13px] text-red-500/90 pl-1">{error}</p>}
                    </div>

                    <div className="flex justify-end pt-3">
                        <Button
                            type="submit"
                            disabled={isLoading || !url.trim()}
                            className="w-full sm:w-auto rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Add Source'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
