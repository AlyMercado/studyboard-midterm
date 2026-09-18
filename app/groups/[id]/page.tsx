import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getGroupById } from "@/lib/data";
import TaskItem from "@/components/TaskItem";
import DeleteGroupButton from "@/components/DeleteGroupButton";
import NewTaskForm from "@/components/NewTaskForm";

export default async function GroupDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Step 1: fetch session and group in parallel, since neither depends on the other
  const [session, group] = await Promise.all([
    getServerSession(authOptions),
    getGroupById(params.id),
  ]);

  if (!group) {
    notFound();
  }

  // Step 2: mirrors the exact same check your API routes already make
  const isOwner = session?.user.id === group.ownerId;

  return (
    <div>
      <h1 className="text-3xl font-bold">{group.name}</h1>
      <p className="text-teal-900">
        {group.subject} · {group.memberCount} members · Created by{" "}
        {group.owner.name}
      </p>

      {/* Delete Group + Add task form: below subtitle, above Tasks list */}
      {isOwner && (
        <div className="mt-3 flex flex-col gap-2">
          <DeleteGroupButton groupId={group.id} />
          <NewTaskForm groupId={group.id} />
        </div>
      )}

      <h2 className="mt-8 text-lg font-semibold">Tasks</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {group.tasks.map((task) => (
          // Step 3: pass isOwner and groupId down to each TaskItem
          <TaskItem
            key={task.id}
            task={task}
            isOwner={isOwner}
            groupId={group.id}
          />
        ))}
      </ul>
    </div>
  );
}