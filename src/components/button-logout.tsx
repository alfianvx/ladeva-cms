import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "../../auth";

function ButtonLogout() {
  return (
    <Button
      asChild
      onClick={() => signOut()}
      variant="ghost"
      className="w-full justify-start"
    >
      <DropdownMenuItem>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </Button>
  );
}

export default ButtonLogout;
