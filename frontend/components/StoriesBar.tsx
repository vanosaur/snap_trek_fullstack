"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Plus, X, Image as ImageIcon } from "lucide-react";

// --- Types ---
export interface Story {
    id: string;
    userName: string;
    avatarUrl: string;
    storyMediaUrl: string;
    caption?: string;
    createdAt: string;
    expiresAt: string;
}

// --- Main Component ---

export default function StoriesBar({ mobile = false }: { mobile?: boolean }) {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Viewer State
    const [viewerOpen, setViewerOpen] = useState(false);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    // Upload State
    const [uploadOpen, setUploadOpen] = useState(false);

    // Fetch Stories
    const fetchStories = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/stories?t=" + Date.now());
            if (!res.ok) throw new Error("Failed to fetch stories");
            const data = await res.json();
            setStories(data);
        } catch (err) {
            console.error(err);
            setError("Could not load stories");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

    // --- Grouping Logic ---
    // We want to show only ONE circle per User.
    // The viewer should play ALL stories, but starting from the clicked user.
    // We will derive "uniqueUsers" for display.
    const groupedStories = React.useMemo(() => {
        const groups: { [key: string]: Story[] } = {};
        const order: string[] = [];

        stories.forEach(story => {
            if (!groups[story.userName]) {
                groups[story.userName] = [];
                order.push(story.userName);
            }
            groups[story.userName].push(story);
        });

        return order.map(userName => ({
            userName,
            avatarUrl: groups[userName][0].avatarUrl, // Use latest/first avatar
            firstStoryId: groups[userName][0].id,
            totalStories: groups[userName].length
        }));
    }, [stories]);


    const handleUserClick = (userName: string) => {
        // Find the index of the FIRST story for this user in the full 'stories' array
        // (Since 'stories' is the source of truth for the viewer playback order)
        const index = stories.findIndex(s => s.userName === userName);
        if (index !== -1) {
            setCurrentStoryIndex(index);
            setViewerOpen(true);
        }
    };

    const handleAddStoryClick = () => {
        setUploadOpen(true);
    };

    const handleUploadSuccess = (newStory: Story) => {
        setStories((prev) => [newStory, ...prev]);
        setUploadOpen(false);
    };

    return (
        <div className={`w-full ${mobile ? '' : 'bg-black border-b border-gray-800'} text-white py-4`}>
            <div className={`max-w-2xl mx-auto ${mobile ? '' : 'px-4'}`}>
                {error && <div className="text-red-500 text-xs mb-2">{error}</div>}

                <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2 items-center">

                    {/* --- 1. Your Story (Add Button) --- */}
                    <div className="flex flex-col items-center flex-shrink-0 cursor-pointer group" onClick={handleAddStoryClick}>
                        <div className="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center bg-gray-900 relative group-hover:border-gray-500 transition">
                            <Plus className="w-6 h-6 text-blue-500" />
                            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-0.5 border-2 border-black">
                                <Plus className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <span className="text-xs mt-1 text-gray-400 font-medium">Your Story</span>
                    </div>

                    {/* --- Loading --- */}
                    {loading && (
                        <>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col items-center flex-shrink-0 animate-pulse">
                                    <div className="w-16 h-16 rounded-full bg-gray-800" />
                                    <div className="w-12 h-2 bg-gray-800 mt-2 rounded" />
                                </div>
                            ))}
                        </>
                    )}

                    {/* --- 2. Stories List (Grouped by User) --- */}
                    {groupedStories.map((group) => (
                        <div
                            key={group.userName}
                            className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
                            onClick={() => handleUserClick(group.userName)}
                        >
                            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
                                <div className="w-full h-full rounded-full border-2 border-black overflow-hidden relative bg-black">
                                    <img
                                        src={group.avatarUrl}
                                        alt={group.userName}
                                        className="w-full h-full object-cover group-hover:opacity-90 transition"
                                    />
                                </div>
                            </div>
                            <span className="text-xs mt-1 text-white truncate max-w-[64px] font-medium">
                                {group.userName}
                            </span>
                        </div>
                    ))}

                </div>
            </div>

            {/* Viewer Modal (Iterates over FULL stories list) */}
            {viewerOpen && stories.length > 0 && (
                <StoryViewer
                    stories={stories}
                    initialIndex={currentStoryIndex}
                    onClose={() => setViewerOpen(false)}
                />
            )}

            {/* Upload Modal */}
            {uploadOpen && (
                <UploadStoryModal
                    onClose={() => setUploadOpen(false)}
                    onSuccess={handleUploadSuccess}
                />
            )}
        </div>
    );
}

