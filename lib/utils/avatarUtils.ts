// Path: lib/utils/avatarUtils.ts

// Function to get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Function to generate a consistent color based on name
export const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
    'bg-orange-500', 'bg-cyan-500'
  ];

  const nameHash = name.split('').reduce((hash, char) => {
    return char.charCodeAt(0) + ((hash << 5) - hash);
  }, 0);

  return colors[Math.abs(nameHash) % colors.length];
};