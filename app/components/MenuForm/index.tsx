import { Menu } from "app/store/menuSlice";
import React, { useState } from "react";

interface MenuFormProps {
  isEdit: boolean;
  initialData: Partial<Menu> | null;
  onSubmit: (menuData: Partial<Menu>) => void;
}

const MenuForm: React.FC<MenuFormProps> = ({
  isEdit,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<Menu>>(initialData || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Depth</label>
        <input
          type="number"
          name="depth"
          value={formData.depth || 0}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Parent ID</label>
        <input
          type="text"
          name="parentId"
          value={formData.parentId || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full px-3 py-2 bg-blue-500 text-white rounded"
      >
        {isEdit ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default MenuForm;
