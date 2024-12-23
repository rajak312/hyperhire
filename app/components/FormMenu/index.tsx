import { Menu } from "app/store/menuSlice";
import React, { useState } from "react";

interface FormMenuProps {
  menu: Menu;
  onSubmit: (parentId: string, name: string) => void;
}

interface FormValues {
  name?: string;
}

interface FormErrors {
  name?: string;
}

export default function FormMenu({ menu, onSubmit }: FormMenuProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

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
      console.log("Form Submitted:", formValues);
      // Perform your form submission logic here
      if (!formValues.name) return;
      onSubmit(menu.id, formValues.name);
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
          value=""
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
        <label className="block text-sm text-gray-600">parentId</label>
        <input
          id="parentData"
          type="text"
          value={menu.id || ""}
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

      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-[#253BFF] w-full md:w-[200px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
      >
        Save
      </button>
    </form>
  );
}
