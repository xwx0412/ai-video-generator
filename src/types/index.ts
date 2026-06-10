export interface GenerateRequest {
  prompt?: string;
  image?: string;
}

export interface GenerateResponse {
  video_url: string;
  id: string;
  createdAt: string;
}

export interface VideoRecord {
  id: string;
  prompt: string;
  imageUrl?: string;
  videoUrl: string;
  createdAt: string;
  status: "generating" | "completed" | "failed";
}
