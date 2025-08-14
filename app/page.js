'use client'

import React, { useState, useRef, useEffect } from 'react';

// Add inline styles for immediate fix
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fff7ed, #ffffff, #f0fdf4)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    background: 'linear-gradient(90deg, #f97316, #ffffff, #16a34a)',
    padding: '2rem 1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0.5rem 0'
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#4b5563',
    marginBottom: '1rem'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  },
  statItem: {
    textAlign: 'center'
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  mainContainer: {
    maxWidth: '7xl',
    margin: '0 auto',
    padding: '1.5rem',
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap'
  },
  chatContainer: {
    flex: '1',
    minWidth: '300px',
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  chatHeader: {
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb',
    background: 'linear-gradient(90deg, #fed7aa, #dcfce7)',
    borderRadius: '0.75rem 0.75rem 0 0'
  },
  messagesContainer: {
    height: '500px',
    overflowY: 'auto',
    padding: '1rem',
    background: '#f9fafb',
    scrollBehavior: 'auto'
  },
  messageUser: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem'
  },
  messageAI: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '1rem'
  },
  messageBubbleUser: {
    maxWidth: '70%',
    padding: '0.75rem 1rem',
    borderRadius: '1rem',
    background: 'linear-gradient(90deg, #f97316, #ea580c)',
    color: 'white',
    fontSize: '0.875rem',
    lineHeight: '1.5'
  },
  messageBubbleAI: {
    maxWidth: '85%',
    padding: '0.75rem 1rem',
    borderRadius: '1rem',
    background: 'white',
    color: '#1f2937',
    border: '1px solid #e5e7eb',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap'
  },
  inputContainer: {
    padding: '1rem',
    borderTop: '1px solid #e5e7eb',
    background: 'white',
    borderRadius: '0 0 0.75rem 0.75rem'
  },
  inputWrapper: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '0.75rem'
  },
  input: {
    flex: '1',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    outline: 'none',
    fontSize: '0.875rem'
  },
  sendButton: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(90deg, #f97316, #16a34a)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  quickPrompts: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  quickPrompt: {
    fontSize: '0.75rem',
    background: 'linear-gradient(90deg, #fed7aa, #fde68a)',
    color: '#9a3412',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  sidebar: {
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  sidebarCard: {
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #e5e7eb',
    padding: '1.5rem'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: '1.125rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  button: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    marginBottom: '0.75rem',
    transition: 'all 0.2s'
  },
  buttonOrange: {
    background: 'linear-gradient(90deg, #fb923c, #f97316)',
    color: 'white'
  },
  buttonGreen: {
    background: 'linear-gradient(90deg, #4ade80, #16a34a)',
    color: 'white'
  },
  buttonBlue: {
    background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
    color: 'white'
  },
  footer: {
    background: '#1f2937',
    color: 'white',
    padding: '2rem 1rem',
    marginTop: '3rem',
    textAlign: 'center'
  },
  specialCard: {
    background: 'linear-gradient(135deg, #fed7aa, #dcfce7)',
    border: '1px solid #fb923c'
  }
};

// Simple icon components
const MessageCircle = () => <span style={{fontSize: '1.2em'}}>💬</span>;
const Send = () => <span style={{fontSize: '1em'}}>➤</span>;
const Star = () => <span style={{fontSize: '1.2em'}}>⭐</span>;
const Calendar = () => <span style={{fontSize: '1em'}}>📅</span>;
const MapPin = () => <span style={{fontSize: '1em'}}>📍</span>;
const BookOpen = () => <span style={{fontSize: '1.2em'}}>📚</span>;
const Volume2 = () => <span style={{fontSize: '1em'}}>🔊</span>;
const Share2 = () => <span style={{fontSize: '1em'}}>📤</span>;
const Download = () => <span style={{fontSize: '1em'}}>⬇️</span>;
const Sparkles = () => <span style={{fontSize: '1.2em'}}>✨</span>;
const Users = () => <span style={{fontSize: '1em'}}>👥</span>;
const Award = () => <span style={{fontSize: '1em'}}>🏆</span>;
const Clock = () => <span style={{fontSize: '1em'}}>⏰</span>;

// Extended freedom fighters database with more heroes
const freedomFightersDB = {
  "aruna asaf ali": {
    name: "Aruna Asaf Ali",
    alias: "Grand Old Lady of Independence", 
    birth: "1909", death: "1996", region: "Delhi, Punjab",
    bio: "Aruna Asaf Ali was a legendary freedom fighter who hoisted the Indian National Congress flag at Gowalia Tank Maidan in Bombay during the Quit India Movement of 1942. Despite being underground for years, she continued to organize resistance against British rule.",
    achievements: ["Hoisted Congress flag during Quit India Movement (1942)", "Organized underground resistance networks", "First woman Mayor of Delhi", "Recipient of Lenin Peace Prize"],
    quote: "The secret of political bargaining is to look more strong than what you really are.",
    funFacts: ["Had a bounty of Rs. 5000 on her head", "Lived underground for 4 years", "Continued resistance even at age 80"],
    relatedFighters: ["Ram Manohar Lohia", "Usha Mehta", "Sucheta Kripalani"],
    rarity: "legendary"
  },
  "matangini hazra": {
    name: "Matangini Hazra",
    alias: "Gandhi Buri (Old Lady Gandhi)",
    birth: "1869", death: "1942", region: "Bengal",
    bio: "At 73, Matangini Hazra led thousands in the Quit India Movement in Bengal. This brave grandmother was shot by British police while leading a procession, but kept walking forward with the tricolor until she collapsed.",
    achievements: ["Led salt satyagraha at age 72", "Organized women's resistance groups", "Died holding the tricolor", "Inspired Bengal's freedom movement"],
    quote: "Vande Mataram! I will die with the flag in my hands!",
    funFacts: ["Started activism at age 60", "Called 'Gandhi Buri' by locals", "Shot 3 times but kept walking"],
    relatedFighters: ["Khudiram Bose", "Pritilata Waddedar", "Bina Das"],
    rarity: "rare"
  },
  "alluri sitarama raju": {
    name: "Alluri Sitarama Raju",
    alias: "Manyam Veerudu (Hero of the Jungles)",
    birth: "1897", death: "1924", region: "Andhra Pradesh", 
    bio: "Born in 1897, he led one of the most effective guerrilla campaigns against British rule from the hills and forests of Andhra Pradesh. He united tribal communities against colonial exploitation using traditional warfare tactics.",
    achievements: ["Led Rampa Rebellion of 1922-24", "United tribal communities", "Master of guerrilla warfare", "Fought against forest laws"],
    quote: "Freedom is our birthright, and we shall have it at any cost!",
    funFacts: ["Fluent in Telugu and English", "Expert in traditional weapons", "British deployed entire battalions to capture him"],
    relatedFighters: ["Komaram Bheem", "Birsa Munda", "Gunda Dhur"],
    rarity: "epic"
  },
  "tirot sing": {
    name: "Tirot Sing",
    alias: "Lion of Meghalaya",
    birth: "1802", death: "1835", region: "Meghalaya",
    bio: "Tirot Sing was a Khasi chief who led armed resistance against British expansion in Northeast India. He fought the Anglo-Khasi War (1829-1833) to protect his homeland from colonial annexation.",
    achievements: ["Led Anglo-Khasi War (1829-1833)", "United Khasi chiefs", "Guerrilla warfare expert", "Protected tribal sovereignty"],
    quote: "Our hills, our rules. No outsider shall dictate terms to the children of the soil!",
    funFacts: ["Youngest chief at age 25", "War lasted 4 years", "Used jungle warfare tactics"],
    relatedFighters: ["Rani Gaidinliu", "Jadonang", "Kushal Konwar"],
    rarity: "rare"
  },
  "udham singh": {
    name: "Udham Singh", 
    alias: "Shaheed-i-Azam Sardar Udham Singh",
    birth: "1899", death: "1940", region: "Punjab",
    bio: "Udham Singh avenged the Jallianwala Bagh massacre by assassinating Michael O'Dwyer, the former Lieutenant Governor of Punjab, in London on March 13, 1940. He waited 21 years for this moment.",
    achievements: ["Avenged Jallianwala Bagh massacre", "Assassinated Michael O'Dwyer in London", "Symbol of delayed but determined justice", "Inspired Punjabi resistance"],
    quote: "I did it because I had a grudge against him. He deserved it!",
    funFacts: ["Waited 21 years for revenge", "Changed identity multiple times", "Refused to appeal death sentence"],
    relatedFighters: ["Bhagat Singh", "Kartar Singh Sarabha", "Lala Lajpat Rai"],
    rarity: "legendary"
  },
  "khudiram bose": {
    name: "Khudiram Bose",
    alias: "The Young Revolutionary",
    birth: "1889", death: "1908", region: "Bengal",
    bio: "At just 18, Khudiram Bose became one of the youngest martyrs of the Indian independence movement. He was executed for his role in the Muzaffarpur conspiracy case.",
    achievements: ["Youngest revolutionary martyr", "Muzaffarpur bombing", "Inspired youth movement", "Symbol of fearless sacrifice"],
    quote: "I am proud to die for my motherland!",
    funFacts: ["Executed at age 18", "Smiled while going to gallows", "Became inspiration for youth"],
    relatedFighters: ["Prafulla Chaki", "Barindra Kumar Ghosh", "Aurobindo Ghosh"],
    rarity: "legendary"
  },
  "begum hazrat mahal": {
    name: "Begum Hazrat Mahal",
    alias: "The Rebel Queen of Awadh",
    birth: "1820", death: "1879", region: "Uttar Pradesh",
    bio: "Begum Hazrat Mahal led the rebellion in Lucknow during the Indian Rebellion of 1857. She refused British pension and chose exile over surrender.",
    achievements: ["Led 1857 rebellion in Lucknow", "Refused British offers", "Established independent government", "Symbol of royal resistance"],
    quote: "I will never accept the dominance of the British!",
    funFacts: ["Ruled Awadh independently", "Rejected British pension", "Died in exile in Nepal"],
    relatedFighters: ["Rani Lakshmibai", "Tatya Tope", "Nana Saheb"],
    rarity: "rare"
  },
  "birsa munda": {
    name: "Birsa Munda",
    alias: "Dharti Aba (Father of Earth)",
    birth: "1875", death: "1900", region: "Jharkhand",
    bio: "Birsa Munda led the tribal movement against British colonial rule and exploitation by landlords. He is revered as a folk hero among the tribal communities.",
    achievements: ["Led Munda rebellion", "Protected tribal rights", "Fought against forced conversions", "Established Birsaite movement"],
    quote: "My people will be free from the chains of oppression!",
    funFacts: ["Died at age 25", "Called 'Bhagwan' by tribals", "Jharkhand formed on his birth anniversary"],
    relatedFighters: ["Komaram Bheem", "Alluri Sitarama Raju", "Gunda Dhur"],
    rarity: "epic"
  },
  "pritilata waddedar": {
    name: "Pritilata Waddedar",
    alias: "The Brave Heart of Chittagong",
    birth: "1911", death: "1932", region: "Bengal",
    bio: "Pritilata Waddedar was a Bengali revolutionary who led an armed attack on the Pahartali European Club. She took cyanide to avoid capture.",
    achievements: ["Led Pahartali Club attack", "First woman to lead armed resistance", "Graduated with distinction", "Inspiring women revolutionaries"],
    quote: "Freedom is our birthright and we shall achieve it!",
    funFacts: ["Mathematics graduate", "Disguised as male for attack", "Youngest woman revolutionary leader"],
    relatedFighters: ["Surya Sen", "Kalpana Datta", "Bina Das"],
    rarity: "legendary"
  },
  "rani gaidinliu": {
    name: "Rani Gaidinliu",
    alias: "The Naga Queen",
    birth: "1915", death: "1993", region: "Manipur",
    bio: "Rani Gaidinliu was a Naga spiritual and political leader who led a revolt against British rule. Nehru gave her the title 'Rani' (Queen).",
    achievements: ["Led Naga independence movement", "Imprisoned for 14 years", "Preserved Naga culture", "Spiritual leader"],
    quote: "My people's freedom is worth any sacrifice!",
    funFacts: ["Started rebellion at age 13", "Imprisoned at 16", "Released only after independence"],
    relatedFighters: ["Jadonang", "Tirot Sing", "Kushal Konwar"],
    rarity: "rare"
  },
  "peer ali khan": {
    name: "Peer Ali Khan",
    alias: "The Fearless Martyr",
    birth: "1825", death: "1857", region: "Bihar",
    bio: "Peer Ali Khan was a freedom fighter who participated in the 1857 rebellion. He was executed by the British for his role in the uprising.",
    achievements: ["Participated in 1857 revolt", "Led resistance in Patna", "Sacrificed life for freedom", "Inspired local resistance"],
    quote: "Death is preferable to slavery!",
    funFacts: ["Fought in Patna region", "Executed publicly", "Remembered in folk songs"],
    relatedFighters: ["Kunwar Singh", "Amar Singh", "Tatya Tope"],
    rarity: "epic"
  },
  "tara rani srivastava": {
    name: "Tara Rani Srivastava",
    alias: "The Undaunted Spirit",
    birth: "1914", death: "2007", region: "Bihar",
    bio: "Tara Rani Srivastava continued leading protests even after her husband was shot by police during the Quit India Movement.",
    achievements: ["Led Quit India protests", "Continued after husband's death", "Symbol of determination", "Lifelong activist"],
    quote: "The struggle must continue despite personal loss!",
    funFacts: ["Husband died in her arms", "Continued protest immediately", "Active till old age"],
    relatedFighters: ["Aruna Asaf Ali", "Sucheta Kripalani", "Kamala Nehru"],
    rarity: "rare"
  }
};

// Quick prompts array
const quickPrompts = [
  "Tell me about Matangini Hazra",
  "Women freedom fighters from Bengal", 
  "Create Independence Day greeting",
  "Tribal heroes who fought British",
  "Freedom fighters from Punjab",
  "Generate social media post"
];

// Fallback responses when OpenAI is unavailable
const generateFallbackResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  for (const [key, fighter] of Object.entries(freedomFightersDB)) {
    if (lowerMessage.includes(key) || lowerMessage.includes(fighter.name.toLowerCase())) {
      return `🇮🇳 Let me tell you about ${fighter.name} - "${fighter.alias}"!

**Born:** ${fighter.birth} in ${fighter.region}
**Legacy:** ${fighter.alias}

${fighter.bio}

**Key Achievements:**
${fighter.achievements.map(achievement => `• ${achievement}`).join('\n')}

**Inspiring Quote:** "${fighter.quote}"

**Fascinating Facts:**
${fighter.funFacts.map(fact => `🔹 ${fact}`).join('\n')}

**Connected Heroes:** ${fighter.relatedFighters.join(', ')}

Would you like to know more about their specific contributions or create a personalized greeting with their story?`;
    }
  }

  if (lowerMessage.includes('greeting') || lowerMessage.includes('independence day')) {
    const randomFighter = Object.values(freedomFightersDB)[Math.floor(Math.random() * Object.values(freedomFightersDB).length)];
    
    return `🎨 Here's a personalized Independence Day greeting featuring a forgotten hero:

🇮🇳 **"This Independence Day, let's honor ${randomFighter.name} from ${randomFighter.region}** ${randomFighter.name}, known as "${randomFighter.alias}", showed us that ${randomFighter.achievements[0].toLowerCase()}. Their words still inspire us: 

*"${randomFighter.quote}"*

As we celebrate freedom on August 15th, let's remember that liberty came through the sacrifices of countless unsung heroes like ${randomFighter.name}. May their courage guide us toward a better India! 

**Jai Hind! 🇮🇳**"

Would you like me to create another greeting with a different hero?`;
  }

  return `🇮🇳 Welcome! I'm your AI historian, passionate about sharing the stories of India's forgotten freedom fighters. 

**I can help you discover:**
🌟 Lesser-known heroes from your state or region
👑 Brave women freedom fighters who changed history  
🏹 Tribal warriors who protected their homeland
🎨 Create personalized Independence Day greetings

**Some incredible forgotten heroes I love talking about:**
• **Matangini Hazra** - Bengal's 73-year-old revolutionary grandmother
• **Alluri Sitarama Raju** - Andhra's jungle warrior who fought guerrilla battles
• **Tirot Sing** - Meghalaya's Khasi chief who resisted British expansion
• **Aruna Asaf Ali** - The woman who hoisted the Congress flag in 1942

What story would you like to discover today? 🌟`;
};

