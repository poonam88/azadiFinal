"use client";
import React, { useState, useEffect } from 'react';

const Send = () => <span>➤</span>;
const Star = () => <span>⭐</span>;
const Calendar = () => <span>📅</span>;
const MapPin = () => <span>📍</span>;
const BookOpen = () => <span>📚</span>;
const Sparkles = () => <span>✨</span>;
const Users = () => <span>👥</span>;
const Award = () => <span>🏆</span>;
const Clock = () => <span>⏰</span>;

const freedomFightersDB = {
  "aruna asaf ali": {
    name: "Aruna Asaf Ali",
    alias: "Grand Old Lady of Independence", 
    birth: "1909", death: "1996", region: "Delhi, Punjab",
    bio: "Aruna Asaf Ali was a legendary freedom fighter who hoisted the Indian National Congress flag at Gowalia Tank Maidan in Bombay during the Quit India Movement of 1942.",
    achievements: ["Hoisted Congress flag during Quit India Movement (1942)", "Organized underground resistance networks", "First woman Mayor of Delhi"],
    quote: "The secret of political bargaining is to look more strong than what you really are.",
    funFacts: ["Had a bounty of Rs. 5000 on her head", "Lived underground for 4 years", "Continued resistance even at age 80"],
    rarity: "legendary"
  },
  "matangini hazra": {
    name: "Matangini Hazra",
    alias: "Gandhi Buri (Old Lady Gandhi)",
    birth: "1869", death: "1942", region: "Bengal",
    bio: "At 73, Matangini Hazra led thousands in the Quit India Movement in Bengal. This brave grandmother was shot by British police but kept walking forward with the tricolor.",
    achievements: ["Led salt satyagraha at age 72", "Organized women's resistance groups", "Died holding the tricolor"],
    quote: "Vande Mataram! I will die with the flag in my hands!",
    funFacts: ["Started activism at age 60", "Called 'Gandhi Buri' by locals", "Shot 3 times but kept walking"],
    rarity: "legendary"
  },
  "alluri sitarama raju": {
    name: "Alluri Sitarama Raju",
    alias: "Manyam Veerudu (Hero of the Jungles)",
    birth: "1897", death: "1924", region: "Andhra Pradesh", 
    bio: "He led one of the most effective guerrilla campaigns against British rule from the hills and forests of Andhra Pradesh.",
    achievements: ["Led Rampa Rebellion of 1922-24", "United tribal communities", "Master of guerrilla warfare"],
    quote: "Freedom is our birthright, and we shall have it at any cost!",
    funFacts: ["Fluent in Telugu and English", "Expert in traditional weapons", "British deployed entire battalions to capture him"],
    rarity: "legendary"
  },
  "tirot sing": {
    name: "Tirot Sing",
    alias: "Lion of Meghalaya",
    birth: "1802", death: "1835", region: "Meghalaya",
    bio: "Tirot Sing was a Khasi chief who led armed resistance against British expansion in Northeast India.",
    achievements: ["Led Anglo-Khasi War (1829-1833)", "United Khasi chiefs", "Guerrilla warfare expert"],
    quote: "Our hills, our rules. No outsider shall dictate terms to the children of the soil!",
    funFacts: ["Youngest chief at age 25", "War lasted 4 years", "Used jungle warfare tactics"],
    rarity: "legendary"
  },
  "udham singh": {
    name: "Udham Singh", 
    alias: "Shaheed-i-Azam Sardar Udham Singh",
    birth: "1899", death: "1940", region: "Punjab",
    bio: "Udham Singh avenged the Jallianwala Bagh massacre by assassinating Michael O'Dwyer in London on March 13, 1940.",
    achievements: ["Avenged Jallianwala Bagh massacre", "Assassinated Michael O'Dwyer in London", "Symbol of delayed justice"],
    quote: "I did it because I had a grudge against him. He deserved it!",
    funFacts: ["Waited 21 years for revenge", "Changed identity multiple times", "Refused to appeal death sentence"],
    rarity: "rare"
  },
  "khudiram bose": {
    name: "Khudiram Bose",
    alias: "The Young Revolutionary",
    birth: "1889", death: "1908", region: "Bengal",
    bio: "At just 18, Khudiram Bose became one of the youngest martyrs of the Indian independence movement.",
    achievements: ["Youngest revolutionary martyr", "Muzaffarpur bombing", "Inspired youth movement"],
    quote: "I am proud to die for my motherland!",
    funFacts: ["Executed at age 18", "Smiled while going to gallows", "Became inspiration for youth"],
    rarity: "rare"
  },
  "begum hazrat mahal": {
    name: "Begum Hazrat Mahal",
    alias: "The Rebel Queen of Awadh",
    birth: "1820", death: "1879", region: "Uttar Pradesh",
    bio: "Begum Hazrat Mahal led the rebellion in Lucknow during the Indian Rebellion of 1857.",
    achievements: ["Led 1857 rebellion in Lucknow", "Refused British offers", "Established independent government"],
    quote: "I will never accept the dominance of the British!",
    funFacts: ["Ruled Awadh independently", "Rejected British pension", "Died in exile in Nepal"],
    rarity: "rare"
  },
  "birsa munda": {
    name: "Birsa Munda",
    alias: "Dharti Aba (Father of Earth)",
    birth: "1875", death: "1900", region: "Jharkhand",
    bio: "Birsa Munda led the tribal movement against British colonial rule and exploitation by landlords.",
    achievements: ["Led Munda rebellion", "Protected tribal rights", "Fought against forced conversions"],
    quote: "My people will be free from the chains of oppression!",
    funFacts: ["Died at age 25", "Called 'Bhagwan' by tribals", "Jharkhand formed on his birth anniversary"],
    rarity: "rare"
  },
  "pritilata waddedar": {
    name: "Pritilata Waddedar",
    alias: "The Brave Heart of Chittagong",
    birth: "1911", death: "1932", region: "Bengal",
    bio: "Pritilata Waddedar was a Bengali revolutionary who led an armed attack on the Pahartali European Club.",
    achievements: ["Led Pahartali Club attack", "First woman to lead armed resistance", "Graduated with distinction"],
    quote: "Freedom is our birthright and we shall achieve it!",
    funFacts: ["Mathematics graduate", "Disguised as male for attack", "Youngest woman revolutionary leader"],
    rarity: "epic"
  },
  "rani gaidinliu": {
    name: "Rani Gaidinliu",
    alias: "The Naga Queen",
    birth: "1915", death: "1993", region: "Manipur",
    bio: "Rani Gaidinliu was a Naga spiritual and political leader who led a revolt against British rule.",
    achievements: ["Led Naga independence movement", "Imprisoned for 14 years", "Preserved Naga culture"],
    quote: "My people's freedom is worth any sacrifice!",
    funFacts: ["Started rebellion at age 13", "Imprisoned at 16", "Released only after independence"],
    rarity: "epic"
  }
};

