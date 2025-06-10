import { DeleteUserButton } from "./DeleteUserButton";
import { EditUserButton } from "./EditUserButton";
import type { User } from "../../../types/api";

function UserProfile({ user }: { user: User }) {
  console.log(user);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Details</h3>
          <div className="space-y-2">
            <div>
              <span className="text-gray-600">ID:</span>
              <span className="ml-2 font-mono text-sm">{user.id}</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <span className="ml-2">{user.email}</span>
            </div>
            <div>
              <span className="text-gray-600">Created:</span>
              <span className="ml-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Actions</h3>
          <div className="space-y-2">
            <EditUserButton user={user} />
            <DeleteUserButton id={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
