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
    const response = await axios.get(`${API_BASE_URL}/menus/${id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const body = await request.json();
    const response = await axios.put(`${API_BASE_URL}/menus/${id}`, body);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update menu" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const response = await axios.delete(`${API_BASE_URL}/menus/${id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete menu" },
      { status: error.response?.status || 500 }
    );
  }
}
