// const reelsData = [
//   {
//     id: 1,
//     title: "Pahalgam — Mountain Bliss",
//     place: "Pahalgam, Kashmir",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069257/withsuhail_takes_us_on_a_trip_to_Pahalgam_Kashmir_during_winter_s_snowy_embrace._%EF%B8%8F_Embark_on_ub5siy.mp4",
//     image: "/images/pahalgam.jpg",

//     rating: 4.8,
//     seats: 5,
//     price: 899,
//     duration: "3 - 5 days",

//     highlights: [
//       "Betaab Valley",
//       "Aru Valley",
//       "Lidder River Views"
//     ],

//    itineraryDays : [
//       {
//         day: "Day 1",
//         activities: ["Hotel check-in", "Aru Valley", "Local market"]
//       },
//       {
//         day: "Day 2",
//         activities: ["Betaab Valley", "River walk"]
//       },
//       {
//         day: "Day 3",
//         activities: ["Photography spots", "Cafe hopping"]
//       }
//     ],

//     stay: {
//       image: "/images/pahalgam-hotel.jpg",
//       name: "Valley Resort",
//       desc: "Cozy stay with mountain views",
//       rating: 4.7,
//       price: 80
//     }
//   },

//   {
//     id: 2,
//     title: "Delhi Heritage Tour",
//     place: "Delhi, India",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069258/%E0%A4%A6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%B2%E0%A5%80_%E0%A4%A6%E0%A4%B0%E0%A5%8D%E0%A4%B6%E0%A4%A8_%EF%B8%8F_...Delhi_old_Delhi_Dilli_Delhi_darshan_dilliwale_Purani_dilli_delhi_lafoxl.mp4",
//     image: "/images/delhi.jpg",

//     rating: 4.6,
//     seats: 10,
//     price: 499,
//     duration: "2 - 4 days",

//     highlights: [
//       "India Gate",
//       "Qutub Minar",
//       "Humayun’s Tomb"
//     ],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         activities: ["Red Fort", "Jama Masjid", "Chandni Chowk"]
//       },
//       {
//         day: "Day 2",
//         activities: ["Qutub Minar", "Lotus Temple", "Hauz Khas"]
//       }
//     ],

//     stay: {
//       image: "/images/delhi-hotel.jpg",
//       name: "City Inn",
//       desc: "Close to major attractions",
//       rating: 4.5,
//       price: 60
//     }
//   },

//   {
//     id: 3,
//     title: "Kinnakorai Tea Hills",
//     place: "Nilgiris, Tamil Nadu",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069258/-_Kinnakorai_%EF%B8%8F..Vc_-_sarath_kalari_kinnakorai_ooty_tamilnadu_yathravazhi_ummcms.mp4",
//     image: "/images/kinnakorai.jpg",

//     rating: 4.7,
//     seats: 6,
//     price: 599,
//     duration: "2 - 3 days",

//     highlights: ["Tea gardens", "Forest trails", "Waterfalls"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         activities: ["Tea estate walk", "Hilltop views"]
//       },
//       {
//         day: "Day 2",
//         activities: ["Waterfall visit", "Photography"]
//       },
//       {
//         day: "Day 3",
//         activities: ["Forest hike"]
//       }
//     ],

//     stay: {
//       image: "/images/kinnakorai-hotel.jpg",
//       name: "Hill Retreat",
//       desc: "Stay in nature's lap",
//       rating: 4.6,
//       price: 90
//     }
//   },

//   {
//     id: 4,
//     title: "Rishikesh Adventure",
//     place: "Rishikesh, Uttarakhand",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069335/Shatrughan_Ghat_Rishikesh_I_have_seen_many_Ganga_Aarti_s_in_Rishikesh_over_several_years_but_iuwyc8.mp4",
//     image: "/images/rishikesh.jpg",

//     rating: 4.8,
//     seats: 8,
//     price: 499,
//     duration: "2 - 4 days",

//     highlights: ["Ganga Aarti", "Rafting", "Laxman Jhula"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         activities: ["Rafting", "Local cafes"]
//       },
//       {
//         day: "Day 2",
//         activities: ["Laxman Jhula", "Ganga Aarti"]
//       }
//     ],

//     stay: {
//       image: "/images/rishikesh-hotel.jpg",
//       name: "Ganga View Stay",
//       desc: "Riverside resort",
//       rating: 4.8,
//       price: 70
//     }
//   },

