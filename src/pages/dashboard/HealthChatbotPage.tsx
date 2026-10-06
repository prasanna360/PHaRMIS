import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { Sparkles, Send, Bot, User as UserIcon, Info } from 'lucide-react';
import type { ChatMessage } from '@/types';

const demoResponses: { keywords: string[]; response: string }[] = [
  {
    keywords: ['headache', 'head pain', 'migraine'],
    response: "Headaches can have many causes including stress, dehydration, lack of sleep, or eye strain. Here are some general tips:\n\n• Stay hydrated — drink plenty of water\n• Rest in a quiet, dark room\n• Apply a cold compress to your forehead\n• Practice relaxation techniques\n\nIf headaches are frequent, severe, or accompanied by other symptoms like vision changes or fever, please consult a qualified healthcare professional.\n\n⚠️ This is general information, not medical advice.",
  },
  {
    keywords: ['sleep', 'insomnia', 'tired', 'fatigue'],
    response: "Good sleep is essential for overall health. Here are some tips for better sleep:\n\n• Maintain a consistent sleep schedule (same bedtime and wake time)\n• Aim for 7-9 hours of sleep per night\n• Avoid screens 30 minutes before bed\n• Create a comfortable, dark, and cool sleeping environment\n• Limit caffeine intake, especially after noon\n• Try relaxation techniques like deep breathing or meditation\n\nPersistent sleep issues should be discussed with a healthcare provider.\n\n⚠️ This is general information, not medical advice.",
  },
  {
    keywords: ['blood pressure', 'bp', 'hypertension'],
    response: "Blood pressure is an important vital sign. Normal blood pressure is typically around 120/80 mmHg.\n\nTo maintain healthy blood pressure:\n• Exercise regularly (150 min/week of moderate activity)\n• Reduce sodium intake\n• Maintain a healthy weight\n• Limit alcohol consumption\n• Manage stress through relaxation techniques\n• Monitor your blood pressure regularly\n\nIf your readings are consistently above 130/80 mmHg, please consult your healthcare provider.\n\n⚠️ This is general information, not medical advice.",
  },
  {
    keywords: ['weight', 'diet', 'nutrition', 'eating'],
    response: "Maintaining a healthy weight through balanced nutrition is key to overall health:\n\n• Eat a variety of fruits, vegetables, whole grains, and lean proteins\n• Stay hydrated (2-3 liters of water daily)\n• Limit processed foods and added sugars\n• Practice portion control and mindful eating\n• Aim for regular physical activity (7,000+ steps daily)\n• Track your weight trends rather than daily fluctuations\n\nFor personalized dietary advice, consider consulting a registered dietitian.\n\n⚠️ This is general information, not medical advice.",
  },
  {
    keywords: ['stress', 'anxiety', 'mental health', 'mood'],
    response: "Mental health is just as important as physical health. Here are some strategies:\n\n• Practice deep breathing exercises (4-7-8 technique)\n• Engage in regular physical activity\n• Maintain social connections with friends and family\n• Try mindfulness or meditation for 10 minutes daily\n• Ensure adequate sleep (7-9 hours)\n• Limit caffeine and alcohol\n• Consider journaling to process emotions\n\nIf you're feeling overwhelmed, persistent anxiety, or low mood, please reach out to a mental health professional. You're not alone.\n\n⚠️ This is general information, not medical advice.",
  },
  {
    keywords: ['exercise', 'workout', 'fitness', 'physical activity'],
    response: "Regular physical activity is one of the best things you can do for your health:\n\n• Aim for at least 150 minutes of moderate aerobic activity weekly\n• Include strength training 2 times per week\n• Start gradually if you're new to exercise\n• Choose activities you enjoy (walking, swimming, cycling, yoga)\n• Take 7,000-10,000 steps daily\n• Warm up before and cool down after exercise\n• Listen to your body and rest when needed\n\nIf you have existing health conditions, consult your doctor before starting a new exercise program.\n\n⚠️ This is general information, not medical advice.",
  },
  {
    keywords: ['water', 'hydration', 'dehydration'],
    response: "Staying hydrated is crucial for your body to function properly:\n\n• Aim for 2-3 liters of water daily (about 8-12 glasses)\n• Drink more if you're physically active or in hot weather\n• Carry a reusable water bottle as a reminder\n• Infuse water with lemon, cucumber, or mint for variety\n• Watch for signs of dehydration: dark urine, fatigue, dizziness\n• Herbal teas and water-rich foods also contribute to hydration\n\n⚠️ This is general information, not medical advice.",
  },
  {
    keywords: ['fever', 'temperature', 'cold', 'flu', 'cough'],
    response: "For common cold and flu symptoms:\n\n• Rest and stay hydrated\n• Gargle with warm salt water for sore throat\n• Use a humidifier for congestion\n• Monitor your temperature regularly\n• Eat light, nutritious foods\n\nSeek medical attention if you experience:\n• Temperature above 103°F (39.4°C)\n• Difficulty breathing\n• Persistent symptoms beyond 7-10 days\n• Severe headache or chest pain\n\n⚠️ This is general information, not medical advice. Please consult a healthcare professional for proper diagnosis.",
  },
];

