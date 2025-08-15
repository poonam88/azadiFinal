"use client";
import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Award, Clock, Send, Star, Calendar, MapPin, Sparkles } from 'lucide-react';

// Freedom fighters database
const freedomFightersDB = {
  "matangini hazra": {
    name: "Matangini Hazra",
    alias: "Gandhi Buri",
    birth: "1869",
    death: "1942",
    region: "Bengal",
    rarity: "legendary",
    bio: "Matangini Hazra was a revolutionary freedom fighter who became active in India's independence movement at the age of 60. She was shot three times by British police while leading a procession with the Indian flag but continued walking until she died.",
    achievements: [
      "Led Quit India Movement protests at age 73",
      "Became symbol of elderly courage in freedom struggle",
      "Inspired thousands of women to join independence movement"
    ],
    quote: "I will die, but I will not leave the flag",
    funFacts: [
      "Started her activism after becoming a widow at 18",
      "Was called 'Gandhi Buri' (Old Lady Gandhi) by locals",
      "Her last words were 'Vande Mataram'"
    ]
  },
  "aruna asaf ali": {
    name: "Aruna Asaf Ali",
    alias: "Grand Old Lady of Independence",
    birth: "1909",
    death: "1996",
    region: "Delhi",
    rarity: "legendary",
    bio: "Aruna Asaf Ali was a prominent freedom fighter who hoisted the Congress flag during the Quit India Movement in 1942. She remained underground for four years with a bounty on her head.",
    achievements: [
      "Hoisted Indian National Congress flag during Quit India Movement",
      "Lived underground for 4 years evading British police",
      "Had Rs. 5000 bounty on her head"
    ],
    quote: "Freedom is not just a word, it's the essence of our existence",
    funFacts: [
      "First woman to hoist Congress flag at Gowalia Tank",
      "Edited underground newsletter 'Inquilab'",
      "Later became Delhi's first Mayor"
    ]
  },
  "pritilata waddedar": {
    name: "Pritilata Waddedar",
    alias: "Brave Heart of Chittagong",
    birth: "1911",
    death: "1932",
    region: "Bengal",
    rarity: "rare",
    bio: "Pritilata Waddedar was a Bengali revolutionary who led an armed attack on the Pahartali European Club. She was one of the first women to participate in armed resistance against British rule.",
    achievements: [
      "Led attack on Pahartali European Club",
      "First woman to lead armed resistance in Bengal",
      "Mathematics graduate turned revolutionary"
    ],
    quote: "Death is preferable to a life of humiliation",
    funFacts: [
      "Disguised herself as a male during operations",
      "Was a brilliant mathematics student",
      "Took cyanide to avoid capture"
    ]
  },
  "rani gaidinliu": {
    name: "Rani Gaidinliu",
    alias: "The Naga Queen",
    birth: "1915",
    death: "1993",
    region: "Manipur",
    rarity: "epic",
    bio: "Rani Gaidinliu was a Naga spiritual and political leader who fought against British rule. She started her rebellion at age 13 and was imprisoned for 14 years.",
    achievements: [
      "Started rebellion against British at age 13",
      "Imprisoned for 14 years by British",
      "Protected Naga culture and traditions"
    ],
    quote: "My people and my land are my greatest treasures",
    funFacts: [
      "Jawaharlal Nehru gave her the title 'Rani'",
      "Was released from prison only after independence",
      "Became a symbol of Naga resistance"
    ]
  },
  "khudiram bose": {
    name: "Khudiram Bose",
    alias: "Youngest Revolutionary Martyr",
    birth: "1889",
    death: "1908",
    region: "Bengal",
    rarity: "legendary",
    bio: "Khudiram Bose was one of the youngest revolutionaries to be executed by the British. At just 18, he participated in the Muzaffarpur bombing and became a martyr for the independence cause.",
    achievements: [
      "Youngest martyr of independence movement at 18",
      "Participated in Muzaffarpur bombing",
      "Smiled while going to gallows"
    ],
    quote: "I am happy to die for my motherland",
    funFacts: [
      "Was selling books on streets before joining revolution",
      "His execution sparked massive protests",
      "Songs were written in his honor"
    ]
  },
  "usha mehta": {
    name: "Usha Mehta",
    alias: "Voice of Freedom",
    birth: "1920",
    death: "2000",
    region: "Gujarat",
    rarity: "rare",
    bio: "Usha Mehta was a freedom fighter who started the Secret Congress Radio during the Quit India Movement. She broadcast nationalist messages from hiding places in Mumbai.",
    achievements: [
      "Started Secret Congress Radio",
      "Broadcast anti-British messages during Quit India Movement",
      "Evaded British intelligence for months"
    ],
    quote: "The airwaves cannot be imprisoned",
    funFacts: [
      "Was only 22 when she started the radio",
      "Used different hideouts to avoid detection",
      "Later became a professor of political science"
    ]
  }
};

