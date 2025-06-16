interface LoginButtonProps {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function LoginButton({ isLoading, isError, error }: LoginButtonProps) {
  return (
    <>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {isError && error && (
        <div style={{ color: "red" }}>{error?.message || "Login failed"}</div>
      )}
    </>
  );
}
