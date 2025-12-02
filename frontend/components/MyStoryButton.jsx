// // components/MyStoryButton.jsx

// import { Plus } from "lucide-react";
// import { useRouter } from "next/navigation";

// // Placeholder image for the current user's profile
// const USER_PROFILE_PIC = "/path/to/your/user/profile.jpg"; 

// const MyStoryButton = ({ hasActiveStories }) => {
//   const router = useRouter();

//   const handleCreateClick = () => {
//     // This directs to the story upload page
//     router.push("/upload/story"); 
//   };

//   return (
//     <div 
//       className="flex flex-col items-center cursor-pointer shrink-0" 
//       onClick={handleCreateClick}
//     >
//       <div 
//         className={`w-16 h-16 rounded-full p-[2px] 
//                     ${hasActiveStories 
//                       ? 'bg-gradient-to-r from-teal-400 to-blue-600' // Colored Ring (Active Story)
//                       : 'border-2 border-dashed border-teal-500/50' // Dashed Border (No Story)
//                     } 
//                     flex items-center justify-center relative transition-all duration-200`}
//       >
//         <img 
//           src={USER_PROFILE_PIC} 
//           alt="My Story" 
//           className="w-full h-full object-cover rounded-full border-2 border-gray-900" // Inner border for ring effect
//         />
        
//         {/* The Plus Icon (only shown if NO active stories) */}
//         {!hasActiveStories && (
//           <div 
//             className="absolute bottom-0 right-0 w-5 h-5 bg-teal-500 
//                        rounded-full flex items-center justify-center text-white 
//                        border-2 border-gray-900 shadow-md"
//           >
//             <Plus className="w-4 h-4" />
//           </div>
//         )}
//       </div>
//       <p className="text-xs text-white mt-1 opacity-80">Your Story</p>
//     </div>
//   );
// };

// export default MyStoryButton;