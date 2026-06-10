import { NextRequest, NextResponse } from "next/server";
import { sendToColab } from "@/lib/colab";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, image } = body;

    if (!prompt && !image) {
      return NextResponse.json(
        { error: "Please provide a prompt or an image" },
        { status: 400 }
      );
    }

    const result = await sendToColab(prompt, image);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    return NextResponse.json({
      video_url: result.video_url,
      id,
      createdAt,
    });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: "Failed to generate video" },
      { status: 500 }
    );
  }
}
