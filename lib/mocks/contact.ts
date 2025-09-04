// lib/mocks/contact.ts

export interface Contact {
  id: number
  name: string
  lastSeen: string
  avatar: string
  chatUrl: string
}

export const contacts: Contact[] = [
  { id: 1, name: "Belami", lastSeen: "last seen recently", avatar: "http://localhost:3000/assets/avatar/belami.jpg", chatUrl: "http://localhost:3000/chats/1" },
  { id: 2, name: "Hamed Akbari", lastSeen: "last seen recently", avatar: "http://localhost:3000/assets/avatar/hamed.jpg", chatUrl: "http://localhost:3000/chats/2" },
  { id: 3, name: "Telegram", lastSeen: "last seen recently", avatar: "http://localhost:3000/assets/avatar/telegram.jpg", chatUrl: "http://localhost:3000/chats/3" },
  { id: 4, name: "Amir Rahemi", lastSeen: "last seen recently", avatar: "http://localhost:3000/assets/avatar/amir.jpg", chatUrl: "http://localhost:3000/chats/4" },
  { id: 5, name: "Saved Messages", lastSeen: "last seen recently", avatar: "http://localhost:3000/assets/avatar/save-message.jpeg", chatUrl: "http://localhost:3000/chats/5" },
  { id: 6, name: "eldràcu", lastSeen: "last seen recently", avatar: "http://localhost:3000/assets/avatar/eldracu.jpeg", chatUrl: "http://localhost:3000/chats/6" },
  
  { id: 7, name: "Elon Musk", lastSeen: "2025-08-25T09:10:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/7" },
  { id: 8, name: "Taylor Swift", lastSeen: "2025-08-25T02:45:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/8" },
  { id: 9, name: "Cristiano Ronaldo", lastSeen: "2025-08-24T21:30:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/9" },
  { id: 10, name: "Lionel Messi", lastSeen: "2025-08-23T15:20:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/10" },
  { id: 11, name: "Billie Eilish", lastSeen: "2025-08-25T07:55:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/11" },
  { id: 12, name: "Mark Zuckerberg", lastSeen: "2025-08-22T19:00:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/12" },
  { id: 13, name: "Zendaya", lastSeen: "2025-08-24T12:40:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/13" },
  { id: 14, name: "Robert Downey Jr.", lastSeen: "2025-08-25T10:00:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/14" },
  { id: 15, name: "Ariana Grande", lastSeen: "2025-08-21T20:30:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/15" },
  { id: 16, name: "Dwayne Johnson", lastSeen: "2025-08-23T11:15:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/16" },
  { id: 17, name: "Kylie Jenner", lastSeen: "2025-08-25T01:00:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/17" },
  { id: 18, name: "Selena Gomez", lastSeen: "2025-08-24T08:25:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/18" },
  { id: 19, name: "Beyoncé", lastSeen: "2025-08-25T03:40:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/19" },
  { id: 20, name: "Justin Bieber", lastSeen: "2025-08-22T23:05:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/20" },
  { id: 21, name: "Kim Kardashian", lastSeen: "2025-08-23T18:50:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/21" },
  { id: 22, name: "Oprah Winfrey", lastSeen: "2025-08-25T09:30:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/22" },
  { id: 23, name: "LeBron James", lastSeen: "2025-08-24T13:40:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/23" },
  { id: 24, name: "Shakira", lastSeen: "2025-08-23T16:20:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/24" },
  { id: 25, name: "Tom Cruise", lastSeen: "2025-08-21T22:00:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/25" },
  { id: 26, name: "Keanu Reeves", lastSeen: "2025-08-22T14:15:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/26" },
  { id: 27, name: "Chris Hemsworth", lastSeen: "2025-08-25T06:20:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/27" },
  { id: 28, name: "Scarlett Johansson", lastSeen: "2025-08-24T15:55:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/28" },
  { id: 29, name: "Angelina Jolie", lastSeen: "2025-08-22T17:45:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/29" },
  { id: 30, name: "Brad Pitt", lastSeen: "2025-08-25T04:10:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/30" },
  { id: 31, name: "Leonardo DiCaprio", lastSeen: "2025-08-23T09:05:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/31" },
  { id: 32, name: "Megan Fox", lastSeen: "2025-08-24T19:20:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/32" },
  { id: 33, name: "Post Malone", lastSeen: "2025-08-25T08:50:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/33" },
  { id: 34, name: "Rihanna", lastSeen: "2025-08-21T11:40:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/34" },
  { id: 35, name: "Ed Sheeran", lastSeen: "2025-08-24T22:10:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/35" },
  { id: 36, name: "Adele", lastSeen: "2025-08-22T13:25:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/36" },
  { id: 37, name: "Drake", lastSeen: "2025-08-25T05:15:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/37" },
  { id: 38, name: "Snoop Dogg", lastSeen: "2025-08-23T20:40:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/38" },
  { id: 39, name: "Eminem", lastSeen: "2025-08-22T10:00:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/39" },
  { id: 40, name: "Kendrick Lamar", lastSeen: "2025-08-24T16:35:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/40" },
  { id: 41, name: "Lady Gaga", lastSeen: "2025-08-21T15:55:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/41" },
  { id: 42, name: "Johnny Depp", lastSeen: "2025-08-25T07:00:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/42" },
  { id: 43, name: "Emma Watson", lastSeen: "2025-08-23T12:20:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/43" },
  { id: 44, name: "Daniel Radcliffe", lastSeen: "2025-08-24T18:50:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/44" },
  { id: 45, name: "Gal Gadot", lastSeen: "2025-08-25T02:30:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/45" },
  { id: 46, name: "Chris Evans", lastSeen: "2025-08-23T21:25:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/46" },
  { id: 47, name: "Tom Holland", lastSeen: "2025-08-25T00:40:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/47" },
  { id: 48, name: "Zendaya", lastSeen: "2025-08-24T09:50:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/48" },
  { id: 49, name: "Miley Cyrus", lastSeen: "2025-08-23T17:10:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/49" },
  { id: 50, name: "Bruno Mars", lastSeen: "2025-08-22T08:15:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/50" },
  { id: 51, name: "Shawn Mendes", lastSeen: "2025-08-21T23:30:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/51" },
  { id: 52, name: "Will Smith", lastSeen: "2025-08-22T18:40:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/52" },
  { id: 53, name: "Jaden Smith", lastSeen: "2025-08-24T14:05:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/53" },
  { id: 54, name: "Kanye West", lastSeen: "2025-08-25T03:15:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/54" },
  { id: 55, name: "Travis Scott", lastSeen: "2025-08-23T08:25:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/55" },
  { id: 56, name: "Dua Lipa", lastSeen: "2025-08-25T06:55:00Z", avatar:"http://localhost:3000/assets/avatar/", chatUrl: "http://localhost:3000/chats/56" }
]