"use client";

import {BubbleMenu, EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Check,
    CheckSquare,
    ChevronDown,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Image as ImageIcon,
    Italic,
    List,
    ListOrdered,
    Quote,
    Redo,
    Strikethrough,
    Type,
    Underline as UnderlineIcon,
    Undo,
} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export default function TipTapEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
            }),
            Underline,
            Image.configure({
                inline: true,
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
                alignments: ["left", "center", "right", "justify"],
                defaultAlignment: "left",
            }),
            Typography,
        ],
        content: `
      <h2>Hi there,</h2>
      <p>This is a basic example of <strong>TipTap</strong>. Try adding some text here or click the toolbar buttons above.</p>
      <ul>
        <li>First item</li>
        <li>Second item</li>
      </ul>
    `,
    });

    if (!editor) return null;

    interface Editor {
        chain: () => any;
        isActive: (name: string, attrs?: Record<string, any>) => boolean;
    }

    // Replace your headingOptions array with this:
    const headingOptions = [
        {
            label: "Paragraph",
            value: "paragraph",
            icon: Type,
            command: () => editor.chain().focus().setParagraph().run(),
            isActive: () => editor.isActive("paragraph"),
        },
        {
            label: "Heading 1",
            value: "h1",
            icon: Heading1,
            command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => editor.isActive("heading", { level: 1 }),
        },
        {
            label: "Heading 2",
            value: "h2",
            icon: Heading2,
            command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => editor.isActive("heading", { level: 2 }),
        },
        {
            label: "Heading 3",
            value: "h3",
            icon: Heading3,
            command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: () => editor.isActive("heading", { level: 3 }),
        },
        {
            label: "Heading 4",
            value: "h4",
            icon: Heading4,
            command: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
            isActive: () => editor.isActive("heading", { level: 4 }),
        },
        {
            label: "Heading 5",
            value: "h5",
            icon: Heading5,
            command: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
            isActive: () => editor.isActive("heading", { level: 5 }),
        },
        {
            label: "Heading 6",
            value: "h6",
            icon: Heading6,
            command: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
            isActive: () => editor.isActive("heading", { level: 6 }),
        },
    ];

    const currentHeading = headingOptions.find((option) => option.isActive())
    const CurrentIcon = currentHeading?.icon || Type

    const addImage = () => {
        const url = window.prompt("Enter the URL of the image:");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <Card className="">
            <div className="flex flex-wrap items-center gap-1 p-2 border-b">
                {/* Text formatting */}
                <div className="tiptap-button-group" data-orientation="horizontal">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 px-2 lg:px-3">
                                <CurrentIcon className="h-4 w-4" />
                                <span className="sr-only sm:not-sr-only sm:ml-2">
                                    {currentHeading?.label || "Paragraph"}
                                  </span>
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                            {headingOptions.map((option) => {
                                const Icon = option.icon;
                                const isActive = option.isActive();

                                return (
                                    <DropdownMenuItem
                                        key={option.value}
                                        onClick={() => {
                                            console.log(`Applying ${option.label}`);
                                            option.command();
                                        }}
                                        className="flex items-center justify-between cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            <Icon className="mr-2 h-4 w-4" />
                                            <span>{option.label}</span>
                                        </div>
                                        {isActive && <Check className="h-4 w-4" />}
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Button
                    variant={editor.isActive("bold") ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    variant={editor.isActive("italic") ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    variant={editor.isActive("underline") ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    title="Underline"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant={editor.isActive("strike") ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    title="Strikethrough"
                >
                    <Strikethrough className="h-4 w-4" />
                </Button>
                <Button
                    variant={editor.isActive("code") ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    title="Code"
                >
                    <Code className="h-4 w-4" />
                </Button>

                <div className="h-6 w-px bg-border mx-1" />

                {/* Text alignment */}
                <Button
                    variant={editor.isActive({ textAlign: "left" }) ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    title="Align left"
                >
                    <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant={editor.isActive({ textAlign: "center" }) ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    title="Align center"
                >
                    <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                    variant={editor.isActive({ textAlign: "right" }) ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    title="Align right"
                >
                    <AlignRight className="h-4 w-4" />
                </Button>
                <Button
                    variant={editor.isActive({ textAlign: "justify" }) ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    title="Justify"
                >
                    <AlignJustify className="h-4 w-4" />
                </Button>

                <div className="h-6 w-px bg-border mx-1" />

                {/* Lists */}
                <Button
                    variant={editor.isActive("bulletList") ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    title="Bullet list"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    variant={editor.isActive("orderedList") ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    title="Ordered list"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    variant={editor.isActive("taskList") ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    title="Task list"
                >
                    <CheckSquare className="h-4 w-4" />
                </Button>

                <div className="h-6 w-px bg-border mx-1" />

                {/* Blocks */}
                <Button
                    variant={editor.isActive("blockquote") ? "default" : "outline"}
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    title="Blockquote"
                >
                    <Quote className="h-4 w-4" />
                </Button>

                {/* Media */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={addImage}
                    title="Insert image"
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>

                <div className="h-6 w-px bg-border mx-1" />

                {/* Undo/Redo */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo"
                >
                    <Undo className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo"
                >
                    <Redo className="h-4 w-4" />
                </Button>
            </div>

            {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <div className="flex gap-1 p-1 bg-background border rounded-md shadow-sm">
                        <Button
                            variant={editor.isActive("bold") ? "default" : "outline"}
                            onClick={() => editor.chain().focus().toggleBold().run()}
                        >
                            <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={editor.isActive("italic") ? "default" : "outline"}
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                        >
                            <Italic className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={editor.isActive("underline") ? "default" : "outline"}
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                        >
                            <UnderlineIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </BubbleMenu>
            )}

            <CardContent className="p-4">
                <EditorContent
                    editor={editor}
                    className="min-h-[300px] border rounded-md focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none"
                />
            </CardContent>
        </Card>
    );
}