//   {
//     id: 5,
//     title: "Pangong Lake Serenity",
//     place: "Pangong Lake, Ladakh",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069497/Blue_Beauty_of_LADAKH_%EF%B8%8F_Pangong_lake_ladakh_pangong_reelsinstagram_trending_viral_tre_qgjadd.mp4",
//     image: "/images/pangong.jpg",

//     rating: 4.9,
//     seats: 4,
//     price: 999,
//     duration: "3 - 5 days",

//     highlights: ["Blue lake", "Stargazing", "Camping"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         activities: ["Lake walk", "Photography"]
//       },
//       {
//         day: "Day 2",
//         activities: ["Sunrise view", "Camping"]
//       },
//       {
//         day: "Day 3",
//         activities: ["Night sky watching"]
//       }
//     ],

//     stay: {
//       image: "/images/pangong-hotel.jpg",
//       name: "Lakeview Camp",
//       desc: "Luxury tents near Pangong",
//       rating: 4.8,
//       price: 110
//     }
//   },

//   {
//     id: 6,
//     title: "Andaman Tropical Escape",
//     place: "Andaman & Nicobar",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069680/Drop_everything..._the_Andamans_are_calling_From_crystal-clear_waters_to_lush_green_islands_a_glyd2n.mp4",
//     image: "/images/andaman.jpg",

//     rating: 4.9,
//     seats: 5,
//     price: 1299,
//     duration: "4 - 6 days",

//     highlights: ["Radhanagar Beach", "Snorkeling", "Island tours"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         activities: ["Radhanagar Beach", "Sunset views"]
//       },
//       {
//         day: "Day 2",
//         activities: ["Elephant Beach", "Boat ride"]
//       },
//       {
//         day: "Day 3",
//         activities: ["Ross Island tour"]
//       }
//     ],

//     stay: {
//       image: "/images/andaman-hotel.jpg",
//       name: "Beach Resort",
//       desc: "Ocean-view rooms",
//       rating: 4.9,
//       price: 160
//     }
//   },

//   {
//     id: 7,
//     title: "Goa Beach Vibes",
//     place: "Goa, India",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069689/get_jlbu7c.mp4",
//     image: "/images/goa.jpg",

//     rating: 4.7,
//     seats: 10,
//     price: 699,
//     duration: "3 - 5 days",

//     highlights: ["Beaches", "Nightlife", "Water sports"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         activities: ["Baga Beach", "Candolim"]
//       },
//       {
//         day: "Day 2",
//         activities: ["Colva Beach", "Sunset"]
//       },
//       {
//         day: "Day 3",
//         activities: ["Clubbing", "Food tour"]
//       }
//     ],

//     stay: {
//       image: "/images/goa-hotel.jpg",
//       name: "Beach Resort",
//       desc: "Prime beach location",
//       rating: 4.6,
//       price: 80
//     }
//   },

//   {
//     id: 8,
//     title: "Gulmarg Snow Paradise",
//     place: "Gulmarg, Kashmir",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069695/Magical_Gulmarg_.._kashmir_shotondji_dji_india_viral_explorepage_gulmarg_snow_ngfr26.mp4",
//     image: "/images/gulmarg.jpg",

//     rating: 4.8,
//     seats: 6,
//     price: 899,
//     duration: "2 - 4 days",

//     highlights: ["Gondola ride", "Snow sports"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         activities: ["Skiing", "Gondola"]
//       },
//       {
//         day: "Day 2",
//         activities: ["Meadow walk", "Photography"]
//       }
//     ],

//     stay: {
//       image: "/images/gulmarg-hotel.jpg",
//       name: "Snow Resort",
//       desc: "Stay in snowy hills",
//       rating: 4.7,
//       price: 100
//     }
//   },

//   {
//     id: 9,
//     title: "Jagannath Temple",
//     place: "Puri, Odisha",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069698/Lord_of_the_universe_-_Jagannath_Mahaprabhu_My_last_video_of_Jagannath_Puri_Temple_flag_cha_ceeecj.mp4",
//     image: "/images/jagannath.jpg",

//     rating: 4.7,
//     seats: 10,
//     price: 399,
//     duration: "2 - 3 days",

