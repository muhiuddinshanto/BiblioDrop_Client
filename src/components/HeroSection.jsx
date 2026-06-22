import HeroComponent from "./HeroComponent";


export default function HeroSection() {
  return (
    <HeroComponent 
      badgeText="THE KNOWLEDGE BASE"
      headingText="Read Our Latest"
      highlightedHeading="Scholarly Articles."
      placeholder="Search articles, research papers..."
      searchRedirectPath="/books" // এখানে সার্চ করলে ইউজার /blogs?search=... পেজে যাবে
      imageUrl="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800"
      imageTitle="The Era of Digital Archives"
    />
  );
}