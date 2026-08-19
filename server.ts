import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Ask Kohli Career Assistant Endpoint
  app.post('/api/ask-kohli', async (req, res) => {
    try {
      const { question } = req.body;
      if (!question || typeof question !== 'string') {
        return res.status(400).json({ error: 'Question is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback responses when API key is not yet set in environment
        return res.json({
          answer:
            "I am the official Kohli Career Assistant. As of our 19 August 2026 verified baseline: Virat Kohli has scored 28,359 international runs with 85 international centuries (54 in ODIs, 30 in Tests, 1 in T20Is). He is retired from Test and T20I cricket and remains active in One Day Internationals and the IPL. For real-time custom AI queries, configure your GEMINI_API_KEY.",
          isVerifiedFallback: true,
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `
You are the official "Kohli Career Assistant" on "THE ERA OF KOHLI" digital museum platform.
Your ONLY role is to provide accurate, verified facts, statistics, historical match narratives, and tactical insights about Virat Kohli's cricket career.

VERIFIED CAREER BASELINE (As of 19 August 2026):
- International Totals: 562 Matches, 28,359 Runs, 85 Centuries, 148 Fifties, 52.71 Average.
- One Day Internationals (ACTIVE): 314 Matches, 14,941 Runs, 54 Centuries (All-Time World Record, surpassed Sachin Tendulkar's 49 in 2023 World Cup), 74 Fifties, 58.13 Average, 93.6 Strike Rate. 59 runs away from 15,000 ODI runs.
- Test Career (RETIRED): 123 Matches, 9,230 Runs, 30 Centuries, 31 Fifties, 7 Double Centuries as Captain, 48.83 Average.
- T20 International Career (RETIRED): 125 Matches, 4,188 Runs, 1 Century (122* vs AFG), 38 Fifties, 48.70 Average, 137.0 Strike Rate. 2024 T20 World Cup Champion & Player of the Match in Final (76 vs SA).
- IPL (ACTIVE): 252 Matches, 8,004 Runs, 8 Centuries, 55 Fifties, 973 Runs in 2016 (World Record).
- Most Famous Innings:
  - 82*(53) vs PAK at MCG 2022 (Shot of the Century off Haris Rauf)
  - 133*(86) vs SL at Hobart 2012 (321 chased in 36.4 overs)
  - 117(113) vs NZ at Wankhede 2023 (50th ODI Century, bowed to Sachin Tendulkar)
  - 76(59) vs SA at Barbados 2024 (T20 World Cup Final Player of the Match)
  - 183(148) vs PAK at Mirpur 2012 (Asia Cup Highest Score)
  - 149(225) vs ENG at Edgbaston 2018 (593 runs series)
- Captaincy: 40 Test wins out of 68 matches (58.8% win rate, 5 consecutive years ICC Test Mace #1). First Asian Captain to win Test Series in Australia (2018/19).
- Latest International Match: 19 July 2026 vs England at Lord's (74 off 60 balls, India Won).

CRITICAL RULES:
1. Speak as an objective, knowledgeable cricket historian/assistant. DO NOT pretend to be Virat Kohli speaking in first person.
2. If asked about something beyond the verified data, say: "I don't have verified data for that yet."
3. Keep answers concise, clear, and engaging (2 to 4 short paragraphs or bullet points).
4. Never hallucinate future matches or incorrect records.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: question,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      const text = response.text || "I was unable to generate an answer at this moment.";
      return res.json({ answer: text, isVerifiedFallback: false });
    } catch (error: any) {
      console.error('Error in /api/ask-kohli:', error);
      return res.status(500).json({
        error: 'Failed to process AI query',
        answer:
          "Kohli Career Assistant: Currently running on verified database mode. Career total: 28,359 international runs and 85 international centuries across 562 matches.",
      });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

 app.listen(PORT, 'localhost', () => {
  console.log(`The Era of Kohli server running on http://localhost:${PORT}`);
});
}

startServer();