// Quick prompts for user interaction
const quickPrompts = [
  "Tell me about women freedom fighters",
  "Heroes from Bengal",
  "Create Independence Day greeting",
  "Tribal freedom fighters",
  "Heroes from Tamil Nadu",
  "Social media post"
];

// Wikipedia search function
const searchWikipedia = async (query) => {
  try {
    // Wikipedia API search
    const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl);
    
    if (response.ok) {
      const data = await response.json();
      return {
        title: data.title,
        extract: data.extract,
        found: true
      };
    }
    
    // Try alternative search
    const searchQuery = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(query + " Indian freedom fighter")}&origin=*`;
    const altResponse = await fetch(searchQuery);
    
    if (altResponse.ok) {
      const altData = await altResponse.json();
      const pages = altData.query.pages;
      const pageId = Object.keys(pages)[0];
      
      if (pageId !== '-1' && pages[pageId].extract) {
        return {
          title: pages[pageId].title,
          extract: pages[pageId].extract.slice(0, 500) + "...",
          found: true
        };
      }
    }
    
    return { found: false };
  } catch (error) {
    console.error('Wikipedia search failed:', error);
    return { found: false };
  }
};

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
  
  const lowerMessage = userMessage.toLowerCase().replace(/[^a-z\s]/g, '');
  
  // Helper function for fuzzy matching
  const fuzzyMatch = (text, keywords) => {
    return keywords.some(keyword => {
      // Check for exact match
      if (text.includes(keyword)) return true;
      
      // Check for partial matches (for typos)
      const words = text.split(' ');
      return words.some(word => {
        // Allow 1-2 character differences for common typos
        if (Math.abs(word.length - keyword.length) <= 2) {
          let differences = 0;
          const minLength = Math.min(word.length, keyword.length);
          for (let i = 0; i < minLength; i++) {
            if (word[i] !== keyword[i]) differences++;
          }
          return differences <= 2;
        }
        return false;
      });
    });
  };
  
  // Check for specific freedom fighters mentioned in our database first
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
  
  // PRIORITY 1: Handle AI's built-in knowledge for specific freedom fighters
  if (lowerMessage.includes('tirot sing') || lowerMessage.includes('tirot')) {
    return `🇮🇳 **Tirot Sing (1802-1835) - "Lion of Meghalaya"**

**Known as:** U Tirot Sing Syiem, Chief of Nongkhlaw

**Background:**
Tirot Sing was a Khasi chief who led the Anglo-Khasi War (1829-1832) against British colonial expansion in the Khasi Hills of present-day Meghalaya. He was one of the earliest freedom fighters to resist British rule in Northeast India.

**🏆 Major Achievements:**
• Led the first organized resistance against British in Northeast India
• United multiple Khasi chiefs against colonial rule
• Master of guerrilla warfare tactics in hilly terrain
• Defended Khasi sovereignty and traditional governance

**⚔️ The Anglo-Khasi War:**
• Started in 1829 when British tried to build roads through Khasi territory
• Tirot Sing refused to allow road construction without proper consultation
• Led fierce resistance for nearly 4 years
• Used knowledge of local terrain to outmaneuver British forces

**💬 His Legacy:**
"The hills are ours, and we will defend them with our lives"

**🌟 Did You Know?**
• He was captured in 1833 and died in British custody in 1835
• Considered the first freedom fighter of Meghalaya
• His resistance inspired future tribal movements across Northeast India
• Meghalaya celebrates him as a state hero