export default function Home() {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "🙏 Namaste! I'm Guruji, your passionate AI historian who lives and breathes the stories of India's forgotten freedom fighters! 🇮🇳\n\n🌟 On this glorious Independence Day, as we celebrate 78 years of freedom, it's the perfect time to discover the incredible heroes whose names history books forgot. I know the stories of brave grandmothers who faced British bullets, young revolutionaries who sacrificed everything, and tribal warriors who defended their homeland with ancient wisdom!\n\n🔥 Ready to explore some mind-blowing stories? Ask me about:\n• Lesser-known heroes from your state\n• Fierce women warriors who changed history  \n• Tribal freedom fighters and their guerrilla tactics\n• Create personalized Independence Day greetings\n\nWhat amazing story shall we uncover today? 🌟",
      timestamp: "Just now"
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState(null);
  const [language, setLanguage] = useState('en');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [stats, setStats] = useState({
    users: 1247,
    stories: 156,
    greetings: 423
  });
  const [isClient, setIsClient] = useState(false);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [discoveredHeroes, setDiscoveredHeroes] = useState(new Set());
  const messagesEndRef = useRef(null);

  // Initialize with random 4 cards
  useEffect(() => {
    const allFighters = Object.values(freedomFightersDB);
    const shuffled = [...allFighters].sort(() => Math.random() - 0.5);
    setDisplayedCards(shuffled.slice(0, 4));
    setDiscoveredHeroes(new Set(shuffled.slice(0, 4).map(f => f.name)));
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: prev.users + Math.floor(Math.random() * 3),
        stories: prev.stories + Math.floor(Math.random() * 2),
        greetings: prev.greetings + Math.floor(Math.random() * 5)
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getTimestamp = () => {
    if (!isClient) return "Just now";
    return new Date().toLocaleTimeString();
  };

  // Enhanced formatting function for AI responses
  const formatAIResponse = (content) => {
    let formatted = content.replace(/\*\*/g, '').replace(/\*/g, '').replace(/###/g, '').replace(/##/g, '').replace(/#/g, '');
    formatted = formatted.replace(/dost,?/gi, '').replace(/,\s*dost/gi, '');
    
    const lines = formatted.split('\n');
    
    return (
      <div>
        {lines.map((line, index) => {
          if (line.trim() === '' || line.trim().match(/^[#*\-=]+$/)) {
            return <div key={index} style={{height: '0.5rem'}} />;
          }
          
          if (line.includes('Achievement') || line.includes('Key Facts') || line.includes('Born:') || 
              line.includes('Legacy:') || line.includes('Quote:') || line.includes('Famous for:') ||
              line.includes('Special Attributes:')) {
            return (
              <div key={index} style={{fontWeight: 'bold', color: '#ea580c', marginBottom: '0.5rem'}}>
                {line}
              </div>
            );
          }
          
          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            return (
              <div key={index} style={{color: '#16a34a', fontWeight: '500', marginLeft: '1rem', marginBottom: '0.25rem'}}>
                {line}
              </div>
            );
          }
          
          if (line.includes('"') && (line.includes('said') || line.includes('quote') || line.includes(':'))) {
            return (
              <div key={index} style={{fontStyle: 'italic', color: '#7c3aed', padding: '0.5rem', background: 'rgba(124, 58, 237, 0.1)', borderRadius: '0.25rem', marginBottom: '0.5rem'}}>
                {line}
              </div>
            );
          }
          
          return line.trim() ? (
            <div key={index} style={{marginBottom: '0.5rem', lineHeight: '1.6'}}>
              {line}
            </div>
          ) : (
            <div key={index} style={{height: '0.5rem'}} />
          );
        })}
      </div>
    );
  };

  const callOpenAI = async (userMessage, chatHistory) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: chatHistory.slice(-6)
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.fallback) {
        throw new Error('API fallback triggered');
      }

      return data.response || "I'm having some technical difficulties accessing my vast knowledge of freedom fighters. Let me share what I remember...";

    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      type: 'user',
      content: input,
      timestamp: getTimestamp()
    };

    setMessages(prev => [...prev, userMessage]);
    
    const newHistory = [
      ...conversationHistory,
      { role: "user", content: input }
    ];
    
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const aiResponse = await callOpenAI(currentInput, newHistory);
      
      setMessages(prev => [...prev, {
        type: 'ai',
        content: aiResponse,
        timestamp: getTimestamp()
      }]);

      setConversationHistory([
        ...newHistory,
        { role: "assistant", content: aiResponse }
      ].slice(-12));

      const fighterNames = Object.keys(freedomFightersDB);
      const mentionedFighter = fighterNames.find(name => 
        currentInput.toLowerCase().includes(name) || 
        aiResponse.toLowerCase().includes(freedomFightersDB[name].name.toLowerCase())
      );
      if (mentionedFighter) {
        setSelectedFighter(freedomFightersDB[mentionedFighter]);
      }

    } catch (error) {
      const fallbackResponse = generateFallbackResponse(currentInput);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: fallbackResponse,
        timestamp: getTimestamp()
      }]);
    }
    
    setIsTyping(false);
    
    setTimeout(() => {
      const chatContainer = document.querySelector('[style*="height: 500px"]');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const generateVisualCard = (heroData) => {
    const cardWindow = window.open('', 'GreetingCard', 'width=500,height=700,scrollbars=yes');
    
    const cardHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Independence Day Greeting - ${heroData.name}</title>
        <style>
          body { margin: 0; padding: 20px; font-family: 'Arial', sans-serif; background: #f0f0f0; }
          .card { 
            width: 400px; 
            height: 600px; 
            background: linear-gradient(45deg, #FF6B35 0%, #FFFFFF 50%, #138808 100%);
            margin: 0 auto;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            padding: 30px;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
          }
          .hero-name {
            color: #138808;
            text-align: center;
            margin: 0 0 8px 0;
            font-size: 28px;
            font-weight: bold;
          }
          .quote {
            font-style: italic;
            text-align: center;
            color: #333;
            margin: 0;
            font-size: 16px;
            line-height: 1.4;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🇮🇳 Independence Day 🇮🇳</h1>
          <h2 class="hero-name">${heroData.name}</h2>
          <p class="quote">"${heroData.quote}"</p>
        </div>
      </body>
      </html>
    `;
    
    cardWindow.document.write(cardHTML);
    cardWindow.document.close();
  };

  return (
    <div style={{...styles.container, overflow: 'hidden'}}>
      <div style={styles.header}>
        <div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
            <span style={{fontSize: '2.5rem'}}>🇮🇳</span>
            <h1 style={styles.title}>Azadi Ke Asli Hero</h1>
            <span style={{fontSize: '2.5rem'}}>🇮🇳</span>
          </div>
          <p style={styles.subtitle}>Discover India's Forgotten Freedom Fighters</p>
          
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center'}}>
                <Users />
                <span style={{...styles.statNumber, color: '#ea580c'}}>{stats.users.toLocaleString()}</span>
              </div>
              <span style={styles.statLabel}>Heroes Discovered</span>
            </div>
            <div style={styles.statItem}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center'}}>
                <BookOpen />
                <span style={{...styles.statNumber, color: '#16a34a'}}>{stats.stories}</span>
              </div>
              <span style={styles.statLabel}>Stories Shared</span>
            </div>
            <div style={styles.statItem}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center'}}>
                <Award />
                <span style={{...styles.statNumber, color: '#2563eb'}}>{stats.greetings}</span>
              </div>
              <span style={styles.statLabel}>Greetings Created</span>
            </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'}}>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '2px solid #d1d5db', background: 'white'}}
            >
              <option value="en">🇬🇧 English</option>
              <option value="hi">🇮🇳 हिंदी</option>
              <option value="bn">🇧🇩 বাংলা</option>
              <option value="ta">🇮🇳 தமிழ்</option>
              <option value="te">🇮🇳 తెలుగు</option>
            </select>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#fee2e2', borderRadius: '0.5rem'}}>
              <Clock />
              <span style={{color: '#dc2626', fontWeight: '600'}}>Independence Day: Aug 15! 🇮🇳</span>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.mainContainer}>
        <div style={styles.chatContainer}>
          <div style={styles.chatHeader}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <div style={{width: '2.5rem', height: '2.5rem', background: 'linear-gradient(90deg, #f97316, #16a34a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <BookOpen />
                </div>
                <div>
                  <h2 style={{fontWeight: 'bold', color: '#1f2937', margin: 0}}>AI Historian</h2>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                    <div style={{width: '0.5rem', height: '0.5rem', background: '#16a34a', borderRadius: '50%'}}></div>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Online & Ready</span>
                  </div>
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Sparkles />
                <span style={{fontSize: '0.875rem', fontWeight: '600', color: '#4b5563'}}>Powered by AI</span>
              </div>
            </div>
          </div>

          <div style={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div key={index} style={message.type === 'user' ? styles.messageUser : styles.messageAI}>
                <div style={message.type === 'user' ? styles.messageBubbleUser : styles.messageBubbleAI}>
                  <div style={{whiteSpace: 'pre-wrap'}}>
                    {message.type === 'ai' 
                      ? formatAIResponse(message.content)
                      : message.content
                    }
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.1)'}}>
                    <span style={{fontSize: '0.75rem', opacity: 0.7}}>{message.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={styles.messageAI}>
                <div style={styles.messageBubbleAI}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <div style={{display: 'flex', gap: '0.25rem'}}>
                      <div style={{width: '0.5rem', height: '0.5rem', background: '#fb923c', borderRadius: '50%'}}></div>
                      <div style={{width: '0.5rem', height: '0.5rem', background: '#fb923c', borderRadius: '50%'}}></div>
                      <div style={{width: '0.5rem', height: '0.5rem', background: '#fb923c', borderRadius: '50%'}}></div>
                    </div>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>AI Historian is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={styles.inputContainer}>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about any freedom fighter, region, or request a greeting..."
                style={styles.input}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                style={{...styles.sendButton, opacity: (!input.trim() || isTyping) ? 0.5 : 1}}
              >
                <Send />
              </button>
            </div>
            
            <div style={styles.quickPrompts}>
              {quickPrompts.map((prompt, index) => (
                <button 
                  key={index}
                  onClick={() => setInput(prompt)}
                  style={styles.quickPrompt}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.sidebar}>
          {selectedFighter && (
            <div style={styles.sidebarCard}>
              <h3 style={styles.cardTitle}>
                <Star />
                Featured Hero
              </h3>
              <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                <div style={{width: '6rem', height: '6rem', background: 'linear-gradient(135deg, #fed7aa, #dcfce7)', borderRadius: '50%', margin: '0 auto 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4b5563'}}>
                    {selectedFighter.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 style={{fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.25rem 0'}}>{selectedFighter.name}</h4>
                <p style={{fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic', margin: 0}}>{selectedFighter.alias}</p>
              </div>
              <div style={{marginBottom: '1rem', fontSize: '0.875rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                  <Calendar />
                  <span>{selectedFighter.birth} - {selectedFighter.death}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <MapPin />
                  <span>{selectedFighter.region}</span>
                </div>
              </div>
              <div style={{padding: '0.75rem', background: 'linear-gradient(90deg, #fff7ed, #f0fdf4)', borderRadius: '0.5rem', borderLeft: '4px solid #fb923c', marginBottom: '1rem'}}>
                <p style={{fontSize: '0.875rem', fontStyle: 'italic', color: '#4b5563', margin: 0}}>"{selectedFighter.quote}"</p>
              </div>
              <button 
                onClick={() => setInput(`Tell me more about ${selectedFighter.name}`)}
                style={{...styles.button, ...styles.buttonOrange, margin: 0}}
              >
                Learn More
              </button>
            </div>
          )}

          <div style={styles.sidebarCard}>
            <h3 style={styles.cardTitle}>
              <BookOpen />
              Discover Heroes
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              {Object.values(freedomFightersDB).slice(0, 3).map((fighter, index) => (
                <div key={index} 
                     style={{border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.75rem', cursor: 'pointer', transition: 'all 0.2s'}}
                     onClick={() => setInput(`Tell me about ${fighter.name}`)}>
                  <h4 style={{fontWeight: '600', fontSize: '0.875rem', color: '#1f2937', margin: '0 0 0.25rem 0'}}>{fighter.name}</h4>
                  <p style={{fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.25rem 0'}}>{fighter.region} • {fighter.birth}-{fighter.death}</p>
                  <p style={{fontSize: '0.75rem', color: '#4b5563', margin: 0}}>{fighter.bio.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{...styles.sidebarCard, ...styles.specialCard}}>
            <h3 style={styles.cardTitle}>
              <Sparkles />
              Independence Day Special
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              <button 
                onClick={() => {
                  const featuredHero = Object.values(freedomFightersDB)[Math.floor(Math.random() * Object.values(freedomFightersDB).length)];
                  generateVisualCard(featuredHero);
                }}
                style={{...styles.button, ...styles.buttonOrange, margin: 0}}
              >
                🎨 Generate Visual Greeting Card
              </button>
              <button 
                onClick={() => setInput("Design a social media visual post about Udham Singh with Indian flag theme, his photo, key achievements, and motivational quote. Include Independence Day 2025 text.")}
                style={{...styles.button, ...styles.buttonGreen, margin: 0}}
              >
                📱 Create Visual Social Post
              </button>
              <button 
                onClick={() => setInput("Create a visual tribute to women freedom fighters with photos, quotes, and achievements in a beautiful Independence Day themed layout.")}
                style={{...styles.button, ...styles.buttonBlue, margin: 0}}
              >
                <span style={{marginRight: '0.5rem'}}><Download /></span>
                👑 Women Warriors Visuals
              </button>
            </div>
          </div>

          <div style={styles.sidebarCard}>
            <h3 style={styles.cardTitle}>🃏 Hero Trading Cards</h3>
            
            {/* Collection Progress */}
            <div style={{marginBottom: '1rem', padding: '0.75rem', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '0.5rem', border: '1px solid #f59e0b'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                <span style={{fontSize: '0.75rem', fontWeight: '600', color: '#92400e'}}>Collection Progress</span>
                <span style={{fontSize: '0.75rem', color: '#92400e'}}>{discoveredHeroes.size}/{Object.keys(freedomFightersDB).length} Discovered</span>
              </div>
              <div style={{width: '100%', height: '6px', background: '#fed7aa', borderRadius: '3px', overflow: 'hidden'}}>
                <div style={{width: `${(discoveredHeroes.size / Object.keys(freedomFightersDB).length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #f97316, #ea580c)', borderRadius: '3px'}}></div>
              </div>
            </div>

            {/* Trading Cards Grid */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem'}}>
              {displayedCards.map((fighter, index) => {
                const getRarityInfo = (rarity) => {
                  switch(rarity) {
                    case 'legendary': return { badge: '💎 LEGENDARY', colors: '#fef3c7, #f59e0b' };
                    case 'rare': return { badge: '🔥 RARE', colors: '#dcfce7, #16a34a' };
                    case 'epic': return { badge: '⚡ EPIC', colors: '#e0e7ff, #3b82f6' };
                    default: return { badge: '⭐ HERO', colors: '#fce7f3, #ec4899' };
                  }
                };
                
                const rarityInfo = getRarityInfo(fighter.rarity);
                
                return (
                  <div 
                    key={`${fighter.name}-${index}`}
                    style={{
                      perspective: '1000px',
                      height: '140px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedFighter(selectedFighter?.name === fighter.name ? null : fighter)}
                  >
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s',
                      transform: selectedFighter?.name === fighter.name ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}>
                      {/* Card Front */}
                      <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        borderRadius: '0.5rem',
                        background: `linear-gradient(135deg, ${rarityInfo.colors})`,
                        padding: '0.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        border: '2px solid rgba(0,0,0,0.1)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                      }}>
                        <div style={{textAlign: 'center'}}>
                          <div style={{
                            width: '40px', 
                            height: '40px', 
                            background: 'rgba(255,255,255,0.3)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 0.5rem',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            color: '#1f2937'
                          }}>
                            {fighter.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <h4 style={{fontSize: '0.7rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.25rem 0', lineHeight: '1.2'}}>{fighter.name}</h4>
                          <p style={{fontSize: '0.6rem', color: '#4b5563', margin: 0}}>{fighter.region}</p>
                        </div>
                        <div style={{textAlign: 'center'}}>
                          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#6b7280'}}>
                            <span>{fighter.birth}</span>
                            <span>•</span>
                            <span>{fighter.death}</span>
                          </div>
                          <div style={{fontSize: '0.6rem', color: '#7c3aed', fontWeight: '600', marginTop: '0.25rem'}}>
                            {rarityInfo.badge}
                          </div>
                        </div>
                      </div>

                      {/* Card Back */}
                      <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        borderRadius: '0.5rem',
                        background: 'linear-gradient(135deg, #1f2937, #374151)',
                        padding: '0.75rem',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        border: '2px solid #fb923c',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}>
                        <div>
                          <h4 style={{fontSize: '0.7rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#fb923c'}}>{fighter.alias}</h4>
                          <p style={{fontSize: '0.55rem', lineHeight: '1.3', margin: '0 0 0.5rem 0', color: '#d1d5db'}}>{fighter.bio.substring(0, 80)}...</p>
                        </div>
                        <div>
                          <div style={{fontSize: '0.55rem', fontStyle: 'italic', color: '#fbbf24', textAlign: 'center', marginBottom: '0.25rem'}}>
                            "{fighter.quote.substring(0, 50)}..."
                          </div>
                          <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '0.55rem'}}>
                            <div style={{textAlign: 'center', color: '#dc2626'}}>
                              <div>⚔️</div>
                              <div>{Math.floor(Math.random() * 20) + 80}</div>
                            </div>
                            <div style={{textAlign: 'center', color: '#16a34a'}}>
                              <div>🧠</div>
                              <div>{Math.floor(Math.random() * 20) + 80}</div>
                            </div>
                            <div style={{textAlign: 'center', color: '#2563eb'}}>
                              <div>⭐</div>
                              <div>{Math.floor(Math.random() * 20) + 80}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <button
                onClick={() => {
                  const allFighters = Object.values(freedomFightersDB);
                  // Shuffle array and pick 4 unique heroes
                  const shuffled = [...allFighters].sort(() => Math.random() - 0.5);
                  const newCards = [];
                  const usedNames = new Set();
                  
                  for (const fighter of shuffled) {
                    if (!usedNames.has(fighter.name) && newCards.length < 4) {
                      newCards.push(fighter);
                      usedNames.add(fighter.name);
                    }
                  }
                  
                  setDisplayedCards(newCards);
                  setDiscoveredHeroes(prev => new Set([...prev, ...newCards.map(f => f.name)]));
                  setSelectedFighter(null);
                }}
                style={{
                  padding: '0.6rem 1rem',
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                🎲 Discover Random Heroes
              </button>
            </div>

            {/* Quick Stats */}
            <div style={{marginTop: '1rem', padding: '0.75rem', background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)', borderRadius: '0.5rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#4b5563'}}>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontWeight: 'bold', color: '#f59e0b'}}>💎 {[...discoveredHeroes].filter(name => {
                    const fighter = Object.values(freedomFightersDB).find(f => f.name === name);
                    return fighter?.rarity === 'legendary';
                  }).length}</div>
                  <div>Legendary</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontWeight: 'bold', color: '#16a34a'}}>🔥 {[...discoveredHeroes].filter(name => {
                    const fighter = Object.values(freedomFightersDB).find(f => f.name === name);
                    return fighter?.rarity === 'rare';
                  }).length}</div>
                  <div>Rare</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontWeight: 'bold', color: '#3b82f6'}}>⚡ {[...discoveredHeroes].filter(name => {
                    const fighter = Object.values(freedomFightersDB).find(f => f.name === name);
                    return fighter?.rarity === 'epic';
                  }).length}</div>
                  <div>Epic</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontWeight: 'bold', color: '#ec4899'}}>⭐ {[...discoveredHeroes].filter(name => {
                    const fighter = Object.values(freedomFightersDB).find(f => f.name === name);
                    return !fighter?.rarity || (fighter?.rarity !== 'legendary' && fighter?.rarity !== 'rare' && fighter?.rarity !== 'epic');
                  }).length}</div>
                  <div>Hero</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <div style={{maxWidth: '7xl', margin: '0 auto', padding: '0 1rem'}}>
          <p style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', margin: '0 0 0.5rem 0'}}>🇮🇳 Every Hero Has a Story. Every Story Deserves to be Told. 🇮🇳</p>
          <p style={{fontSize: '0.875rem', color: '#9ca3af', margin: '0 0 1rem 0'}}>Preserving India's Heritage • One Story at a Time • Independence Day 2025</p>
          
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #374151'}}>
            <span style={{fontSize: '0.875rem', color: '#9ca3af'}}>Proudly Built by</span>
            <a 
              href="https://www.instagram.com/monetiqai?utm_source=qr&igsh=MWQ1dzlwcWxoMzYzeg=="
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                padding: '0.5rem',
                borderRadius: '8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '32px', 
                height: '32px', 
                background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <div style={{
                  fontSize: '1.125rem', 
                  fontWeight: 'bold', 
                  color: 'white',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  MonetIQ
                </div>
                <div style={{
                  fontSize: '0.75rem', 
                  color: '#9ca3af',
                  fontStyle: 'italic',
                  marginTop: '-2px'
                }}>
                  Smart Money. Smarter You.
                </div>
              </div>
            </a>
          </div>
          
          <div style={{
            fontSize: '0.75rem', 
            color: '#6b7280', 
            textAlign: 'center',
            marginTop: '0.75rem'
          }}>
            Building AI solutions that preserve heritage and empower communities 🚀
          </div>
        </div>
      </div>
    </div>
  );
}