const quickPrompts = [
  "Tell me about Matangini Hazra",
  "Women freedom fighters from Bengal", 
  "Create Independence Day greeting",
  "Tribal heroes who fought British",
  "Freedom fighters from Punjab",
  "Generate social media post"
];

const generateVisualCard = (heroData) => {
  const cardWindow = window.open('', 'GreetingCard', 'width=550,height=900,scrollbars=yes');
  
  const cardHTML = `<!DOCTYPE html>
<html>
<head>
  <title>Independence Day Greeting - ${heroData.name}</title>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      margin: 0; 
      padding: 20px; 
      font-family: 'Arial', sans-serif; 
      background: linear-gradient(135deg, #f0f0f0, #e8e8e8); 
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card { 
      width: 480px; 
      height: 800px; 
      background: linear-gradient(45deg, #FF6B35 0%, #FFFFFF 30%, #FFFFFF 70%, #138808 100%);
      margin: 0 auto;
      border-radius: 25px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      padding: 40px 30px;
      position: relative;
      overflow: hidden;
      color: #333;
    }
    .hero-name {
      color: #FF6B35;
      text-align: center;
      margin: 20px 0 15px 0;
      font-size: 42px;
      font-weight: bold;
      text-shadow: 0 2px 6px rgba(0,0,0,0.2);
      line-height: 1.1;
    }
    .download-btn {
      background: linear-gradient(45deg, #FF6B35, #138808);
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      margin: 5px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div style="text-align: center; font-size: 24px; font-weight: bold; color: #138808; margin-bottom: 25px;">
      🇮🇳 Independence Day 2025 🇮🇳
    </div>
    
    <h2 class="hero-name">${heroData.name}</h2>
    <div style="text-align: center; font-style: italic; color: #666; font-size: 18px; margin-bottom: 30px;">
      "${heroData.alias}"
    </div>
    
    <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 15px; margin: 20px 0;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <span style="font-weight: bold; color: #FF6B35;">Born:</span>
        <span style="font-weight: 600; color: #333;">${heroData.birth}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <span style="font-weight: bold; color: #FF6B35;">Region:</span>
        <span style="font-weight: 600; color: #333;">${heroData.region}</span>
      </div>
    </div>
    
    <div style="background: rgba(19, 136, 8, 0.1); padding: 25px; border-radius: 15px; border-left: 4px solid #138808; margin: 25px 0;">
      <div style="font-style: italic; text-align: center; color: #333; font-size: 18px; line-height: 1.6;">
        "${heroData.quote}"
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 30px;">
      <div style="font-size: 16px; color: #138808; font-weight: 700; margin-bottom: 8px;">
        🙏 Remembering Our Forgotten Heroes 🙏
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 30px;">
      <button class="download-btn" onclick="window.print()">🖨️ Print Card</button>
    </div>
  </div>
</body>
</html>`;
  
  cardWindow.document.write(cardHTML);
  cardWindow.document.close();
};

