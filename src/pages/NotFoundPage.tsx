function NotFoundPage({
  resource,
  id,
}: {
  resource: string;
  id?: number | string;
}) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
      <h2 className="text-yellow-800 font-semibold">{resource} not found</h2>
      {id && (
        <p className="text-yellow-600">The user with ID {id} was not found.</p>
      )}
    </div>
  );
}

export default NotFoundPage;
