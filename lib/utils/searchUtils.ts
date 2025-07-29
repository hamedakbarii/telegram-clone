// Path: lib/utils/searchUtils.ts

interface Chat {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    isOnline: boolean;
    isPinned: boolean;
    messageStatus: string;
    isArchive: boolean;
  }
  
  export interface SearchResult extends Chat {
    matchType: 'name' | 'message' | 'both';
    relevanceScore: number;
  }
  
  // Remove diacritics and normalize text for better search
  export const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .trim();
  };
  
  // Calculate relevance score based on match position and type
  export const calculateRelevanceScore = (
    chat: Chat,
    query: string
  ): { score: number; matchType: 'name' | 'message' | 'both' } => {
    const normalizedQuery = normalizeText(query);
    const normalizedName = normalizeText(chat.name);
    const normalizedMessage = normalizeText(chat.lastMessage);
  
    let score = 0;
    let matchType: 'name' | 'message' | 'both' = 'message';
  
    // Name matches get higher scores
    const nameIndex = normalizedName.indexOf(normalizedQuery);
    const messageIndex = normalizedMessage.indexOf(normalizedQuery);
  
    if (nameIndex !== -1 && messageIndex !== -1) {
      matchType = 'both';
      score = 100;
      // Exact name match gets highest score
      if (normalizedName === normalizedQuery) score = 150;
      // Name starts with query gets high score
      else if (nameIndex === 0) score = 120;
    } else if (nameIndex !== -1) {
      matchType = 'name';
      // Exact name match
      if (normalizedName === normalizedQuery) score = 150;
      // Name starts with query
      else if (nameIndex === 0) score = 120;
      // Name contains query
      else score = 100;
    } else if (messageIndex !== -1) {
      matchType = 'message';
      // Message starts with query
      if (messageIndex === 0) score = 80;
      // Message contains query
      else score = 60;
    }
  
    // Boost pinned chats
    if (chat.isPinned) score += 10;
    
    // Boost chats with unread messages
    if (chat.unreadCount > 0) score += 5;
    
    // Boost online users
    if (chat.isOnline) score += 3;
  
    return { score, matchType };
  };
  
  // Advanced search function with multiple criteria
  export const searchChats = (chats: Chat[], query: string): SearchResult[] => {
    if (!query.trim()) return chats.map(chat => ({ ...chat, matchType: 'name' as const, relevanceScore: 0 }));
  
    const results: SearchResult[] = [];
    
    for (const chat of chats) {
      const { score, matchType } = calculateRelevanceScore(chat, query);
      
      if (score > 0) {
        results.push({
          ...chat,
          matchType,
          relevanceScore: score
        });
      }
    }
  
    // Sort by relevance score (highest first)
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  };
  
  // Highlight matching text in search results
  export const highlightMatch = (text: string, query: string): string => {
    if (!query.trim()) return text;
    
    const normalizedQuery = normalizeText(query);
    const normalizedText = normalizeText(text);
    const index = normalizedText.indexOf(normalizedQuery);
    
    if (index === -1) return text;
    
    const start = index;
    const end = start + query.length;
    
    return (
      text.slice(0, start) +
      `<mark class="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">` +
      text.slice(start, end) +
      `</mark>` +
      text.slice(end)
    );
  };
  
  // Search suggestions based on partial input
  export const getSearchSuggestions = (chats: Chat[], query: string, limit: number = 5): string[] => {
    if (!query.trim()) return [];
    
    const suggestions = new Set<string>();
    const normalizedQuery = normalizeText(query);
    
    for (const chat of chats) {
      const normalizedName = normalizeText(chat.name);
      
      // Add name if it starts with query
      if (normalizedName.startsWith(normalizedQuery) && normalizedName !== normalizedQuery) {
        suggestions.add(chat.name);
      }
      
      // Add words from messages that start with query
      const words = chat.lastMessage.split(/\s+/);
      for (const word of words) {
        const normalizedWord = normalizeText(word);
        if (normalizedWord.startsWith(normalizedQuery) && normalizedWord.length > normalizedQuery.length) {
          suggestions.add(word);
        }
      }
      
      if (suggestions.size >= limit) break;
    }
    
    return Array.from(suggestions).slice(0, limit);
  };