**This legendary tribal chief proved that the spirit of freedom burned bright in every corner of India! 🇮🇳**`;
  }
  
  if (lowerMessage.includes('vo chidambaram') || lowerMessage.includes('chidambaram pillai')) {
    return `🇮🇳 **V.O. Chidambaram Pillai (1872-1936) - "Kappalottiya Tamizhan"**

**Known as:** The Tamil Helmsman, VOC

**Background:**
Vaanchinathan Olaganathan Chidambaram Pillai was a Tamil freedom fighter, lawyer, and entrepreneur who challenged British maritime monopoly. He was one of the first to use economic resistance as a tool against colonial rule.

**🏆 Major Achievements:**
• Founded Swadeshi Steam Navigation Company (1906)
• First Indian to challenge British shipping monopoly
• Organized successful boycott of British ships
• Pioneer of economic nationalism in Tamil Nadu

**⚔️ The Swadeshi Movement:**
• Started steamship service between Tuticorin and Colombo
• Broke British monopoly on sea trade
• Employed thousands of Indians in maritime industry
• Ships named after Indian heroes like "Bharati", "Lakshmibai"

**💬 His Famous Quote:**
"Even if we are reduced to poverty, we will fight for our rights and freedom!"

**🌟 Did You Know?**
• Called "Kappalottiya Tamizhan" (The Tamil Navigator)
• Imprisoned and tortured by British for his activism
• Lost his wealth fighting for freedom
• Inspired Tamil maritime heritage and pride

**His economic resistance showed that freedom could be won through commerce and self-reliance! 🇮🇳**`;
  }
  
  if (lowerMessage.includes('subramania bharati') || (lowerMessage.includes('bharati') && !lowerMessage.includes('from'))) {
    return `🇮🇳 **Subramania Bharati (1882-1921) - "Mahakavi Bharatiyar"**

**Known as:** The Great Tamil Poet, Bharatiyar

**Background:**
Chinnaswami Subramania Bharati was a Tamil poet, freedom fighter, and social reformer. He used his powerful poetry to ignite patriotic fervor and inspire the independence movement across Tamil Nadu.

**🏆 Major Achievements:**
• Wrote revolutionary poems that inspired millions
• Advocated for women's rights and gender equality
• Promoted Hindi-Tamil unity and national integration
• Pioneered modern Tamil literature and journalism

**⚔️ Literary Revolution:**
• Composed "Vande Mataram" in Tamil
• Wrote "Bharata Devi" and "Janani Janmabhoomi"
• Used simple Tamil to reach common people
• Made poetry a weapon against British rule

**💬 His Immortal Words:**
"Yaadhum oore yaavarum kelir" (Every place is our home and all people are our kinsmen)

**🌟 Did You Know?**
• Lived in exile in Pondicherry to escape British persecution
• Believed in women's liberation and education
• Composed songs that are still sung in Tamil schools
• Died young at 39 but left an immortal legacy

**His words became the voice of Tamil freedom and continue to inspire generations! 🇮🇳**`;
  }
  
  if (lowerMessage.includes('vanchinathan') && !lowerMessage.includes('from')) {
    return `🇮🇳 **Vanchinathan (1886-1911) - "The Brave Avenger"**

**Full Name:** Shankaran Vanchinathan

**Background:**
Vanchinathan was a Tamil freedom fighter who assassinated British collector Robert Ashe in 1911. His act of defiance was one of the most daring individual acts of resistance in early independence movement.

**🏆 The Historic Act:**
• Assassinated Collector Robert Ashe on June 17, 1911
• Shot Ashe at Maniyachi railway station
• Left a detailed note explaining his motives
• Committed suicide to avoid capture

**⚔️ His Mission:**
• Protested against British oppression in Tamil regions
• Avenged atrocities committed by British officials
• Inspired by Swadeshi movement principles
• Believed in ultimate sacrifice for motherland

**💬 His Final Message:**
"I alone am responsible for this deed. The government may do whatever they like with my dead body."

**🌟 His Legacy:**
• Became a martyr at just 25 years old
• Inspired future Tamil revolutionaries
• Symbol of fearless resistance in Tamil Nadu
• His sacrifice motivated anti-British sentiment

