const reelsData = [
  {
    id: 1,
    title: "Paris — Eiffel Tower",
    username: "travelwithsam",
    place: "Paris, France",

    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    image: "/images/paris-hero.jpg",

    location: "Paris, France",
    price: 799,
    rating: 4.9,
    seats: 5,
    duration: "4 - 6 days",

    highlights: [
      "Eiffel Tower evening view",
      "Louvre Museum full access",
      "Seine River Cruise",
      "Montmartre cafés",
    ],

    itinerary: [
      {
        title: "Arrival + Eiffel Tower",
        desc: "Settle into your Paris hotel and enjoy a relaxing evening.",
        activities: [
          "Hotel check-in",
          "Evening Eiffel Tower visit",
          "French dinner",
        ],
      },
      {
        title: "Louvre + Cruise",
        desc: "Explore the biggest art museum in the world.",
        activities: ["Louvre tour", "Garden walk", "Seine cruise"],
      },
    ],

    stay: {
      image: "/images/paris-hotel.jpg",
      name: "City Hotel Paris",
      desc: "Centrally located hotel with Eiffel views.",
      price: 120,
      rating: 4.7,
    },
  },

  {
    id: 2,
    title: "Maldives Beaches",
    username: "wanderlust_vani",
    place: "Maldives",

    video: "https://www.w3schools.com/html/movie.mp4",
    image: "/images/maldives-hero.jpg",

    location: "Maafushi, Maldives",
    price: 1299,
    rating: 4.8,
    seats: 3,
    duration: "3 - 5 days",

    highlights: [
      "Crystal clear blue water",
      "Snorkeling with marine life",
      "Island hopping",
    ],

    itinerary: [
      {
        title: "Arrival + Beach Chill",
        desc: "Relax by the beach with sunset views.",
        activities: ["Welcome drink", "Beach walk"],
      },
      {
        title: "Snorkeling + Water Sports",
        desc: "See coral reefs and marine life.",
        activities: ["Snorkeling", "Island hopping"],
      },
    ],

    stay: {
      image: "/images/maldives-resort.jpg",
      name: "Coral Bay Resort",
      desc: "Water villas with private decks.",
      price: 250,
      rating: 4.9,
    },
  },
];

export default reelsData;
