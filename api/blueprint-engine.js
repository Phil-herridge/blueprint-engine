import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_input } = req.body;

  if (!user_input) {
    return res.status(400).json({ error: "No user input provided" });
  }

  const systemPrompt = `
PASTE YOUR FULL SYSTEM PROMPT HERE
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: user_input }
      ]
    });

    res.status(200).json({
      response: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: "AI request failed" });
  }
}
