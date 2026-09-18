"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/lib/data";

// "use client" is required because this component owns interactive state
// (useState) and responds to click/change events, and now also talks to
// the API directly for toggling and deleting a task.

export default function TaskItem({
  task,
  isOwner,
  groupId,
}: {
  task: Task;
  isOwner: boolean;
  groupId: string;
}) {
  const router = useRouter();
  const [done, setDone] = useState(task.done);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleToggle() {
    // Step 2.1: never trust the UI alone — bail if not the owner
    if (!isOwner) return;

    // Step 2.2: optimistic update — flip immediately, before the request finishes
    const previousDone = done;
    const newDone = !done;
    setDone(newDone);  // update UI immediately
    setError(""); //roll back on failure

    try {
      // Step 2.3
      const res = await fetch(`/api/groups/${groupId}/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: newDone }),
      });

      if (!res.ok) {
        // Step 2.4: roll back on failure
        setDone(previousDone);
        setError("Failed to update task.");
      }
    } catch {
      setDone(previousDone);
      setError("Failed to update task.");
    }
  }

  async function handleDelete() {
    // Step 3.1
    if (!isOwner) return;

    // Step 3.2
    setIsDeleting(true); // show error
    setError("");

    try {
      // Step 3.3
      const res = await fetch(`/api/groups/${groupId}/tasks/${task.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        // Step 3.4
        setIsDeleting(false);
        setError("Failed to delete task.");
        return;
      }

      // Step 3.5: refresh the Server Component so the list re-fetches from the DB
      router.refresh(); // refresh server OWN ROW
    } catch {
      setIsDeleting(false);
      setError("Failed to delete task.");
    }
  }

  return (
    <li className="flex items-center gap-3 rounded-md border px-3 py-2">
      <input
        type="checkbox"
        checked={done}
        onChange={handleToggle}
        disabled={!isOwner}
        className="h-4 w-4"
      />
      <span className={done ? "line-through text-gray-400" : ""}>
        {task.title}
      </span>

      {isOwner && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="ml-auto rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-50 hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </li>
  );
}