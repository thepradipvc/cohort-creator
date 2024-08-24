import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { Link, NavLink, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="grid min-h-screen w-full grid-cols-[220px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;

const SideBar = () => {
  return (
    <div className="border-r bg-muted/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span>Cohort</span>
          </Link>
        </div>
        <div className="flex-1">
          <NavLinks />
        </div>
      </div>
    </div>
  );
};

const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "My Cohorts", href: "/cohorts", icon: PersonIcon },
];

const NavLinks = () => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <NavLink
            key={link.name}
            to={link.href}
            className={({ isActive, isPending }) =>
              `${
                isActive
                  ? "bg-muted text-primary"
                  : isPending
                    ? "text-primary"
                    : ""
              } flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground transition-all hover:text-primary md:gap-3 md:rounded-lg`
            }
          >
            <LinkIcon className="h-5 w-5 md:h-4 md:w-4" />
            {link.name}
          </NavLink>
        );
      })}
    </nav>
  );
};
