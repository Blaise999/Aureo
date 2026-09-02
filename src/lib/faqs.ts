/**
 * FAQs, transcribed verbatim from the live Premium Rooms page.
 *
 * Several of these are policy statements with money attached (extra-person
 * charge, children's policy, group rates, the no-cancellation rule). Have
 * the client confirm each one is still current before launch — the page
 * they came from was last edited in July 2026, but rates move.
 *
 * Typos in the source ("restaurantd", "accomodation", "manila") have been
 * corrected here. Nothing else was reworded.
 */

export interface Faq {
  question: string;
  answer: string[];
}

export const premiumRoomsFaqs: Faq[] = [
  {
    question: "Where is Premium Rooms located?",
    answer: [
      "The Premium Rooms is conveniently located just a 5-minute walk from the main Aureo resort facilities. For added convenience, guests may also ask for our complimentary e-cart service, subject to availability.",
    ],
  },
  {
    question: "How far is Aureo La Union from Manila?",
    answer: [
      "We are 4-5 hours from Manila via TPLEX. For more detailed information you may refer to the locations tab of this website.",
    ],
  },
  {
    question: "Are you near San Juan / the surfing area?",
    answer: ["Yes we are. It's just 15-30 minutes away from our resort."],
  },
  {
    question: "How is the water and sand at Aureo La Union?",
    answer: [
      "Coastal waters in Aureo is tranquil combined with fine textured off-white sand.",
    ],
  },
  {
    question: "Do you offer special rates for groups?",
    answer: [
      "Yes we do. Special rates apply for 10 rooms and above, or equivalent to 20 nights stay in the hotel.",
    ],
  },
  {
    question: "Do you require full payment upon reservation?",
    answer: [
      "We require full payment on or before the option date. Failure to do so will forfeit the reservation.",
    ],
  },
  {
    question: "How can we pay for our reservations?",
    answer: [
      "All payments should be deposited through our major bank partners. For more details regarding payment methods and channels you may call us on the contact numbers listed.",
    ],
  },
  {
    question: "What amenities and activities do the Premium Rooms offer?",
    answer: [
      "Guests can enjoy access to Aureo La Union's resort facilities and recreational activities, including swimming pools, beach access, fitness facilities, and family-friendly leisure spaces. Whether you're seeking relaxation by the shore, quality time with loved ones, or an active getaway, our resort offers a variety of experiences designed to make every stay enjoyable and memorable.",
      "Amenities include complimentary Wi-Fi, spacious accommodations, premium in-room features, and access to the resort's dining outlets and recreational facilities, ensuring a comfortable and convenient stay from arrival to departure.",
    ],
  },
  {
    question: "Do you offer day tours at the New Wing Expansion?",
    answer: [
      "We do not offer day tours, as we want to make the property more private and tranquil for our guests. However, our restaurants are open to walk-in guests so they can taste the best of Aureo.",
    ],
  },
  {
    question: "Do you have family rooms?",
    answer: [
      "Our Family Rooms are available for 4 with a maximum capacity of 6 occupants.",
    ],
  },
  {
    question: "How much is the fee for an extra person?",
    answer: [
      "In excess of 2 persons, Php 3,000 will be charged per person, inclusive of bed and breakfast.",
    ],
  },
  {
    question: "Are children free of charge?",
    answer: [
      "Only children 7 years old and below are free on accommodation only, with at least 1 adult sharing in 1 bed. A maximum of 2 children per room are allowed.",
    ],
  },
  {
    question: "Can I cancel or re-book my reservation?",
    answer: [
      "You may rebook your reservation, but cancellations are not permitted. For more information please refer to the Privacy Policy and Terms and Conditions.",
    ],
  },
  {
    question:
      "Can guests staying at the new hotel use the amenities at the existing Aureo resort?",
    answer: [
      "Yes. Guests of the new hotel have access to the amenities of the existing Aureo resort, including the swimming pools, beach area, dining outlets, and other recreational facilities, subject to resort policies and operating hours.",
    ],
  },
];
