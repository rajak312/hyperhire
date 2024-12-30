import { Menu } from "app/store/menuSlice";
import React, { useEffect, useState } from "react";

interface FormMenuProps {
  menus: Menu[];
  menu: Menu;
  onSubmit: (parentId: string, name: string) => void;
  onDelete?: (id: string) => void;
  isEdit: boolean;
}

interface FormValues {
  name?: string;
}

interface FormErrors {
  name?: string;
}
export default function FormMenu({
  menu,
  onSubmit,
  onDelete,
  isEdit,
  menus,
}: FormMenuProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormValues({
      name: isEdit ? menu.name : "",
    });
  }, [menu.name, isEdit]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formValues.name || formValues.name.trim().length === 0) {
      newErrors.name = "Name is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      name: e.target.value,
    });

    if (errors.name) {
      setErrors({ ...errors, name: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      if (!formValues.name) return;
      onSubmit(menu.id, formValues.name);
    }
  };

  const handleDelete = () => {
    if (onDelete && isEdit) {
      onDelete(menu.id);
    }
  };

  return (
    <form className="max-w-md space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <label htmlFor="menuId" className="block text-sm text-gray-600">
          MenuID
        </label>
        <input
          placeholder="id will be generate"
          id="menuId"
          type="text"
          value={isEdit ? menu.id : ""}
          readOnly
          className="w-full px-3 py-2 bg-gray-50 rounded text-gray-600 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="depth" className="block text-sm text-gray-600">
          Depth
        </label>
        <input
          id="depth"
          type="number"
          value={menu.depth}
          readOnly
          className="w-full px-3 py-2 bg-gray-50 rounded text-gray-600 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm text-gray-600">Parent Data</label>
        <input
          id="parentData"
          type="text"
          value={menus.find((m) => m.id === menu.parentId)?.name || ""}
          readOnly
          className="w-full px-3 py-2 bg-gray-50 rounded text-gray-600 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm text-gray-600">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formValues.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-gray-50 rounded text-gray-600 text-sm ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-[#253BFF] w-full md:w-[200px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
        >
          {isEdit ? "Update" : "Save"}
        </button>
        {isEdit && onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 w-full md:w-[200px] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
