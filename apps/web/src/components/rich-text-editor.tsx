"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';

export default function RichTextEditor({ content, onChange }: { content: string, onChange: (content: string) => void }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 border rounded-md',
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="space-y-2">
            <div className="flex gap-2 border-b pb-2">
                <Button
                    variant={editor.isActive('bold') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    Bold
                </Button>
                <Button
                    variant={editor.isActive('italic') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    Italic
                </Button>
                <Button
                    variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    H2
                </Button>
                <Button
                    variant={editor.isActive('bulletList') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    Bullet List
                </Button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
