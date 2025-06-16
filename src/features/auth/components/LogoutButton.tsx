import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useLogout } from "../services/authQueries";

interface LogoutButtonProps {
  type?: "primary" | "default" | "dashed" | "link" | "text";
  size?: "small" | "middle" | "large";
  block?: boolean;
}

export function LogoutButton({
  type = "default",
  size = "middle",
  block = false,
}: LogoutButtonProps) {
  const handleLogout = useLogout();

  return (
    <Button
      type={type}
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      size={size}
      block={block}
    >
      Logout
    </Button>
  );
}
