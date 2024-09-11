import React, { useState } from "react";
import { FaBars } from "react-icons/fa"; // Vous pouvez utiliser n'importe quelle icône pour le bouton
import CategoryList from "../components/CategoryList";

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-3 bg-green-600 text-white rounded-full absolute top-4 left-4 z-50"
      >
        <FaBars />
      </button>

      {isOpen && (
        <div className="absolute top-12 left-4 bg-white shadow-lg p-4 rounded z-40">
          <CategoryList />
        </div>
      )}
    </div>
  );
};

export default MenuButton;
