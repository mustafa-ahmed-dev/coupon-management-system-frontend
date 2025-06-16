export function InternalServerErrorPage({
  resource,
  error,
}: {
  resource: string;
  error: Error;
}) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
      <h2 className="text-yellow-800 font-semibold">
        Error doing the action on {resource}
      </h2>
      <p className="text-yellow-600">{error.message}</p>
    </div>
  );
}
