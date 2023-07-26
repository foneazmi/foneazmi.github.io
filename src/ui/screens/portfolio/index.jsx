import {
  portfolioCake,
  portfolioScifest,
  portfolioParking,
  portfolioChatbot,
  portfolioByCoffee,
} from "../../../assets/images";

const DATA = [
  {
    image: portfolioCake,
    title: "Cake",
    description: "Catatan keuangan",
    link: "https://play.google.com/store/apps/details?id=com.khan.cake",
    icon: "📱",
  },
  {
    image: portfolioScifest,
    title: "Scifest",
    description: "Online ticketing",
    link: "http://scifest.mipa.ub.ac.id/",
    icon: "💻",
  },

  {
    image: portfolioByCoffee,
    title: "ByCoffee",
    description: "Coffee shop app",
    link: "https://play.google.com/store/apps/details?id=com.khan.bycoffee",
    icon: "📱",
  },
  {
    image: portfolioChatbot,
    title: "ChatBot",
    description: "Whatsapp & Telegram chat bot",
    link: "https://web.telegram.org/k/#@NamelessxyzBot",
    icon: "🤖",
  },
  {
    image: portfolioParking,
    title: "Parking App",
    description: "Manage your parking area",
    link: "https://play.google.com/store/apps/details?id=com.semanggi.internal",
    icon: "📱",
  },
  {
    text: "🙉🙊🙈",
    title: "Coming Soon",
    description: "Add more later",
    link: "",
    icon: "🦄",
  },
  //
];

const PortfolioItem = ({ image, title, description, link, icon, text }) => (
  <div class="w-full sm:w-52 md:w-72 aspect-square rounded-lg bg-secondary overflow-hidden hover:scale-105 duration-300 select-none">
    {image ? (
      <img src={image} alt="image" className=" w-full h-full" />
    ) : (
      <div className=" w-full h-full justify-center items-center flex">
        <h1 className="text-8xl text-center sm:text-6xl md:text-7xl">{text}</h1>
      </div>
    )}
    <div className="sticky bottom-0 bg-primary h-20 p-4 flex items-center">
      <div className="flex flex-col flex-1">
        <h1 className="text-primary-content text-lg font-bold">{title}</h1>
        <h1 className="text-primary-content text-xs">{description}</h1>
      </div>
      <div>
        <h1 onClick={() => link && window.open(link)} className="text-5xl">
          {icon}
        </h1>
      </div>
    </div>
  </div>
);

export const PortfolioScreen = () => {
  return (
    <div className="overflow-y-auto scrollbar-hide p-4 h-full flex items-center">
      <div className="flex flex-wrap justify-center m-auto gap-4 sm:gap-2 md:gap-4">
        {DATA.map((item, i) => (
          <PortfolioItem key={`${i}-portfolio-item`} {...item} />
        ))}
      </div>
    </div>
  );
};
