exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  // Only POST allowed
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Method Not Allowed",
      }),
    };
  }

  try {
    const { messages, model = "gemini-2.5-flash" } = JSON.parse(
      event.body || "{}"
    );

    // Get API key from Netlify Environment Variables
    const apiKey = process.env.AI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error:
            "AI_API_KEY is not configured in Netlify environment variables.",
        }),
      };
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Messages are required.",
        }),
      };
    }

    // Convert chat messages to Gemini format
    const formattedContents = messages.map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [
        {
          text: String(message.content || ""),
        },
      ],
    }));

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/` +
      `${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: formattedContents,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error:
            data?.error?.message || "Failed to fetch AI response.",
        }),
      };
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        reply,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: error?.message || "Internal Server Error",
      }),
    };
  }
};