//     highlights: ["Temple Darshan", "Puri Beach"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         activities: ["Darshan", "Local market"]
//       },
//       {
//         day: "Day 2",
//         activities: ["Puri Beach", "Food tour"]
//       }
//     ],

//     stay: {
//       image: "/images/jagannath-hotel.jpg",
//       name: "Sea View Inn",
//       desc: "Near the temple",
//       rating: 4.5,
//       price: 50
//     }
//   },

//   {
//     id: 10,
//     title: "Dal Lake Houseboat",
//     place: "Srinagar, Kashmir",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069699/Kashmir_Dal_Lake_............._gulmarg_sonamarg_winter_winteriscoming_kashmir_srinagar_hi_mwb64s.mp4",
//     image: "/images/dallake.jpg",

//     rating: 4.9,
//     seats: 4,
//     price: 850,
//     duration: "2 - 3 days",

//     highlights: ["Shikara ride", "Floating market"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         activities: ["Shikara ride", "Floating market"]
//       },
//       {
//         day: "Day 2",
//         activities: ["Mughal Gardens", "Local food"]
//       }
//     ],

//     stay: {
//       image: "/images/dallake-hotel.jpg",
//       name: "Houseboat Stay",
//       desc: "Traditional luxury rooms",
//       rating: 4.9,
//       price: 100
//     }
//   },


//     {
//     id: 11,
//     title: "Munnar Tea Hills",
//     username: "greenescape",
//     place: "Munnar",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069706/Moody_View_of_Munnar_munnar_kerala_kerala_tour_packages_budget_tour_packages_kerala_yqmtkr.mp4",
//     image: "/images/munnar.jpg",
//     location: "Kerala",
//     duration: "3 - 5 days",
//     price: 650,
//     rating: 4.8,
//     seats: 6,

//     highlights: [
//       "Tea plantations",
//       "High-altitude viewpoints",
//       "Rolling green mountains"
//     ],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         title: "Tea Garden Walk",
//         desc: "Explore lush plantations & viewpoints.",
//         activities: ["Tea museum", "Plantation walk"]
//       },
//       {
//         day: "Day 2",
//         title: "Scenic Drive",
//         desc: "Relax at top views.",
//         activities: ["Echo Point", "Photo spots"]
//       },
//       {
//         day: "Day 3",
//         title: "Adventure Day",
//         desc: "Explore nature & trails.",
//         activities: ["Short trek", "Sunset view"]
//       }
//     ],

//     stay: {
//       image: "/images/munnar-hotel.jpg",
//       name: "Hill Resort",
//       desc: "Great mountain views.",
//       price: 85,
//       rating: 4.7
//     }
//   },

//   {
//     id: 12,
//     title: "Nainital Lakeside Escape",
//     username: "lakes_and_peaks",
//     place: "Nainital",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069708/Nainital_%EF%B8%8F......_reels_trending_uttarakhand_nainital_lghsha.mp4",
//     image: "/images/nainital.jpg",
//     location: "Uttarakhand",
//     duration: "2 - 4 days",
//     price: 550,
//     rating: 4.7,
//     seats: 7,

//     highlights: ["Naini Lake", "Cable car ride", "Scenic viewpoints"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         title: "Lakeside Walk",
//         desc: "Relax & enjoy the view.",
//         activities: ["Boating", "Mall Road"]
//       },
//       {
//         day: "Day 2",
//         title: "Sightseeing",
//         desc: "Explore hills & zoo.",
//         activities: ["Snow View", "Nainital Zoo"]
//       }
//     ],

//     stay: {
//       image: "/images/nainital-hotel.jpg",
//       name: "Lake View Hotel",
//       desc: "Peaceful stay near lake.",
//       price: 70,
//       rating: 4.6
//     }
//   },

//   {
//     id: 13,
//     title: "Mumbai City Tour",
//     username: "city_runner",
//     place: "Mumbai",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069709/Mumbai_a_city_that_still_hums_with_poetry_even_as_it_grows_into_a_megapolis._The_sea_still_sig_advgjw.mp4",
//     image: "/images/mumbai.jpg",
//     location: "Mumbai, Maharashtra",
//     duration: "2 - 4 days",
//     price: 699,
//     rating: 4.6,
//     seats: 10,

