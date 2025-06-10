// src/features/users/components/DeleteUserButton.tsx
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useDeleteUser } from "../../../services/queries/userQueries";

interface DeleteUserButtonProps {
  id: number;
}

export function DeleteUserButton({ id }: DeleteUserButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const deleteUser = useDeleteUser();

  const handleDelete = async () => {
    try {
      await deleteUser.mutateAsync(id);
      // Navigate back to users list after successful deletion
      navigate({ to: "/users" });
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (showConfirm) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800 mb-3">
          Are you sure you want to delete this user?
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            disabled={deleteUser.isPending}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
          >
            {deleteUser.isPending ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Delete User
    </button>
  );
}
