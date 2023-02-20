export const PortfolioScreen = () => {
  return (
    <div className="overflow-y-auto scrollbar-hide p-4 h-full flex items-center">
      <div className="flex flex-wrap justify-center m-auto">
        {DATA.map((data) => {
          return (
            <div
              className="p-28 sm:p-32 m-2 bg-primary rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-primary-focus duration-300"
              key={`${data}-Portfolio`}
            >
              <h1 className="text-primary-content">{data}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DATA = [1, 2, 3, 4, 5];
