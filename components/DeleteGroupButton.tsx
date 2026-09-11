import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteGroupButton({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setError("");
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/groups/${groupId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete group");
      }

      router.push("/");
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
        className="whitespace-nowrap rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 di"
      >
        {isDeleting ? "Deleting..." : "Delete Group"}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}