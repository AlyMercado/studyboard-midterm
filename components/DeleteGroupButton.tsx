"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteGroupButton({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    // Step 5.1
    const confirmed = window.confirm(
      "Are you sure you want to delete this group? This cannot be undone."
    );
    if (!confirmed) return;

    // Step 5.2
    setError("");
    setIsDeleting(true);

    try {
      // Step 5.3
      const res = await fetch(`/api/groups/${groupId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        // Step 5.4
        throw new Error("Failed to delete group");
      }

      // Step 5.5: this page no longer exists, so navigate away first,
      // then refresh so the groups list re-fetches
      router.push("/groups");
      router.refresh();
    } catch (err) {
      setError("Something went wrong deleting the group.");
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="whitespace-nowrap rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "Delete Group"}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}