const defaultResponse = "I'm here to help with general health and wellness questions! You can ask me about:\n\n• Sleep and fatigue\n• Blood pressure and heart rate\n• Stress and mental health\n• Exercise and fitness\n• Nutrition and hydration\n• Headaches and common symptoms\n\nWhat would you like to know? \n\n⚠️ Remember: I provide general health information, not medical diagnoses. Always consult a qualified healthcare professional for medical concerns.";

export function HealthChatbotPage() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'bot',
      content: "Hello! I'm PHaRMiS, your health assistant. I can help with general health questions, wellness tips, and lifestyle guidance. How can I help you today?\n\n⚠️ Please note: I provide general health information and cannot diagnose conditions. For medical concerns, always consult a qualified healthcare professional.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const getResponse = (query: string): string => {
    const lower = query.toLowerCase();
    for (const { keywords, response } of demoResponses) {
      if (keywords.some((k) => lower.includes(k))) return response;
    }
    return defaultResponse;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: input.trim(), timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = { id: crypto.randomUUID(), role: 'bot', content: getResponse(userMsg.content), timestamp: new Date().toISOString() };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    'How can I improve my sleep?',
    'What are normal blood pressure levels?',
    'Tips for managing stress',
    'How much water should I drink daily?',
  ];

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-extrabold text-ink-800 sm:text-3xl">Health Chatbot</h1>
        <p className="mt-1 text-sm text-ink-500">Ask general health questions and get wellness guidance</p>
      </div>

      <div className="card-base flex h-[600px] flex-col overflow-hidden animate-fade-in animate-delay-100">
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-ink-100 bg-gradient-lavender px-5 py-4">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-lavender-400 to-lavender-600 text-white">
              <Bot className="h-6 w-6" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-ink-800">PHaRMiS Health Assistant</p>
            <p className="text-xs text-emerald-600">● Online · Demo Mode</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5 bg-ink-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${msg.role === 'user' ? 'bg-rose-100 text-rose-600' : 'bg-gradient-to-br from-lavender-400 to-lavender-600 text-white'}`}>
                {msg.role === 'user' ? <UserIcon className="h-4.5 w-4.5" style={{ width: '1.125rem', height: '1.125rem' }} /> : <Bot className="h-4.5 w-4.5" style={{ width: '1.125rem', height: '1.125rem' }} />}
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-rose-500 text-white' : 'bg-white border border-ink-100 text-ink-700 shadow-soft'}`}>
                <p className="whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-lavender-400 to-lavender-600 text-white">
                <Bot className="h-4.5 w-4.5" style={{ width: '1.125rem', height: '1.125rem' }} />
              </div>
              <div className="rounded-2xl bg-white border border-ink-100 px-4 py-3 shadow-soft">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-2 w-2 rounded-full bg-lavender-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested questions */}
        {messages.length <= 1 && (
          <div className="border-t border-ink-100 bg-white p-3">
            <p className="mb-2 flex items-center gap-1.5 px-2 text-xs font-medium text-ink-400">
              <Sparkles className="h-3.5 w-3.5 text-lavender-400" /> Suggested questions
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="rounded-full border border-ink-200 bg-ink-50 px-3.5 py-1.5 text-xs font-medium text-ink-600 transition-all hover:border-lavender-300 hover:bg-lavender-50 hover:text-lavender-600"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-ink-100 bg-white p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask a health question..."
            className="flex-1 rounded-full border border-ink-200 bg-ink-50 px-4 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 transition-all focus:border-lavender-400 focus:outline-none focus:ring-4 focus:ring-lavender-100"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-500 text-white transition-all hover:bg-rose-600 disabled:opacity-40 disabled:pointer-events-none"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 animate-fade-in animate-delay-200">
        <Info className="h-5 w-5 flex-shrink-0 text-amber-600" />
        <p className="text-sm text-amber-800">
          <strong>Important:</strong> The PHaRMiS chatbot provides general health information and wellness tips using pre-defined demo responses. It cannot diagnose medical conditions or replace professional medical advice. For serious symptoms or health concerns, please consult a qualified healthcare professional.
        </p>
      </div>
    </div>
  );
}
