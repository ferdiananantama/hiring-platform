import { User } from "lucide-react";
import { useState } from "react";

function Header() {
  const [showLogout, setShowLogout] = useState(false);

  const handleImageClick = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between relative">
      <h1 className="text-xl font-semibold text-foreground">Job List</h1>
      <div className="relative">
        <div
          className="w-10 h-10 rounded-full bg-gradient from-purple-400 to-pink-400 flex items-center justify-center cursor-pointer"
          onClick={handleImageClick}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleImageClick();
          }}
        >
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
        {showLogout && (
          <button
            onClick={handleLogout}
            className="absolute right-0 mt-2 bg-red-500 text-white px-4 py-1 rounded shadow"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