// --- Story Viewer Component ---
function StoryViewer({
    stories,
    initialIndex,
    onClose
}: {
    stories: Story[],
    initialIndex: number,
    onClose: () => void
}) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const STORY_DURATION = 5000;
    const UPDATE_INTERVAL = 20;

    const currentStory = stories[currentIndex];

    // Helper to calculate progress for just the current story
    // We want to show BARS for all stories of the CURRENT USER?
    // Instagram shows bars for the current user's session.
    // If I switch users, the bars reset.
    // For simplicity, let's keep showing bars for ALL loaded stories, OR just current user's.
    // Let's refine: Show bars for *current user's* stories only.

    const currentUserStories = stories.filter(s => s.userName === currentStory.userName);
    const currentStoryIndexInUserList = currentUserStories.findIndex(s => s.id === currentStory.id);
    const totalUserStories = currentUserStories.length;

    const nextStory = useCallback(() => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setProgress(0);
        } else {
            onClose();
        }
    }, [currentIndex, stories.length, onClose]);

    const prevStory = useCallback(() => {
        // If we are at the start of a user's block, ideally go to previous user?
        // For now simple index logic
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setProgress(0);
        } else {
            setProgress(0);
        }
    }, [currentIndex]);

    useEffect(() => {
        setProgress(0);
    }, [currentIndex]);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setProgress((prev) => {
                const increment = (UPDATE_INTERVAL / STORY_DURATION) * 100;
                if (prev + increment >= 100) {
                    clearInterval(timer);
                    nextStory();
                    return 0;
                }
                return prev + increment;
            });
        }, UPDATE_INTERVAL);
        return () => clearInterval(timer);
    }, [currentIndex, isPaused, nextStory]);

    return (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-95 flex items-center justify-center">
            <div
                className="relative w-full h-full md:max-w-md md:h-[85vh] md:rounded-xl overflow-hidden bg-gray-900 flex flex-col shadow-2xl"
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                {/* Progress Bars (Scoped to current user) */}
                <div className="absolute top-0 left-0 right-0 z-30 flex space-x-1 p-2 pt-4">
                    {currentUserStories.map((_, idx) => (
                        <div key={idx} className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-white transition-none ${idx === currentStoryIndexInUserList ? '' : (idx < currentStoryIndexInUserList ? 'w-full' : 'w-0')}`}
                                style={{ width: idx === currentStoryIndexInUserList ? `${progress}%` : undefined }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="absolute top-6 left-0 right-0 z-30 flex items-center justify-between px-4 mt-2">
                    <div className="flex items-center space-x-2">
                        <img src={currentStory.avatarUrl} className="w-8 h-8 rounded-full border border-white/20" alt="" />
                        <span className="text-white font-semibold text-sm drop-shadow-md">{currentStory.userName}</span>
                        <span className="text-white/60 text-xs drop-shadow-md">• 1h</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2 text-white/80 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Taps */}
                <div className="absolute inset-0 z-20 flex">
                    <div className="w-1/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); prevStory(); }} />
                    <div className="w-2/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); nextStory(); }} />
                </div>

                {/* Media */}
                <div className="flex-1 flex items-center justify-center bg-black">
                    {currentStory.storyMediaUrl.endsWith('.mp4') || currentStory.storyMediaUrl.endsWith('.webview') ? (
                        <video src={currentStory.storyMediaUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                    ) : (
                        <img src={currentStory.storyMediaUrl} alt="Story" className="w-full h-full object-cover" />
                    )}
                </div>

                {/* Caption */}
                {currentStory.caption && (
                    <div className="absolute bottom-0 left-0 right-0 z-30 p-6 pt-12 bg-gradient-to-t from-black/80 to-transparent text-white text-center">
                        <p className="text-lg font-medium">{currentStory.caption}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function UploadStoryModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: (s: Story) => void }) {
    // ... (Same as before, simplified for brevity in this output but code remains)
    // We'll just define it fully to ensure no breaks.
    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState("");
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => { if (preview) URL.revokeObjectURL(preview); };
    }, [preview]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            setPreview(URL.createObjectURL(f));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("media", file);
            formData.append("caption", caption);
            formData.append("userName", "You");

            const res = await fetch("/api/stories", { method: "POST", body: formData });
            if (!res.ok) throw new Error("Acc failed");
            const newStory = await res.json();
            onSuccess(newStory);
        } catch (e) { console.error(e); }
        finally { setUploading(false); }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl w-full max-w-sm border border-gray-800 flex flex-col max-h-[90vh]">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="text-white font-semibold">Add to Story</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 flex flex-col flex-1 overflow-y-auto">
                    {!preview ? (
                        <div className="border-2 border-dashed border-gray-700 rounded-lg flex-1 min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition mb-4" onClick={() => fileInputRef.current?.click()}>
                            <ImageIcon className="w-12 h-12 text-gray-500 mb-2" />
                            <span className="text-gray-400 text-sm">Select Media</span>
                            <input type="file" accept="image/*,video/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                        </div>
                    ) : (
                        <div className="relative flex-1 min-h-[300px] bg-black rounded-lg overflow-hidden flex items-center justify-center mb-4">
                            <img src={preview} className="h-full w-full object-contain" alt="prev" />
                            <button type="button" onClick={() => { setFile(null); setPreview(null) }} className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white"><X className="w-4 h-4" /></button>
                        </div>
                    )}
                    <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Caption..." className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white mb-4" />
                    <button type="submit" disabled={!file || uploading} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold">{uploading ? "Posting..." : "Share"}</button>
                </form>
            </div>
        </div>
    );
}
