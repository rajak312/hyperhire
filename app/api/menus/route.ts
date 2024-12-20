import axios from "axios";
import { NextResponse } from "next/server";

// Define the Menu interface
interface Menu {
  id: string;
  name: string;
  depth: number;
  parentId: string | null;
  children: Menu[];
}

// Dummy data for now
const demoData: Menu[] = [
  {
    id: "1",
    name: "System Management",
    depth: 1,
    parentId: null,
    children: [
      {
        id: "2",
        name: "Systems",
        depth: 2,
        parentId: "1",
        children: [
          {
            id: "3",
            name: "System Code",
            depth: 3,
            parentId: "2",
            children: [],
          },
          {
            id: "4",
            name: "Code Registration",
            depth: 3,
            parentId: "2",
            children: [],
          },
        ],
      },
      {
        id: "5",
        name: "Users & Groups",
        depth: 2,
        parentId: "1",
        children: [],
      },
    ],
  },
];

export async function GET() {
  // Uncomment this when API is ready
  const response = await axios.get("http://localhost:5000/menus");
  const data: Menu[] = response.data;

  // Using dummy data for now
  return NextResponse.json(data);
}