**His supreme sacrifice proved that even one determined individual could shake the mighty British Empire! 🇮🇳**`;
  }
  
  // PRIORITY 2: Regional queries with fuzzy matching
  if (fuzzyMatch(lowerMessage, ['bengal', 'bangla', 'west bengal'])) {
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
  
  if (fuzzyMatch(lowerMessage, ['tamil nadu', 'tamilnadu', 'tamil', 'tn'])) {
    return `🇮🇳 **Freedom Fighters from Tamil Nadu - Land of Tamil Pride**

Tamil Nadu produced many brave freedom fighters who fought for independence:

**🌟 V.O. Chidambaram Pillai (1872-1936)**
• Known as "Kappalottiya Tamizhan" (The Tamil Helmsman)
• Started Swadeshi Steam Navigation Company
• Challenged British shipping monopoly

**🔥 Subramania Bharati (1882-1921)**
• Great Tamil poet and freedom fighter
• Used poetry to inspire nationalism
• Advocate for women's rights and social reform

**⚡ Vanchinathan (1886-1911)**
• Assassinated British collector Robert Ashe
• Martyr who gave his life for freedom

Tamil Nadu's heroes showed that freedom burns in every Tamil heart! 🌟`;
  }
  
  if (fuzzyMatch(lowerMessage, ['punjab', 'panjab'])) {
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
  
  if (fuzzyMatch(lowerMessage, ['maharashtra', 'marathi', 'mahaarastra', 'maharastra', 'maha', 'mumbai', 'pune'])) {
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
  
  if (fuzzyMatch(lowerMessage, ['kerala', 'malayalam', 'kochi', 'cochin', 'kerala state'])) {
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
  
  if (fuzzyMatch(lowerMessage, ['gujarat', 'gujarati', 'gujrat', 'ahmedabad', 'gandhi homeland'])) {
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
  
  // PRIORITY 3: Women freedom fighters
  if (fuzzyMatch(lowerMessage, ['women', 'woman', 'female', 'ladies', 'girls']) && fuzzyMatch(lowerMessage, ['freedom', 'fighter', 'independence', 'warrior'])) {
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
  
  // PRIORITY 4: Independence Day greetings
  if (fuzzyMatch(lowerMessage, ['greeting', 'independence day', 'independence', 'august 15', 'aug 15', 'freedom day', 'azadi'])) {
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
  
  // PRIORITY 5: Social media posts
  if (fuzzyMatch(lowerMessage, ['social media', 'post', 'instagram', 'facebook', 'twitter', 'linkedin', 'share', 'hashtag'])) {
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
  
  // PRIORITY 6: Tribal heroes
  if (fuzzyMatch(lowerMessage, ['tribal', 'tribe', 'indigenous', 'adivasi', 'munda', 'santhal'])) {
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
  
  // PRIORITY 7: Wikipedia fallback for other specific person queries
  const specificPersonKeywords = ['tell me about', 'tell me more about', 'more about', 'who is', 'who was', 'about'];
  const isAskingAboutPerson = specificPersonKeywords.some(keyword => lowerMessage.includes(keyword));
  
  if (isAskingAboutPerson) {
    // Extract person name
    let personName = lowerMessage;
    specificPersonKeywords.forEach(keyword => {
      personName = personName.replace(keyword, '').trim();
    });
    
    // Clean the name
    const cleanedName = personName.split(' ').filter(word => word.length > 1).join(' ');
    
    if (cleanedName.length > 2) {
      try {
        const wikiResult = await searchWikipedia(cleanedName);
        
        if (wikiResult.found) {
          return `🇮🇳 **${wikiResult.title}** *(From Wikipedia)*

${wikiResult.extract}

📚 **Want to know more?** I found this information from Wikipedia. Feel free to ask specific questions about their achievements, quotes, or contributions to India's freedom struggle!

*You can also try asking about freedom fighters from specific regions like "Heroes from Tamil Nadu" or "Bengal freedom fighters"* 🌟`;
        } else {
          // Try enhanced searches
          const enhancedQueries = [
            `${cleanedName} freedom fighter`,
            `${cleanedName} Indian independence`,
            `${cleanedName} India freedom movement`
          ];
          
          for (const query of enhancedQueries) {
            const result = await searchWikipedia(query);
            if (result.found) {
              return `🇮🇳 **${result.title}** *(From Wikipedia)*

${result.extract}

📚 **Want to know more?** I found this information from Wikipedia about this freedom fighter!

*You can also ask about regional heroes or other freedom fighters* 🌟`;
            }
          }
          
          // If still not found
          return `🔍 **Searching for "${cleanedName}"...**

I couldn't find detailed information about "${cleanedName}" in my knowledge base or on Wikipedia. This could be because:

• The name might be spelled differently
• They might be a local hero not well-documented online
• Try searching with their full name or alternative spellings

**🌟 However, I can help you with:**
• **Famous Freedom Fighters**: Bhagat Singh, Chandrashekhar Azad, Rani Lakshmibai
• **Regional Heroes**: "Heroes from Tamil Nadu", "Bengal freedom fighters"  
• **Women Warriors**: "Women freedom fighters"
• **Tribal Heroes**: "Tribal freedom fighters"

**Every hero deserves to be remembered! Let me know how else I can help you discover India's freedom fighters! 🇮🇳**`;
        }
      } catch (error) {
        console.error('Wikipedia search error:', error);
        return `⚠️ **Wikipedia Search Temporarily Unavailable**

I'm having trouble connecting to Wikipedia right now, but I can still help you with:

**🌟 Regional Heroes**: Ask about freedom fighters from any Indian state
**👩‍⚔️ Women Warriors**: Learn about brave women who fought for freedom
**🏛️ Historical Periods**: Explore different eras of the independence movement
**🎯 Quick Questions**: Ask about well-known freedom fighters from my database

Try asking: "Heroes from Tamil Nadu" or "Women freedom fighters" 🇮🇳`;
      }
    }
  }
  
  // PRIORITY 8: Single name queries for Wikipedia search
  const singleNameQuery = lowerMessage.trim();
  if (singleNameQuery.split(' ').length <= 2 && singleNameQuery.length > 3) {
    try {
      const wikiResult = await searchWikipedia(singleNameQuery);
      if (wikiResult.found) {
        return `🇮🇳 **${wikiResult.title}** *(From Wikipedia)*

${wikiResult.extract}

📚 **Want to know more?** I found this information from Wikipedia. Feel free to ask specific questions about their achievements, quotes, or contributions to India's freedom struggle!

*You can also try asking about freedom fighters from specific regions like "Heroes from Tamil Nadu" or "Bengal freedom fighters"* 🌟`;
      }
    } catch (error) {
      console.error('Wikipedia search error:', error);
    }
  }
  
  // PRIORITY 9: Default response for unrecognized queries
  return `🇮🇳 **Welcome to the Journey of Forgotten Heroes!**

I'm thrilled you're here to discover India's incredible freedom fighters! 🌟

**🔥 I can help you explore:**
• **Regional Heroes**: Freedom fighters from any Indian state
• **Women Warriors**: Brave ladies who fought for independence  
• **Tribal Legends**: Indigenous heroes who protected their homeland
• **Independence Day Content**: Greetings, posts, and tributes

**🎯 Try asking me:**
• "Tell me about freedom fighters from Tamil Nadu"
• "Heroes from Bengal"
• "Women freedom fighters"
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
              <Users size={20} />
              <span style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#ea580c'}}>{stats.users.toLocaleString()}</span>
            </div>
            <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Heroes Discovered</span>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center'}}>
              <BookOpen size={20} />
              <span style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#16a34a'}}>{stats.stories}</span>
            </div>
            <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Stories Shared</span>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center'}}>
              <Award size={20} />
              <span style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#2563eb'}}>{stats.greetings}</span>
            </div>
            <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Greetings Created</span>
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#fee2e2', borderRadius: '0.5rem'}}>
            <Clock size={16} />
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
                  <BookOpen size={20} color="white" />
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
                <Sparkles size={16} />
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
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>AI Itihaskar is thinking...</span>
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
                <Send size={16} />
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
                <Star size={20} />
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
                  <Calendar size={16} />
                  <span><strong>{selectedFighter.birth} - {selectedFighter.death}</strong></span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                  <MapPin size={16} />
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