//     highlights: ["Marine Drive", "Gateway of India"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         title: "South Mumbai",
//         desc: "Historic waterfront sites.",
//         activities: ["Gateway", "Colaba"]
//       },
//       {
//         day: "Day 2",
//         title: "City Lights",
//         desc: "Explore nightlife & food.",
//         activities: ["Marine Drive", "Street food"]
//       }
//     ],

//     stay: {
//       image: "/images/mumbai-hotel.jpg",
//       name: "City Hotel",
//       desc: "Near tourist hotspots.",
//       price: 85,
//       rating: 4.6
//     }
//   },

//   {
//     id: 14,
//     title: "Shimla Hills Adventure",
//     username: "mountain_feels",
//     place: "Shimla",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069717/Shimla_s_Mall_Road_charm_colonial_architecture_cozy_caf%C3%A9s_and_mountain_vibes_all_in_one_stro_alcbqk.mp4",
//     image: "/images/shimla.jpg",
//     location: "Himachal Pradesh",
//     duration: "2 - 4 days",
//     price: 550,
//     rating: 4.7,
//     seats: 8,

//     highlights: ["Mall Road", "Snow views", "Kufri"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         title: "Town Walk",
//         desc: "Explore the iconic streets.",
//         activities: ["Mall Road", "Local snacks"]
//       },
//       {
//         day: "Day 2",
//         title: "Kufri Trip",
//         desc: "Adventure day.",
//         activities: ["Horse ride", "Viewpoints"]
//       }
//     ],

//     stay: {
//       image: "/images/shimla-hotel.jpg",
//       name: "Hill View Resort",
//       desc: "Snowy views & peaceful stay.",
//       price: 75,
//       rating: 4.7
//     }
//   },

//   {
//     id: 15,
//     title: "Pondicherry French Escape",
//     username: "calm_soul",
//     place: "Pondicherry",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069718/Places_to_visit_in_Pondicherry_1._Rock_Beach_2._Pichavaram_Mangrove_Forest3._Eden_Beach_4._Frenc_l844tu.mp4",
//     image: "/images/pondicherry.jpg",
//     location: "Puducherry",
//     duration: "2 - 4 days",
//     price: 599,
//     rating: 4.7,
//     seats: 8,

//     highlights: ["French Town", "Rock Beach"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         title: "White Town",
//         desc: "Explore French architecture & cafés.",
//         activities: ["French colony", "Café hopping"]
//       },
//       {
//         day: "Day 2",
//         title: "Beach Day",
//         desc: "Relax at the shore.",
//         activities: ["Promenade Beach", "Sunset"]
//       }
//     ],

//     stay: {
//       image: "/images/pondicherry-hotel.jpg",
//       name: "Seaside Inn",
//       desc: "Calm & aesthetic rooms.",
//       price: 70,
//       rating: 4.6
//     }
//   },

//   {
//     id: 16,
//     title: "Pune Cultural Trip",
//     username: "urban_rover",
//     place: "Pune",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069721/Pune_%EF%B8%8FFollow_-_aapl_pune_for_such_amazing_content_pune_punecity_nirvi6.mp4",
//     image: "/images/pune.jpg",
//     location: "Pune, MH",
//     duration: "2 - 3 days",
//     price: 499,
//     rating: 4.6,
//     seats: 10,

//     highlights: ["Temples", "Heritage fort"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         title: "City Tour",
//         desc: "Explore famous spots.",
//         activities: ["Dagadusheth Temple", "FC Road"]
//       },
//       {
//         day: "Day 2",
//         title: "Historic Fort",
//         desc: "A heritage walk.",
//         activities: ["Shaniwar Wada"]
//       }
//     ],

//     stay: {
//       image: "/images/pune-hotel.jpg",
//       name: "Urban Stay",
//       desc: "Modern budget rooms.",
//       price: 60,
//       rating: 4.5
//     }
//   },

//   {
//     id: 17,
//     title: "Assam Nature Trails",
//     username: "wildlife_love",
//     place: "Assam",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069732/Rural_Beauty_of_Assam_Do_you_want_to_ride_on_this_boat_Panbecha_Sivasagar_rural_rurallife_wfvtn5.mp4",
//     image: "/images/assam.jpg",
//     location: "Northeast India",
//     duration: "3 - 5 days",
//     price: 899,
//     rating: 4.7,
//     seats: 6,