const generateAIResponse = async (userMessage, conversationHistory) => {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for specific freedom fighters mentioned
  for (const [key, fighter] of Object.entries(freedomFightersDB)) {
    if (lowerMessage.includes(key) || lowerMessage.includes(fighter.name.toLowerCase())) {
      return `🇮🇳 **${fighter.name} - "${fighter.alias}"**

**Born:** ${fighter.birth} in ${fighter.region}
**Died:** ${fighter.death}

${fighter.bio}

**🏆 Major Achievements:**
${fighter.achievements.map(achievement => `• ${achievement}`).join('\n')}

**💬 Inspiring Quote:**
"${fighter.quote}"

**🌟 Did You Know?**
${fighter.funFacts.slice(0, 2).map(fact => `• ${fact}`).join('\n')}

This ${fighter.rarity} hero represents the true spirit of Indian independence! Would you like to know more about other freedom fighters from ${fighter.region}? 🌟`;
    }
  }
  
  // Regional queries - Enhanced with more states
  if (lowerMessage.includes('bengal')) {
    return `🇮🇳 **Freedom Fighters from Bengal - The Revolutionary Land**

Bengal was the epicenter of India's freedom movement! Here are some legendary heroes:

**🌟 Matangini Hazra (1869-1942)**
• Called "Gandhi Buri" by locals
• Led Quit India protests at age 73
• Shot 3 times but kept walking with the tricolor

**🔥 Khudiram Bose (1889-1908)**
• Youngest revolutionary martyr at age 18
• Participated in Muzaffarpur bombing
• Smiled while going to the gallows

**⚡ Pritilata Waddedar (1911-1932)**
• First woman to lead armed resistance
• Mathematics graduate turned revolutionary
• Led the famous Pahartali Club attack

Bengal's soil is soaked with the blood of heroes who dreamed of free India! Which of these brave souls would you like to know more about? 🌟`;
  }
  
  if (lowerMessage.includes('tamil nadu') || lowerMessage.includes('tamilnadu') || lowerMessage.includes('tamil')) {
    return `🇮🇳 **Freedom Fighters from Tamil Nadu - Land of Tamil Pride**

Tamil Nadu produced many brave freedom fighters who fought for independence:

**🌟 V.O. Chidambaram Pillai (1872-1936)**
• Known as "Kappalottiya Tamizhan" (The Tamil Helmsman)
• Started Swadeshi Steam Navigation Company
• Challenged British shipping monopoly
• Quote: "Even if we are reduced to poverty, we will fight for our rights!"

**🔥 Subramania Bharati (1882-1921)**
• Great Tamil poet and freedom fighter
• Used poetry to inspire nationalism
• Advocate for women's rights and social reform
• Quote: "Yaadhum oore yaavarum kelir" (Every place is our home and all people are our kinsmen)

**⚡ Vanchinathan (1886-1911)**
• Assassinated British collector Robert Ashe
• Martyr who gave his life for freedom
• Left a note saying "I alone am responsible for this deed"

**🏆 Tiruppur Kumaran (1904-1932)**
• "Kodi Kaatha Kumaran" (Kumaran who protected the flag)
• Died holding the Indian flag during protests
• Symbol of Tamil pride and sacrifice

Tamil Nadu's heroes showed that freedom burns in every Tamil heart! Want to know more about any specific Tamil hero? 🌟`;
  }
  
  if (lowerMessage.includes('punjab')) {
    return `🇮🇳 **Heroes from Punjab - Land of the Brave**

Punjab gave us some of the most fearless freedom fighters:

**⚔️ Udham Singh (1899-1940) - "Shaheed-i-Azam"**
• Avenged Jallianwala Bagh massacre
• Waited 21 years to assassinate Michael O'Dwyer
• Refused to appeal his death sentence

**🦁 Bhagat Singh (1907-1931)**
• The legendary revolutionary who shook the British Empire
• "Inquilab Zindabad!" became his battle cry
• Chose death over compromise at age 23

**👑 Lala Lajpat Rai (1865-1928)**
• "Punjab Kesari" (Lion of Punjab)
• Led protests against Simon Commission
• Died from injuries during lathi charge

Punjab's soil is blessed with the blood of martyrs! Which Punjabi hero's story would you like to explore? 🌟`;
  }
  
  if (lowerMessage.includes('maharashtra') || lowerMessage.includes('marathi')) {
    return `🇮🇳 **Freedom Fighters from Maharashtra - The Maratha Spirit**

Maharashtra has a rich tradition of freedom fighters:

**🌟 Bal Gangadhar Tilak (1856-1920)**
• "Lokmanya Tilak" - Father of Indian Unrest
• "Swaraj is my birthright and I shall have it!"
• Started Ganesh Chaturthi celebrations as nationalist events

**🔥 Tatya Tope (1814-1859)**
• Great military leader of 1857 revolt
• Master of guerrilla warfare
• Never captured alive by British

**⚡ Vasudev Balwant Phadke (1845-1883)**
• Father of armed struggle in Maharashtra
• First to organize armed resistance against British
• Inspired future revolutionaries

The Maratha spirit of independence runs deep! Want to know more about any Marathi hero? 🌟`;
  }
  
  if (lowerMessage.includes('kerala') || lowerMessage.includes('malayalam')) {
    return `🇮🇳 **Freedom Fighters from Kerala - God's Own Warriors**

Kerala contributed many brave souls to India's freedom struggle:

**🌟 Pazhassi Raja (1753-1805)**
• "Lion of Kerala" who fought British East India Company
• Led guerrilla warfare in Wayanad forests
• Never surrendered to colonial rule

**🔥 Veluthampi Dalawa (1765-1809)**
• Prime Minister of Travancore who resisted British
• Issued proclamation against British interference
• Chose death over submission

**⚡ Akkamma Cherian (1909-1982)**
• "Jhansi Rani of Travancore"
• Led Salt Satyagraha in Kerala
• First woman political prisoner in Travancore

Kerala's coconut palms witnessed great sacrifices for freedom! Which Kerala hero inspires you? 🌟`;
  }
  
  if (lowerMessage.includes('gujarat') || lowerMessage.includes('gujarati')) {
    return `🇮🇳 **Freedom Fighters from Gujarat - Gandhi's Homeland**

Gujarat, the birthplace of Mahatma Gandhi, produced many freedom fighters:

**🌟 Sardar Vallabhbhai Patel (1875-1950)**
• "Iron Man of India"
• United 562 princely states into India
• Led Bardoli Satyagraha

**🔥 Khan Abdul Ghaffar Khan (1890-1988)**
• "Frontier Gandhi" (though from NWFP, closely associated with Gujarat movement)
• Advocate of non-violence
• Spent 45 years in prison

**⚡ Usha Mehta (1920-2000)**
• Started Secret Congress Radio during Quit India Movement
• Broadcast nationalist messages from hiding
• Brave woman who defied British censorship

Gujarat's entrepreneurial spirit fueled the freedom movement! Want to explore more Gujarati heroes? 🌟`;
  }
  
  // Women freedom fighters
  if (lowerMessage.includes('women') && lowerMessage.includes('freedom')) {
    return `🇮🇳 **Brave Women Warriors of India's Freedom Movement**

Our freedom wasn't won by men alone! Here are some incredible women heroes:

**👑 Aruna Asaf Ali - "Grand Old Lady of Independence"**
• Hoisted Congress flag during Quit India Movement (1942)
• Had Rs. 5000 bounty on her head
• Lived underground for 4 years

**🦾 Matangini Hazra - "Gandhi Buri"**
• Started activism at age 60!
• Led thousands in Quit India Movement at age 73
• Died holding the tricolor flag

**⚔️ Rani Gaidinliu - "The Naga Queen"**
• Started rebellion at age 13
• Imprisoned for 14 years by British
• Protected Naga culture and traditions

**🎯 Pritilata Waddedar - "Brave Heart of Chittagong"**
• Mathematics graduate turned revolutionary
• Led armed attack on European Club
• Disguised as male during operations

These women proved that courage has no gender! Want to learn more about any specific woman warrior? 🌟`;
  }
  
  // Independence Day greetings
  if (lowerMessage.includes('greeting') || lowerMessage.includes('independence day')) {
    const randomFighter = Object.values(freedomFightersDB)[Math.floor(Math.random() * Object.values(freedomFightersDB).length)];
    return `🇮🇳 **Independence Day 2025 - Honoring Our Forgotten Heroes**

*"Freedom is not free. It was bought with the blood and sacrifice of countless heroes."*

**This Independence Day, let's remember ${randomFighter.name}:**
${randomFighter.bio.slice(0, 150)}...

**Their inspiring words:**
"${randomFighter.quote}"

**🎉 Independence Day Message:**
As we celebrate 78 years of freedom, let's honor the countless unsung heroes like ${randomFighter.name} who gave everything for our liberty.

**Jai Hind! Vande Mataram! 🇮🇳**`;
  }
  
  // Social media posts
  if (lowerMessage.includes('social media') || lowerMessage.includes('post')) {
    const randomFighter = Object.values(freedomFightersDB)[Math.floor(Math.random() * Object.values(freedomFightersDB).length)];
    return `📱 **Social Media Post Ready!**

*Copy this for your Independence Day posts:*

🇮🇳 This Independence Day, let's honor ${randomFighter.name} from ${randomFighter.region}!

"${randomFighter.alias}" - ${randomFighter.name} showed us that freedom comes through sacrifice and courage.

"${randomFighter.quote}"

**Key Achievements:**
• ${randomFighter.achievements[0] || 'Led resistance against British rule'}
• ${randomFighter.achievements[1] || 'Inspired future generations'}

Let's remember our forgotten heroes who gave everything for our freedom! 

#IndependenceDay #ForgottenHeroes #JaiHind

*Perfect for Instagram, Facebook, Twitter, and LinkedIn! 🚀*`;
  }
  
  // Tribal heroes
  if (lowerMessage.includes('tribal') || lowerMessage.includes('tribe')) {
    return `🇮🇳 **Tribal Warriors - Guardians of the Motherland**

Our tribal heroes fought fiercely to protect their land and culture:

**🦅 Birsa Munda (1875-1900) - "Dharti Aba"**
• Led the Munda rebellion in Jharkhand
• Fought against forced conversions
• Called 'Bhagwan' by tribals

**🏔️ Tirot Sing (1802-1835) - "Lion of Meghalaya"**
• Khasi chief who led Anglo-Khasi War
• Master of jungle warfare tactics
• United all Khasi chiefs against British

**🌿 Alluri Sitarama Raju (1897-1924) - "Manyam Veerudu"**
• Led guerrilla campaigns from Andhra forests
• Expert in traditional weapons
• British deployed entire battalions to capture him

These tribal warriors understood that protecting their land meant protecting India's soul! 🌟`;
  }
  
  // Default response for unrecognized queries
  return `🇮🇳 **Welcome to the Journey of Forgotten Heroes!**

I'm thrilled you're here to discover India's incredible freedom fighters! 🌟

**🔥 I can help you explore:**
• **Regional Heroes**: Freedom fighters from any Indian state
• **Women Warriors**: Brave ladies who fought for independence  
• **Tribal Legends**: Indigenous heroes who protected their homeland
• **Independence Day Content**: Greetings, posts, and tributes

**🎯 Try asking me:**
• "Tell me about freedom fighters from Tamil Nadu"
• "Heroes from Maharashtra"
• "Women freedom fighters from Bengal"
• "Create an Independence Day greeting"
• "Tribal heroes who fought the British"

Every hero has a story. Every story deserves to be told. Which incredible tale would you like to discover first? 🌟

**Jai Hind! 🇮🇳**`;
};

