// import React from 'react';

// /**
//  * Renders a circular preview for another user's active story.
//  * @param {object} props.user - The user object ({id, name, profilePicUrl}).
//  * @param {array} props.stories - The list of active stories for this user.
//  */
// const StoryPreview = ({ user, stories }) => {
//   // Logic to determine if the story ring should be colored (unseen) or gray (seen)
//   const hasUnseenStories = stories && stories.length > 0; // Simplified check

//   return (
//     <div className="flex flex-col items-center cursor-pointer shrink-0">
//       <div 
//         className={`w-16 h-16 rounded-full p-[2px] 
//                     ${hasUnseenStories 
//                       ? 'bg-gradient-to-r from-pink-500 to-red-600' // Active Ring
//                       : 'border-2 border-gray-500' // Placeholder/Seen Ring
//                     } 
//                     flex items-center justify-center transition-all duration-200`}
//       >
//         <img 
//           src={user?.profilePicUrl || '/default-avatar.jpg'} // Use the user's profile picture
//           alt={`${user?.name}'s Story`} 
//           className="w-full h-full object-cover rounded-full border-2 border-gray-900" 
//         />
//       </div>
//       <p className="text-xs text-white mt-1 opacity-80 max-w-[64px] truncate">{user?.name}</p>
//     </div>
//   );
// };

// export default StoryPreview;