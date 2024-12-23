import { NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

export async function GET() {
  const response = await axios.get(`${API_BASE_URL}/menus`);
  return NextResponse.json(response.data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const response = await axios.post(`${API_BASE_URL}/menus`, body);
  return NextResponse.json(response.data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const response = await axios.put(`${API_BASE_URL}/menus/${body.id}`, body);
  return NextResponse.json(response.data);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const response = await axios.delete(`${API_BASE_URL}/menus/${id}`);
  return NextResponse.json(response.data);
}
