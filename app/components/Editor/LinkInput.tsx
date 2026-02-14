"use client";

import { useEffect, useRef, useState } from "react";

interface LinkInputProps {
    initialValue: string;
    onApply: (url: string) => void;
    onCancel: () => void;
}

export default function LinkInput({ initialValue, onApply, onCancel }: LinkInputProps) {
    const [url, setUrl] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let normalizedUrl = url.trim();
        if (normalizedUrl && !/^https?:\/\//i.test(normalizedUrl) && !normalizedUrl.startsWith("/")) {
            normalizedUrl = `https://${normalizedUrl}`;
        }
        onApply(normalizedUrl);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="absolute right-0 top-full mt-2 z-50 flex w-72 flex-col gap-3 rounded-lg border p-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
            style={{
                backgroundColor: "var(--color-bg-main)",
                borderColor: "var(--color-border-muted)",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex flex-col gap-1.5">
                <label
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: "var(--color-ui-muted)" }}
                >
                    Insert Link
                </label>
                <input
                    ref={inputRef}
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="example.com"
                    className="w-full rounded border px-3 py-1.5 text-sm outline-none transition-all"
                    style={{
                        backgroundColor: "var(--color-bg-secondary)",
                        borderColor: "var(--color-border-muted)",
                        color: "var(--color-text-primary)",
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") onCancel();
                    }}
                />
            </div>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded px-3 py-1 text-xs font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded px-3 py-1 text-xs font-bold text-white transition-all active:scale-95"
                    style={{ backgroundColor: "var(--color-accent-primary)" }}
                >
                    Apply Link
                </button>
            </div>
        </form>
    );
}
