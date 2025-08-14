// pages/api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;
    
    const systemPrompt = `You are Guruji, an enthusiastic AI historian specializing in India's forgotten freedom fighters. Focus on lesser-known heroes and their inspiring stories. TODAY: August 12, 2025 - 3 days before Independence Day!`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory.slice(-6),
          { role: 'user', content: message }
        ],
        max_tokens: 400,
        temperature: 0.8,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    res.status(200).json({ 
      response: data.choices[0]?.message?.content,
      usage: data.usage 
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      fallback: true 
    });
  }
}