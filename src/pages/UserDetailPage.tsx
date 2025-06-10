import { Route } from "../routes/users/$id";
import { useUser } from "../services/queries/userQueries";

import InternalServerErrorPage from "./InternalServerErrorPage";
import NotFoundPage from "./NotFoundPage";
import UserProfile from "../features/users/components/UserProfile";

function UserDetailPage() {
  const { id }: { id: number } = Route.useParams();
  const { data: user, isLoading, error } = useUser(id);

  console.log("user:", user);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">Loading user...</div>
      </div>
    );
  }

  if (error) {
    return <InternalServerErrorPage resource="User" error={error} />;
  }

  if (!user) {
    return <NotFoundPage id={id} resource="User" />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <UserProfile user={user} />
    </div>
  );
}

export default UserDetailPage;
