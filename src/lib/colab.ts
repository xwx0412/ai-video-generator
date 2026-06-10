const COLAB_ENDPOINT = process.env.COLAB_URL || "";

export async function sendToColab(prompt?: string, imageBase64?: string): Promise<{ video_url: string }> {
  if (!COLAB_ENDPOINT) {
    return {
      video_url:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);

  try {
    const response = await fetch(`${COLAB_ENDPOINT}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, image: imageBase64 }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Colab API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error: any) {
    clearTimeout(timeout);
    if (error.name === "AbortError") {
      throw new Error("Request timeout - video generation took too long");
    }
    throw error;
  }
}