//     highlights: ["Kaziranga", "Tea estates"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         title: "Safari Day",
//         desc: "Explore wildlife.",
//         activities: ["Kaziranga", "Assam lunch"]
//       },
//       {
//         day: "Day 2",
//         title: "Tea Gardens",
//         desc: "Relax among greenery.",
//         activities: ["Tea estates", "Photo spots"]
//       }
//     ],

//     stay: {
//       image: "/images/assam-hotel.jpg",
//       name: "Nature Retreat",
//       desc: "Perfect nature escape.",
//       price: 95,
//       rating: 4.7
//     }
//   },

//   {
//     id: 18,
//     title: "Mussoorie Hills Escape",
//     username: "hillvibes",
//     place: "Mussorrie",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069741/Winters_in_Mussoorie_%EF%B8%8F___%EF%B8%8F._incredibleindia_uttarakhandtourism._travel_realindia1_trav_ktiu9g.mp4",
//     image: "/images/mussoorie.jpg",
//     location: "Uttarakhand",
//     duration: "2 - 3 days",
//     price: 599,
//     rating: 4.7,
//     seats: 8,

//     highlights: ["Kempty Falls", "Mall Road"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         title: "Hilltop Views",
//         desc: "Relax with a scenic walk.",
//         activities: ["Gun Hill", "Mall Road"]
//       },
//       {
//         day: "Day 2",
//         title: "Adventure Day",
//         desc: "Waterfall exploration.",
//         activities: ["Kempty Fall"]
//       }
//     ],

//     stay: {
//       image: "/images/mussoorie-hotel.jpg",
//       name: "Hillside Resort",
//       desc: "Great valley views.",
//       price: 70,
//       rating: 4.6
//     }
//   },

//   {
//     id: 19,
//     title: "Nubra Valley Desert",
//     username: "ladakh_life",
//     place: "Nubra Valley",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069743/Where_silence_echoes_louder_than_words_Nubra_Valley_a_desert_kissed_by_the_sky._k9afqa.mp4",
//     image: "/images/nubra.jpg",
//     location: "Ladakh",
//     duration: "3 - 5 days",
//     price: 999,
//     rating: 4.9,
//     seats: 4,

//     highlights: ["Sand dunes", "Camel rides"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         title: "Desert Day",
//         desc: "Explore sand dunes.",
//         activities: ["Camel ride", "Photography"]
//       },
//       {
//         day: "Day 2",
//         title: "Local Culture",
//         desc: "Explore monasteries.",
//         activities: ["Diskit monastery"]
//       }
//     ],

//     stay: {
//       image: "/images/nubra-hotel.jpg",
//       name: "Desert Camp",
//       desc: "Luxury tent stay.",
//       price: 120,
//       rating: 4.8
//     }
//   },

//   {
//     id: 20,
//     title: "Jaipur Royal Journey",
//     username: "royal_travels",
//     place: "Jaipur",
//     video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069745/The_Royal_architecture_of_Jaipur_A_living_canvas_of_history_where_every_building_tells_a_royal_egjvan.mp4",
//     image: "/images/jaipur.jpg",
//     location: "Rajasthan",
//     duration: "2 - 4 days",
//     price: 650,
//     rating: 4.8,
//     seats: 8,

//     highlights: ["Amer Fort", "Hawa Mahal"],

//     itineraryDays: [
//       {
//         day: "Day 1",
//         title: "Pink City Tour",
//         desc: "Explore iconic landmarks.",
//         activities: ["Hawa Mahal", "City Palace"]
//       },
//       {
//         day: "Day 2",
//         title: "Fort Day",
//         desc: "Historic fort exploration.",
//         activities: ["Amer Fort", "Jal Mahal"]
//       }
//     ],

//     stay: {
//       image: "/images/jaipur-hotel.jpg",
//       name: "Royal Stay",
//       desc: "Heritage rooms.",
//       price: 90,
//       rating: 4.7
//     }
//   },


//   {
//   id: 21,
//   title: "Wayanad Forest Escape",
//   username: "foreststories",
//   place: "Wayanad",
//   video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069749/Wayanad_....._wayanad_monsoon_tourism_fblifestyle_xa3zl7.mp4",
//   image: "/images/wayanad.jpg",
//   location: "Kerala",
//   price: 750,
//   rating: 4.8,
//   seats: 6,
//   duration: "3 - 5 days",

//   highlights: [
//     "Forest safari",
//     "Tea estates",
//     "Waterfalls"
//   ],

