import { MoonStar } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// type ThemeType = "light" | "dark"

const Header = () => {
  const [theme, setTheme] = useState<any>(localStorage.getItem("theme") || "light")

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if(theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme((p:any) => (p === "light" ? "dark" : "light"))
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow dark:bg-slate-800 dark:text-white">
      <nav className="container flex items-center justify-between h-[70px]">
        <NavLink to="/">
          <h2 className="font-bold text-2xl uppercase">Logo</h2>
        </NavLink>
        <div className="flex gap-10">
          <NavLink
            end
            to="/"
            className={({ isActive }) =>
              `text-[18px] ${isActive ? "text-[#0080ff]" : "text-black dark:text-white" }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive }) =>
              `text-[18px] ${isActive ? "text-[#0080ff]" : "text-black dark:text-white" }`
            }
          >
            User
          </NavLink>
          <NavLink
            to="/internet"
            className={({ isActive }) =>
              `text-[18px] ${isActive ? "text-[#0080ff]" : "text-black dark:text-white" }`
            }
          >
            Internet
          </NavLink>
        </div>

        <button className="cursor-pointer" onClick={handleTheme}>
        <MoonStar/>
        </button>
      </nav>
    </header>
  );
};

export default memo(Header);
