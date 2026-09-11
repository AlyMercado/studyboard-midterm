"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function NewTaskForm({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO (Step 4): Implement the submit handler.
  // 1. Prevent default submission, clear any previous error, set isSubmitting.
  // 2. POST `/api/groups/${groupId}/tasks` with { title } as the JSON body.
  // 3. If the response is not ok, parse and show the error, and stop
  //    (remember to set isSubmitting back to false in this case).
  // 4. If it succeeds: clear the title field, and call router.refresh()
  //    so the new task appears in the list without a full page reload —
  //    same reasoning as TaskItem's delete handler.
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("TODO: implement add-task submit handler");
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add"}
        </Button>
      </form>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )};