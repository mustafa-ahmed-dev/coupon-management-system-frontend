import { useUsers, useDeleteUser } from "../../../services/queries/userQueries";

export const UserList = () => {
  const { data: users, isLoading, error } = useUsers();
  const deleteUser = useDeleteUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button
            onClick={() => deleteUser.mutate(user.id)}
            disabled={deleteUser.isPending}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
