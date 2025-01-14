import { NextResponse } from "next/server";
import axios from "axios";

const NEXT_PUBLIC_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://hyperhire-api.onrender.com";

export async function GET() {
  const response = await axios.get(`${NEXT_PUBLIC_API_BASE_URL}/menus`);
  return NextResponse.json(response.data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const response = await axios.post(`${NEXT_PUBLIC_API_BASE_URL}/menus`, body);
  return NextResponse.json(response.data);
}