//   itineraryDays: [
//     {
//       day: "Day 1",
//       title: "Nature Trails",
//       desc: "Explore the lush green rainforest.",
//       activities: [
//         "Hike through forest trails",
//         "Visit viewpoint",
//         "Tea plantation walk"
//       ]
//     },
//     {
//       day: "Day 2",
//       title: "Adventure Day",
//       desc: "Discover waterfalls and wildlife.",
//       activities: [
//         "Edakkal Caves",
//         "Waterfall visit",
//         "Local food tasting"
//       ]
//     },
//     {
//       day: "Day 3",
//       title: "Relaxation Day",
//       desc: "Slow paced scenic experiences.",
//       activities: [
//         "Resort leisure",
//         "Spa session",
//         "Photo walk"
//       ]
//     }
//   ],

//   stay: {
//     image: "/images/wayanad-hotel.jpg",
//     name: "Forest Resort",
//     desc: "Stay in greenery surrounded cottages.",
//     price: 110,
//     rating: 4.8
//   }
// },

// {
//   id: 22,
//   title: "Ganesh Chaturthi Vibes",
//   username: "festival_spirit",
//   place: "Ganesh Chaturthi",
//   video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069758/%E0%A4%AC%E0%A4%BE%E0%A4%AA%E0%A5%8D%E0%A4%AA%E0%A4%BE_%EF%B8%8F_....._reelsvideo_reelsviral_reelkarofeelkaro_reelitfeelit_reelstrending_trending_csly1w.mp4",
//   image: "/images/ganesh.jpg",
//   location: "Maharashtra",
//   price: 350,
//   rating: 4.7,
//   seats: 12,
//   duration: "1 - 2 days",

//   highlights: [
//     "Ganpati Darshan",
//     "Street decorations",
//     "Visarjan processions"
//   ],

//   itineraryDays: [
//     {
//       day: "Day 1",
//       title: "Festival Day",
//       desc: "Experience the cultural devotion.",
//       activities: [
//         "Mandap visits",
//         "Aarti",
//         "Modak stalls"
//       ]
//     },
//     {
//       day: "Day 2",
//       title: "Visarjan Day",
//       desc: "Witness the grand immersion.",
//       activities: [
//         "Procession walk",
//         "Street performances",
//         "Night lights"
//       ]
//     }
//   ],

//   stay: {
//     image: "/images/ganesh-hotel.jpg",
//     name: "City Lodge",
//     desc: "Simple and comfortable stay near central city.",
//     price: 40,
//     rating: 4.4
//   }
// },

// {
//   id: 23,
//   title: "Tirupati Balaji",
//   username: "temple_journey",
//   place: "Tirupati",
//   video: "https://res.cloudinary.com/dgynhfgjw/video/upload/v1764069766/T_I_R_U_P_A_T_I_H_E_A_V_E_N_Dont_repost_.............._tirupathi_tirupathi_tirupati_ti_ln0wlq.mp4",
//   image: "/images/tirupati.jpg",
//   location: "Andhra Pradesh",
//   price: 450,
//   rating: 4.8,
//   seats: 10,
//   duration: "2 - 3 days",

//   highlights: [
//     "Balaji Temple",
//     "Scenic hills",
//     "Local cuisine"
//   ],

//   itineraryDays: [
//     {
//       day: "Day 1",
//       title: "Darshan Day",
//       desc: "A spiritual day at the temple.",
//       activities: [
//         "Tirumala Darshan",
//         "Queue complex walkthrough",
//         "Laddu prasad"
//       ]
//     },
//     {
//       day: "Day 2",
//       title: "City Tour",
//       desc: "Experience serene surroundings.",
//       activities: [
//         "Local food tour",
//         "Shopping",
//         "Sri Kapileswara Temple"
//       ]
//     },
//     {
//       day: "Day 3",
//       title: "Hilltop Sights",
//       desc: "Panoramic views across Tirumala.",
//       activities: [
//         "Silathoranam",
//         "Viewpoints",
//         "Photo stops"
//       ]
//     }
//   ],

//   stay: {
//     image: "/images/tirupati-hotel.jpg",
//     name: "Pilgrim Stay",
//     desc: "Comfortable rooms for devotees.",
//     price: 60,
//     rating: 4.6
//   }
// }
// ];
// export default reelsData;
