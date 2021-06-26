import { Stack } from "@chakra-ui/react";
import { RiDashboardFill, RiContactsFill, RiInputMethodLine, RiGitMergeLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="FEATURES">
        <NavLink icon={RiDashboardFill} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={RiContactsFill} href="/users">Users</NavLink>
      </NavSection>

      {/* <NavSection title="FORMS">
        <NavLink icon={RiInputMethodLine} href="/edit">Edit</NavLink>
        <NavLink icon={RiGitMergeLine} href="/delete">Delte</NavLink>
      </NavSection> */}
    </Stack>
  );
}