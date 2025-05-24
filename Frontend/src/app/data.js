const venues = [
  {
    id: 1,
    name: "Royal Mandap",
    category: "Mandap",
    image:
      "https://img.freepik.com/free-photo/navratri-highly-detailed-door-decoration_23-2151193774.jpg?ga=GA1.1.2138913309.1657375850&semt=ais_hybrid",
    capacity: 500,
    price: 5000,
    location: "Mumbai",
    rating: 4.5,
    description:
      "A luxurious mandap perfect for grand weddings and events. With elegant decor and ample space, it offers a royal experience for your special day.",
    features: [
      "Elegant decor",
      "Ample parking space",
      "Air-conditioned halls",
      "In-house catering",
      "Lighting and sound systems",
    ],
  },
  {
    id: 2,
    name: "Grand Hotel",
    category: "Hotel",
    image:
      "https://img.freepik.com/free-photo/navratri-highly-detailed-door-decoration_23-2151193774.jpg?ga=GA1.1.2138913309.1657375850&semt=ais_hybrid",
    capacity: 300,
    price: 8000,
    location: "Delhi",
    rating: 4.7,
    description:
      "A five-star hotel with state-of-the-art facilities, perfect for corporate events, weddings, and social gatherings. Enjoy world-class hospitality and exquisite catering.",
    features: [
      "Luxury rooms",
      "Conference halls",
      "Swimming pool",
      "Fine dining restaurant",
      "24/7 room service",
    ],
  },
  {
    id: 3,
    name: "Private Garden",
    category: "Private Plot",
    image:
      "https://img.freepik.com/free-photo/navratri-highly-detailed-door-decoration_23-2151193774.jpg?ga=GA1.1.2138913309.1657375850&semt=ais_hybrid",
    capacity: 200,
    price: 3000,
    location: "Bangalore",
    rating: 4.2,
    description:
      "A serene and picturesque garden venue, ideal for intimate weddings, parties, and outdoor events. Surrounded by lush greenery, it offers a peaceful ambiance.",
    features: [
      "Outdoor seating",
      "Natural greenery",
      "Flexible layouts",
      "Catering options",
      "Ample parking",
    ],
  },
  {
    id: 4,
    name: "Luxury Mandap",
    category: "Mandap",
    image:
      "https://img.freepik.com/free-photo/navratri-highly-detailed-door-decoration_23-2151193774.jpg?ga=GA1.1.2138913309.1657375850&semt=ais_hybrid",
    capacity: 600,
    price: 7000,
    location: "Hyderabad",
    rating: 4.8,
    description:
      "A premium mandap with modern amenities and traditional decor. Perfect for large weddings and cultural events, it ensures a memorable experience.",
    features: [
      "Modern amenities",
      "Traditional decor",
      "Spacious halls",
      "In-house decorators",
      "Lighting and sound systems",
    ],
  },
  {
    id: 5,
    name: "Beach Resort",
    category: "Hotel",
    image:
      "https://img.freepik.com/free-photo/navratri-highly-detailed-door-decoration_23-2151193774.jpg?ga=GA1.1.2138913309.1657375850&semt=ais_hybrid",
    capacity: 400,
    price: 10000,
    location: "Goa",
    rating: 4.9,
    description:
      "A stunning beachfront resort offering breathtaking views of the ocean. Ideal for destination weddings, parties, and corporate retreats.",
    features: [
      "Beachfront location",
      "Private beach access",
      "Luxury villas",
      "Spa and wellness center",
      "Multi-cuisine restaurant",
    ],
  },
  {
    id: 6,
    name: "Farmhouse",
    category: "Private Plot",
    image:
      "https://img.freepik.com/free-photo/navratri-highly-detailed-door-decoration_23-2151193774.jpg?ga=GA1.1.2138913309.1657375850&semt=ais_hybrid",
    capacity: 150,
    price: 4000,
    location: "Pune",
    rating: 4.3,
    description:
      "A charming farmhouse surrounded by nature, perfect for small weddings, family gatherings, and private events. Offers a rustic and cozy atmosphere.",
    features: [
      "Rustic ambiance",
      "Outdoor seating",
      "Bonfire area",
      "Catering options",
      "Ample parking",
    ],
  },
  {
    id: 7,
    name: "Skyline Banquet",
    category: "Banquet Hall",
    image:
      "https://img.freepik.com/free-photo/navratri-highly-detailed-door-decoration_23-2151193774.jpg?ga=GA1.1.2138913309.1657375850&semt=ais_hybrid",
    capacity: 800,
    price: 12000,
    location: "Chennai",
    rating: 4.6,
    description:
      "A spacious and elegant banquet hall with modern facilities. Suitable for large-scale events, weddings, and conferences. Offers panoramic city views.",
    features: [
      "Panoramic city views",
      "Modern facilities",
      "Flexible seating arrangements",
      "In-house catering",
      "Lighting and sound systems",
    ],
  },
  {
    id: 8,
    name: "Riverside Retreat",
    category: "Resort",
    image:
      "https://img.freepik.com/free-photo/navratri-highly-detailed-door-decoration_23-2151193774.jpg?ga=GA1.1.2138913309.1657375850&semt=ais_hybrid",
    capacity: 250,
    price: 6000,
    location: "Kolkata",
    rating: 4.4,
    description:
      "A tranquil riverside resort offering a perfect blend of luxury and nature. Ideal for weddings, parties, and weekend getaways.",
    features: [
      "Riverside location",
      "Luxury cottages",
      "Spa and wellness center",
      "Outdoor activities",
      "Multi-cuisine restaurant",
    ],
  },
  {
    id: 9,
    name: "Heritage Palace",
    category: "Heritage Venue",
    image:
      "https://img.freepik.com/free-photo/navratri-highly-detailed-door-decoration_23-2151193774.jpg?ga=GA1.1.2138913309.1657375850&semt=ais_hybrid",
    capacity: 1000,
    price: 15000,
    location: "Jaipur",
    rating: 4.9,
    description:
      "A majestic heritage palace with royal architecture and timeless elegance. Perfect for grand weddings, cultural events, and photo shoots.",
    features: [
      "Royal architecture",
      "Spacious courtyards",
      "Traditional decor",
      "In-house catering",
      "Lighting and sound systems",
    ],
  },
  {
    id: 10,
    name: "Mountain View Lodge",
    category: "Resort",
    image:
      "https://img.freepik.com/free-photo/navratri-highly-detailed-door-decoration_23-2151193774.jpg?ga=GA1.1.2138913309.1657375850&semt=ais_hybrid",
    capacity: 120,
    price: 5000,
    location: "Manali",
    rating: 4.7,
    description:
      "A cozy lodge nestled in the mountains, offering stunning views and a peaceful environment. Ideal for small weddings, honeymoons, and retreats.",
    features: [
      "Mountain views",
      "Cozy cabins",
      "Bonfire area",
      "Trekking activities",
      "Multi-cuisine restaurant",
    ],
  },
];

export default venues;
