import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { message, conversationHistory } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are Guruji, a passionate AI historian specializing in India's forgotten freedom fighters. Provide engaging, educational responses about lesser-known heroes of the independence movement."
        },
        ...conversationHistory,
        { role: "user", content: message }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    return Response.json({
      response: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return Response.json(
      { error: 'Failed to get AI response', fallback: true },
      { status: 500 }
    );
  }
}