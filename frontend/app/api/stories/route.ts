import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// --- Type Definitions ---
export interface Story {
    id: string;
    userName: string;
    avatarUrl: string;
    storyMediaUrl: string; // image or short video URL
    caption?: string;
    createdAt: string; // ISO date
    expiresAt: string; // ISO date
}

// --- In-Memory Storage ---
// Note: This will be reset server restarts.
let stories: Story[] = [];

// Helper to clean up expired stories
const cleanupExpiredStories = () => {
    const now = new Date();
    stories = stories.filter(story => new Date(story.expiresAt) > now);
};

// --- GET Handler ---
export async function GET() {
    cleanupExpiredStories();
    return NextResponse.json(stories);
}

// --- POST Handler ---
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const media = formData.get('media') as File | null;
        const userName = formData.get('userName') as string | null;
        const caption = formData.get('caption') as string | null;

        if (!media || !userName) {
            return NextResponse.json({ error: 'Missing media or userName' }, { status: 400 });
        }

        // --- File Saving Logic ---
        const bytes = await media.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const fileExtension = media.name.split('.').pop() || 'jpg';
        const fileName = `${crypto.randomUUID()}.${fileExtension}`;

        // Check if public/stories exists, create if not (redundant if mkdir -p run, but good for safety)
        const uploadDir = path.join(process.cwd(), 'public', 'stories');
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileName);

        // Write file to disk
        await writeFile(filePath, buffer);

        // Construct URL (relative to public)
        const storyMediaUrl = `/stories/${fileName}`;

        // --- Create Story Object ---
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours later

        const newStory: Story = {
            id: crypto.randomUUID(),
            userName: userName,
            // Use a consistent placeholder for avatar
            avatarUrl: `https://ui-avatars.com/api/?name=${userName}&background=random`,
            storyMediaUrl: storyMediaUrl,
            caption: caption || undefined,
            createdAt: now.toISOString(),
            expiresAt: expiresAt.toISOString(),
        };

        stories.unshift(newStory); // Add to beginning

        return NextResponse.json(newStory, { status: 201 });
    } catch (error) {
        console.error("Error creating story:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
