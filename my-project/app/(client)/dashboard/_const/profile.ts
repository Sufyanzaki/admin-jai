// Mock data based on the profile interface
export const profileData = {
  id: "1",
  name: "Riff Raff",
  age: 28,
  gender: "Female",
  location: "United States",
  city: "New York",
  lastOnline: "Last Online",
  ethnicity: "Hispanic",
  sexuality: "Straight",
  image: "https://picsum.photos/seed/profile1/300",
  isGold: true,
  isVerified: true,
  aboutMe:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  interests: [
    "Bartending",
    "Becoming A Fitness Instructor",
    "Being A Handyman",
    "Catering",
    "Cooking",
    "Decorating Homes",
    "Flea Market Shopping",
    "Flipping Items",
    "Making Music",
    "Making T-Shirts",
    "Pet Sitting",
    "Playing The Stock Market",
    "Proofreading And Editing",
    "Refinishing Furniture",
    "Starting A YouTube Channel",
    "Tapping Maple Trees",
    "Wine Making",
    "Writing/Blogging",
  ],
};

export const basicInfo = [
  { label: "I am one", value: "Woman" },
  { label: "Origin", value: "Indonesian" },
  { label: "Sexuality", value: "Man" },
  { label: "Date of birth", value: "16-06-2024" },
  { label: "Relation", value: "Single" },
  { label: "Children", value: "No" },
  { label: "Religion", value: "Max" },
];

export const appearanceInfo = [
  { label: "Length", value: "165 cm" },
  { label: "Hair color", value: "Brown" },
  { label: "Eye color", value: "Brown" },
  { label: "Lichaamstype", value: "Slim" },
  { label: "Clothing styles", value: "Casual" },
  { label: "Intelligence", value: "Average" },
];

export const habitsInfo = [
  { label: "Book", value: "Sometimes" },
  { label: "Drinks", value: "Socially" },
  { label: "Going out", value: "Often" },
];

export const educationAndCareerInfo = [
  { label: "Education", value: "MBO" },
  { label: "Diploma", value: "-" },
  { label: "Career", value: "in the financial sector" },
];

export const mobileBasicInfo = [
  { label: "Age", value: "28 years" },
  { label: "Gender", value: "Female" },
  { label: "Location", value: "New York, US" },
  { label: "Relationship", value: "Single" },
  { label: "Children", value: "None" },
  { label: "Religion", value: "Not specified" },
];

export const mobileAppearanceInfo = [
  { label: "Height", value: "165 cm" },
  { label: "Body Type", value: "Slim" },
  { label: "Hair Color", value: "Brown" },
  { label: "Eye Color", value: "Brown" },
  { label: "Style", value: "Casual" },
];

// Personal Attitude & Behavior (Persoonlijke Houding & Gedrag)
const personalityTraits = [
  { id: 1, label: "Amical", value: "amical" },
  { id: 2, label: "Demanding", value: "demanding" },
  { id: 3, label: "Spontaan", value: "spontaneous" },
  { id: 4, label: "Gevoelig", value: "sensitive" },
  { id: 5, label: "Introvert", value: "introverted" },
  { id: 6, label: "Attentief", value: "attentive" },
  { id: 7, label: "Pragmatisch", value: "pragmatic" },
  { id: 8, label: "Avontuurlijk", value: "adventurous" },
  { id: 9, label: "Extravert", value: "extroverted" },
  { id: 10, label: "Serieus", value: "serious" },
  { id: 11, label: "Mysterieus", value: "mysterious" },
  { id: 12, label: "Verlegen", value: "shy" },
  { id: 13, label: "Eerlijk", value: "honest" },
];

// Hobbies and Interests (Hobby's en Interesses)
const hobbiesAndInterests = {
  muziek: {
    label: "Muziek",
    options: ["Alternative, Jaren, Eighties, Bollywood, Club, country"],
  },
  dans: {
    label: "Dans",
    options: ["Formatie"],
  },
  tvProgrammas: {
    label: "TV-programma's",
    options: [
      "Komedie, griezels, kookshows, avontuur, Documentaires, muziek, kookshows",
    ],
  },
  koken: {
    label: "Koken",
    options: ["Various cooking styles and preferences"],
  },
  reizen: {
    label: "Reizen",
    options: ["Travel destinations and preferences"],
  },
};

const partnerExpectations = [
  {
    category: "Looking for",
    label: "Vrouw",
  },
  {
    category: "Afkomst",
    label: "-",
  },
  {
    category: "Relatie",
    label: "-",
  },
  {
    category: "Vandf leeftijd",
    label: "-",
  },
  {
    category: "Naar Leeftrijd",
    label: "-",
  },
  {
    category: "Lengte",
    label: "-",
  },
  {
    category: "Gewicht[kg]",
    label: "- (kg)",
  },
  {
    category: "Religie",
    label: "-",
  },
  {
    category: "Onderwijs",
    label: "-",
  },
  {
    category: "Kinderen",
    label: "-",
  },
  {
    category: "Rook",
    label: "",
  },
  {
    category: "Drinkin",
    label: "-",
  },
  {
    category: "Uitgann",
    label: "",
  },
];

// Location (Waar woon je)
const locationOptions = [
  {
    category: "Provincie",
    label: "Province",
    placeholder: "Select your province",
  },
];

// Complete profile form structure
const profileFormSections = {
  personalityTraits: {
    title: "Persoonlijke Houding & Gedrag",
    titleEn: "Personal Attitude & Behavior",
    data: personalityTraits,
  },
  hobbiesInterests: {
    title: "Hobby's en Interesses",
    titleEn: "Hobbies and Interests",
    data: hobbiesAndInterests,
  },
  partnerExpectations: {
    title: "Verwachting van de partner",
    titleEn: "Partner Expectations",
    data: partnerExpectations,
  },
  location: {
    title: "Waar woon je",
    titleEn: "Where do you live",
    data: locationOptions,
  },
};

export {
  personalityTraits,
  hobbiesAndInterests,
  partnerExpectations,
  locationOptions,
  profileFormSections,
};
