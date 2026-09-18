"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function NewTaskForm({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    // Step 4.1: prevent default submission, clear any previous error, set isSubmitting
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Step 4.2: POST with { title } as the JSON body
      const res = await fetch(`/api/groups/${groupId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        // Step 4.3: parse and show the error, and stop
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to add task.");
        setIsSubmitting(false);
        return;
      }

      // Step 4.4: clear the title field, refresh so the new task appears
      setTitle("");
      router.refresh();
    } catch {
      setError("Failed to add task.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          required
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 rounded-md border px-3 py-2 text-sm"
        />
        <Button type="submit" disabled={isSubmitting}
        className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          {isSubmitting ? "Adding..." : "Add"}
        </Button>
      </form>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}