"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, X, Camera, Sparkles, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import api from "../utils/api";
import UploadStory from "./UploadStory";

// --- Types ---
export interface Story {
    id: string | number;
    imageUrl: string;
    createdAt: string;
}

export interface UserGroupedStories {
    user: {
        id: number;
        name: string;
        avatar: string;
        username: string;
    };
    stories: Story[];
}

export default function StoriesBar() {
    const [groupedStories, setGroupedStories] = useState<UserGroupedStories[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [viewerState, setViewerState] = useState<{
        isOpen: boolean;
        userIndex: number;
        storyIndex: number;
    }>({
        isOpen: false,
        userIndex: 0,
        storyIndex: 0,
    });

    const fetchStories = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get("/stories/active");
            setGroupedStories(res.data);
        } catch (err) {
            console.error("Error fetching stories:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

    const openViewer = (userIndex: number) => {
        setViewerState({
            isOpen: true,
            userIndex,
            storyIndex: 0,
        });
    };

    const closeViewer = () => {
        setViewerState((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <div className="w-full relative py-6">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar px-1">

                {/* Add Story Button */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <button
                        onClick={() => setIsUploadOpen(true)}
                        className="group relative w-16 h-16 rounded-[22px] bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-600/20 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Plus className="w-6 h-6 text-teal-400 group-hover:rotate-90 transition-transform duration-500" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg flex items-center justify-center border-2 border-[#050505] shadow-lg">
                            <Plus className="w-3 h-3 text-white" />
                        </div>
                    </button>
                    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">You</span>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col items-center gap-2 animate-pulse">
                                <div className="w-16 h-16 rounded-[22px] bg-white/[0.03] border border-white/10" />
                                <div className="w-10 h-2 bg-white/[0.03] rounded" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Stories List */}
                {groupedStories.map((group, idx) => (
                    <div
                        key={group.user.id}
                        className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
                        onClick={() => openViewer(idx)}
                    >
                        <div className="relative p-[3px] rounded-[24px] bg-gradient-to-tr from-teal-500 via-blue-500 to-purple-600 transition-transform duration-500 group-hover:scale-105 active:scale-95">
                            <div className="w-16 h-16 rounded-[21px] border-[3px] border-[#050505] overflow-hidden bg-zinc-900">
                                <img
                                    src={group.user.avatar || "/avatar-default.png"}
                                    alt={group.user.name}
                                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                                />
                            </div>
                        </div>
                        <span className="text-[10px] font-semibold text-white truncate max-w-[64px] tracking-tight">
                            {group.user.name.split(" ")[0]}
                        </span>
                    </div>
                ))}
            </div>

            {/* Upload Modal Overlay */}
            {isUploadOpen && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="relative w-full max-w-lg">
                        <button
                            onClick={() => setIsUploadOpen(false)}
                            className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <UploadStory
                            onClose={() => setIsUploadOpen(false)}
                            onUploadSuccess={() => {
                                fetchStories();
                                setIsUploadOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Story Viewer Overlay */}
            {viewerState.isOpen && groupedStories.length > 0 && (
                <StoryViewer
                    groupedStories={groupedStories}
                    initialUserIndex={viewerState.userIndex}
                    onClose={closeViewer}
                />
            )}
        </div>
    );
}

// --- Story Viewer Component ---
function StoryViewer({
    groupedStories,
    initialUserIndex,
    onClose,
}: {
    groupedStories: UserGroupedStories[];
    initialUserIndex: number;
    onClose: () => void;
}) {
    const [userIndex, setUserIndex] = useState(initialUserIndex);
    const [storyIndex, setStoryIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const currentGroup = groupedStories[userIndex];
    const currentStory = currentGroup.stories[storyIndex];

    const next = useCallback(() => {
        if (storyIndex < currentGroup.stories.length - 1) {
            setStoryIndex((prev) => prev + 1);
            setProgress(0);
        } else if (userIndex < groupedStories.length - 1) {
            setUserIndex((prev) => prev + 1);
            setStoryIndex(0);
            setProgress(0);
        } else {
            onClose();
        }
    }, [storyIndex, userIndex, currentGroup.stories.length, groupedStories.length, onClose]);

    const prev = useCallback(() => {
        if (storyIndex > 0) {
            setStoryIndex((prev) => prev - 1);
            setProgress(0);
        } else if (userIndex > 0) {
            setUserIndex((prev) => prev - 1);
            setStoryIndex(groupedStories[userIndex - 1].stories.length - 1);
            setProgress(0);
        } else {
            setProgress(0);
        }
    }, [storyIndex, userIndex, groupedStories]);

    useEffect(() => {
        if (isPaused) return;
        const duration = 5000;
        const interval = 20;
        const timer = setInterval(() => {
            setProgress((p) => {
                const nextP = p + (interval / duration) * 100;
                if (nextP >= 100) {
                    next();
                    return 0;
                }
                return nextP;
            });
        }, interval);
        return () => clearInterval(timer);
    }, [userIndex, storyIndex, isPaused, next]);

    return (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full md:aspect-[9/16] md:h-[90vh] md:rounded-[40px] overflow-hidden bg-zinc-950 shadow-2xl">

                {/* Progress Bars */}
                <div className="absolute top-4 left-4 right-4 z-50 flex gap-1.5 pt-4">
                    {currentGroup.stories.map((_, idx) => (
                        <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-none"
                                style={{
                                    width: idx === storyIndex ? `${progress}%` : idx < storyIndex ? "100%" : "0%",
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="absolute top-12 left-6 right-6 z-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20">
                            <img src={currentGroup.user.avatar || "/avatar-default.png"} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm tracking-tight">{currentGroup.user.name}</p>
                            <p className="text-white/50 text-[10px] font-medium uppercase tracking-widest">
                                {new Date(currentStory.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-all backdrop-blur-xl border border-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Media Content */}
                <div className="w-full h-full relative" onMouseDown={() => setIsPaused(true)} onMouseUp={() => setIsPaused(false)}>
                    <img
                        src={currentStory.imageUrl}
                        alt="Story"
                        className="w-full h-full object-cover"
                    />

                    {/* Navigation Taps */}
                    <div className="absolute inset-0 z-40 flex">
                        <div className="flex-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); prev(); }} />
                        <div className="flex-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); next(); }} />
                    </div>
                </div>

                {/* Desktop Navigation Arrows */}
                <div className="hidden md:block">
                    <button
                        onClick={prev}
                        className="absolute -left-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all opacity-0 md:group-hover:opacity-100"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={next}
                        className="absolute -right-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all opacity-0 md:group-hover:opacity-100"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}
