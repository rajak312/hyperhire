import axios from "axios";
import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_BASE_URL || "https://hyperhire-api.onrender.com";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const response = await axios.get(`${API_BASE_URL}/menus/tree/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching menu tree:", error);
    return NextResponse.json({ error: "Failed to fetch menu tree" });
  }
}
