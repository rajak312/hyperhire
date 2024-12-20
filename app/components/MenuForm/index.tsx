import React, { useState } from "react";

const MenuForm = ({ onSave }: any) => {
  const [name, setName] = useState("");
  const [depth, setDepth] = useState(0);
  const [parentId, setParentId] = useState("");

  const handleSubmit = () => {
    onSave({ name, depth, parentId });
    setName("");
    setDepth(0);
    setParentId("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Menu Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Depth"
        value={depth}
        onChange={(e) => setDepth(parseInt(e.target.value))}
      />
      <input
        type="text"
        placeholder="Parent ID"
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default MenuForm;
