import React, { useState } from "react";

interface FormValues {
  depth: string;
  parentData: string;
  name: string;
}

interface FormErrors {
  depth?: string;
  parentData?: string;
  name?: string;
}

export default function FormMenu() {
  const [formValues, setFormValues] = useState<FormValues>({
    depth: "3",
    parentData: "Systems",
    name: "System Code",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formValues.depth || isNaN(Number(formValues.depth))) {
      newErrors.depth = "Depth must be a valid number.";
    } else if (Number(formValues.depth) <= 0) {
      newErrors.depth = "Depth must be greater than 0.";
    }

    if (!formValues.parentData.trim()) {
      newErrors.parentData = "ParentData is required.";
    }

    if (!formValues.name.trim()) {
      newErrors.name = "Name is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange =
    (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setFormValues((prevValues) => ({
        ...prevValues,
        [field]: value,
      }));

      if (errors[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: undefined,
        }));
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form Submitted:", formValues);
      alert("Form submitted successfully!");
      // Clear the form if needed
      // setFormValues({ depth: "", parentData: "", name: "" });
    }
  };

  return (
    <form className="max-w-md space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <label htmlFor="menuId" className="block text-sm text-gray-600">
          MenuID
        </label>
        <input
          id="menuId"
          type="text"
          value="56320ee9-6af6-11ed-a7ba-f220afe5e4a9"
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
          value={formValues.depth}
          onChange={handleChange("depth")}
          className={`w-full px-3 py-2 bg-gray-50 rounded text-gray-600 text-sm ${
            errors.depth ? "border-red-500" : ""
          }`}
        />
        {errors.depth && <p className="text-sm text-red-500">{errors.depth}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="parentData" className="block text-sm text-gray-600">
          ParentData
        </label>
        <input
          id="parentData"
          type="text"
          value={formValues.parentData}
          onChange={handleChange("parentData")}
          className={`w-full px-3 py-2 bg-gray-50 rounded text-gray-600 text-sm ${
            errors.parentData ? "border-red-500" : ""
          }`}
        />
        {errors.parentData && (
          <p className="text-sm text-red-500">{errors.parentData}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm text-gray-600">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formValues.name}
          onChange={handleChange("name")}
          className={`w-full px-3 py-2 bg-gray-50 rounded text-gray-600 text-sm ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-[#253BFF] w-full md:w-[200px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full">
        Save
      </button>
    </form>
  );
}