function FreedomFightersApp() {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "🙏 Namaste! I'm Itihaskar, your passionate AI historian! 🇮🇳\n\n🌟 On this glorious Independence Day, I'm here to share the incredible stories of India's forgotten freedom fighters. I can provide detailed information, create personalized greetings, and help you discover heroes from any region!\n\n🔥 What amazing story would you like to discover today?",
      timestamp: "Just now"
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    users: 1247,
    stories: 156,
    greetings: 423
  });
  const [isClient, setIsClient] = useState(false);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [discoveredHeroes, setDiscoveredHeroes] = useState(new Set());

  useEffect(() => {
    const allFighters = Object.values(freedomFightersDB);
    const shuffled = [...allFighters].sort(() => Math.random() - 0.5);
    setDisplayedCards(shuffled.slice(0, 4));
    setDiscoveredHeroes(new Set(shuffled.slice(0, 4).map(f => f.name)));
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

  const formatAIResponse = (content) => {
    const lines = content.split('\n');
    return (
      <div>
        {lines.map((line, index) => {
          if (line.trim() === '') {
            return <div key={index} style={{height: '0.5rem'}} />;
          }
          
          if (line.includes('**')) {
            return (
              <div key={index} style={{fontWeight: 'bold', color: '#ea580c', marginBottom: '0.5rem'}}>
                {line.replace(/\*\*/g, '')}
              </div>
            );
          }
          
          if (line.trim().startsWith('•')) {
            return (
              <div key={index} style={{color: '#16a34a', fontWeight: '500', marginLeft: '1rem', marginBottom: '0.25rem'}}>
                {line}
              </div>
            );
          }
          
          return (
            <div key={index} style={{marginBottom: '0.5rem', lineHeight: '1.6'}}>
              {line}
            </div>
          );
        })}
      </div>
    );
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      type: 'user',
      content: input,
      timestamp: getTimestamp()
    };

    setMessages(prev => [...prev, userMessage]);
    setError(null);
    
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(currentInput, conversationHistory);
      
      const aiMessage = {
        type: 'ai',
        content: aiResponse,
        timestamp: getTimestamp()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      setConversationHistory(prev => [
        ...prev,
        { role: "user", content: currentInput },
        { role: "assistant", content: aiResponse }
      ]);

      const fighterNames = Object.keys(freedomFightersDB);
      const mentionedFighter = fighterNames.find(name => 
        currentInput.toLowerCase().includes(name) || 
        aiResponse.toLowerCase().includes(freedomFightersDB[name].name.toLowerCase())
      );
      
      if (mentionedFighter) {
        setSelectedFighter(freedomFightersDB[mentionedFighter]);
      }

    } catch (error) {
      console.error("Error getting AI response:", error);
      setError("Failed to get AI response. Please try again.");
      
      const fallbackResponse = "🇮🇳 I can help you with information about our freedom fighters! Try asking about: Matangini Hazra, Aruna Asaf Ali, or any specific region. 🌟";
      
      setMessages(prev => [...prev, {
        type: 'ai',
        content: fallbackResponse,
        timestamp: getTimestamp()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCardClick = (fighter) => {
    setSelectedFighter(fighter);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff7ed, #ffffff, #f0fdf4)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: 'linear-gradient(90deg, #f97316, #ffffff, #16a34a)',
        padding: '2rem 1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
          <span style={{fontSize: '2.5rem'}}>🇮🇳</span>
          <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', margin: '0.5rem 0'}}>Azadi Ke Asli Hero</h1>
          <span style={{fontSize: '2.5rem'}}>🇮🇳</span>
        </div>
        <p style={{fontSize: '1.125rem', color: '#4b5563', marginBottom: '1rem'}}>Powered by AI • Discover India's Forgotten Freedom Fighters</p>
        
        <div style={{display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem', flexWrap: 'wrap'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center'}}>
              <Users />
              <span style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#ea580c'}}>{stats.users.toLocaleString()}</span>
            </div>
            <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Heroes Discovered</span>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center'}}>
              <BookOpen />
              <span style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#16a34a'}}>{stats.stories}</span>
            </div>
            <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Stories Shared</span>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center'}}>
              <Award />
              <span style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#2563eb'}}>{stats.greetings}</span>
            </div>
            <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Greetings Created</span>
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#fee2e2', borderRadius: '0.5rem'}}>
            <Clock />
            <span style={{color: '#dc2626', fontWeight: '600'}}>Independence Day: Aug 15! 🇮🇳</span>
          </div>
        </div>
      </div>

      <div style={{margin: '0 auto', padding: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap'}}>
        
        <div style={{
          flex: '1',
          minWidth: '300px',
          background: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #e5e7eb',
            background: 'linear-gradient(90deg, #fed7aa, #dcfce7)',
            borderRadius: '0.75rem 0.75rem 0 0'
          }}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <div style={{width: '2.5rem', height: '2.5rem', background: 'linear-gradient(90deg, #f97316, #16a34a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <BookOpen />
                </div>
                <div>
                  <h2 style={{fontWeight: 'bold', color: '#1f2937', margin: 0}}>AI Itihaskar</h2>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                    <div style={{width: '0.5rem', height: '0.5rem', background: '#16a34a', borderRadius: '50%'}}></div>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Powered by AI</span>
                  </div>
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Sparkles />
                <span style={{fontSize: '0.875rem', fontWeight: '600', color: '#4b5563'}}>Smart Responses</span>
              </div>
            </div>
          </div>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              margin: '1rem',
              fontSize: '0.875rem'
            }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{
            height: '500px',
            overflowY: 'auto',
            padding: '1rem',
            background: '#f9fafb'
          }}>
            {messages.map((message, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{
                  maxWidth: message.type === 'user' ? '70%' : '85%',
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  background: message.type === 'user' 
                    ? 'linear-gradient(90deg, #f97316, #ea580c)' 
                    : 'white',
                  color: message.type === 'user' ? 'white' : '#1f2937',
                  border: message.type === 'user' ? 'none' : '1px solid #e5e7eb',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap'
                }}>
                  <div>
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
              <div style={{display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem'}}>
                <div style={{
                  maxWidth: '85%',
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  background: 'white',
                  color: '#1f2937',
                  border: '1px solid #e5e7eb',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <div style={{display: 'flex', gap: '0.25rem'}}>
                      <div style={{width: '0.5rem', height: '0.5rem', background: '#fb923c', borderRadius: '50%'}}></div>
                      <div style={{width: '0.5rem', height: '0.5rem', background: '#fb923c', borderRadius: '50%'}}></div>
                      <div style={{width: '0.5rem', height: '0.5rem', background: '#fb923c', borderRadius: '50%'}}></div>
                    </div>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>AI Itihaskarji is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{
            padding: '1rem',
            borderTop: '1px solid #e5e7eb',
            background: 'white',
            borderRadius: '0 0 0.75rem 0.75rem'
          }}>
            <div style={{display: 'flex', gap: '0.5rem', marginBottom: '0.75rem'}}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about any freedom fighter, region, or request a greeting..."
                style={{
                  flex: '1',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  fontSize: '0.875rem'
                }}
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(90deg, #f97316, #16a34a)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  opacity: (!input.trim() || isTyping) ? 0.5 : 1
                }}
              >
                <Send />
              </button>
            </div>
            
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
              {quickPrompts.map((prompt, index) => (
                <button 
                  key={index}
                  onClick={() => setInput(prompt)}
                  style={{
                    fontSize: '0.75rem',
                    background: 'linear-gradient(90deg, #fed7aa, #fde68a)',
                    color: '#9a3412',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  disabled={isTyping}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{width: '320px', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          
          {selectedFighter && (
            <div style={{
              background: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              padding: '1.5rem'
            }}>
              <h3 style={{fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
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
                  <span><strong>{selectedFighter.birth} - {selectedFighter.death}</strong></span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                  <MapPin />
                  <span><strong>{selectedFighter.region}</strong></span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span>🏆</span>
                  <span><strong>{selectedFighter.rarity.charAt(0).toUpperCase() + selectedFighter.rarity.slice(1)} Hero</strong></span>
                </div>
              </div>
              
              <div style={{padding: '0.75rem', background: 'linear-gradient(90deg, #fff7ed, #f0fdf4)', borderRadius: '0.5rem', borderLeft: '4px solid #fb923c', marginBottom: '1rem'}}>
                <p style={{fontSize: '0.875rem', fontStyle: 'italic', color: '#4b5563', margin: 0}}>"{selectedFighter.quote}"</p>
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <button 
                  onClick={() => setInput(`Tell me more about ${selectedFighter.name}`)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    background: 'linear-gradient(90deg, #fb923c, #f97316)',
                    color: 'white',
                    fontSize: '0.875rem'
                  }}
                  disabled={isTyping}
                >
                  📚 Ask AI for More Details
                </button>
                <button 
                  onClick={() => generateVisualCard(selectedFighter)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    background: 'linear-gradient(90deg, #4ade80, #16a34a)',
                    color: 'white',
                    fontSize: '0.875rem'
                  }}
                >
                  🎨 Create Visual Card
                </button>
              </div>
            </div>
          )}

          <div style={{
            background: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            padding: '1.5rem'
          }}>
            <h3 style={{fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              🃏 Hero Trading Cards
            </h3>
            
            <div style={{marginBottom: '1rem', padding: '0.75rem', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '0.5rem', border: '1px solid #f59e0b'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                <span style={{fontSize: '0.75rem', fontWeight: '600', color: '#92400e'}}>Collection Progress</span>
                <span style={{fontSize: '0.75rem', color: '#92400e'}}>{discoveredHeroes.size}/{Object.keys(freedomFightersDB).length} Discovered</span>
              </div>
              <div style={{width: '100%', height: '6px', background: '#fed7aa', borderRadius: '3px', overflow: 'hidden'}}>
                <div style={{width: `${(discoveredHeroes.size / Object.keys(freedomFightersDB).length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #f97316, #ea580c)', borderRadius: '3px'}}></div>
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem', minHeight: '300px'}}>
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
                      height: '140px',
                      cursor: 'pointer',
                      borderRadius: '0.5rem',
                      background: `linear-gradient(135deg, ${rarityInfo.colors})`,
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: '2px solid rgba(0,0,0,0.1)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s'
                    }}
                    onClick={() => handleCardClick(fighter)}
                  >
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
                );
              })}
            </div>

            <button
              onClick={() => {
                const allFighters = Object.values(freedomFightersDB);
                const shuffled = [...allFighters].sort(() => Math.random() - 0.5);
                const newCards = shuffled.slice(0, 4);
                
                setDisplayedCards(newCards);
                setDiscoveredHeroes(prev => new Set([...prev, ...newCards.map(f => f.name)]));
                setSelectedFighter(null);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(139, 92, 246, 0.3)',
                marginBottom: '1.5rem'
              }}
              disabled={isTyping}
            >
              🎲 Discover Random Heroes
            </button>

            <div style={{padding: '0.75rem', background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)', borderRadius: '0.5rem', border: '1px solid #d1d5db'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#4b5563'}}>
                <div style={{textAlign: 'center', flex: 1}}>
                  <div style={{fontWeight: 'bold', color: '#f59e0b', fontSize: '1rem', marginBottom: '0.25rem'}}>
                    💎 {Array.from(discoveredHeroes).filter(name => {
                      const fighter = Object.values(freedomFightersDB).find(f => f.name === name);
                      return fighter && fighter.rarity === 'legendary';
                    }).length}
                  </div>
                  <div style={{fontWeight: '500'}}>Legendary</div>
                </div>
                <div style={{textAlign: 'center', flex: 1}}>
                  <div style={{fontWeight: 'bold', color: '#16a34a', fontSize: '1rem', marginBottom: '0.25rem'}}>
                    🔥 {Array.from(discoveredHeroes).filter(name => {
                      const fighter = Object.values(freedomFightersDB).find(f => f.name === name);
                      return fighter && fighter.rarity === 'rare';
                    }).length}
                  </div>
                  <div style={{fontWeight: '500'}}>Rare</div>
                </div>
                <div style={{textAlign: 'center', flex: 1}}>
                  <div style={{fontWeight: 'bold', color: '#3b82f6', fontSize: '1rem', marginBottom: '0.25rem'}}>
                    ⚡ {Array.from(discoveredHeroes).filter(name => {
                      const fighter = Object.values(freedomFightersDB).find(f => f.name === name);
                      return fighter && fighter.rarity === 'epic';
                    }).length}
                  </div>
                  <div style={{fontWeight: '500'}}>Epic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: '#1f2937',
        color: 'white',
        padding: '2rem 1rem',
        marginTop: '3rem',
        textAlign: 'center'
      }}>
        <div style={{maxWidth: '7xl', margin: '0 auto', padding: '0 1rem'}}>
          <p style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem'}}>🇮🇳 Every Hero Has a Story. Every Story Deserves to be Told. 🇮🇳</p>
          <p style={{fontSize: '0.875rem', color: '#9ca3af', margin: '0 0 1rem 0'}}>Preserving India's Heritage • Powered by AI • Independence Day 2025</p>
          
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #374151'}}>
            <span style={{fontSize: '0.875rem', color: '#9ca3af'}}>Proudly Built by</span>
            <a 
              href="https://www.instagram.com/monetiqai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                textDecoration: 'none',
                padding: '0.5rem',
                borderRadius: '8px'
              }}
            >
              <div style={{
                width: '32px', 
                height: '32px', 
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{color: 'white', fontSize: '18px'}}>📷</span>
              </div>
              <div>
                <div style={{
                  fontSize: '1.125rem', 
                  fontWeight: 'bold', 
                  color: 'white'
                }}>
                  MonetIQ
                </div>
                <div style={{
                  fontSize: '0.75rem', 
                  color: '#9ca3af',
                  fontStyle: 'italic'
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

export default FreedomFightersApp;
