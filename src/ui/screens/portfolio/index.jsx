import { portfolioCake } from "../../../assets/images";

export const PortfolioScreen = () => {
  return (
    <div className="overflow-y-auto scrollbar-hide p-4 h-full flex items-center">
      <div className="flex flex-wrap justify-center m-auto gap-4">
        {DATA.map((e, i) => (
          <div
            key={`${i}-portfolio`}
            class="w-full sm:w-64 md:w-96 aspect-square rounded-lg overflow-hidden group transition ease-in-out delay-150 hover:-translate-y-1 bg-secondary hover:bg-secondary-focus duration-300"
          >
            <img src={portfolioCake} alt="image" className=" w-full h-full" />
            <div className="sticky bottom-0 bg-primary h-20 p-4 flex items-center">
              <div className="flex flex-col flex-1">
                <h1 className="text-primary-content text-lg font-bold">Cake</h1>
                <h1 className="text-primary-content text-xs">
                  Catatan Keuangan
                </h1>
              </div>
              <div>
                <img
                  src="https://static.wikia.nocookie.net/google/images/2/24/Play_Store.png"
                  className="h-8 w-8"
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.khan.cake"
                    )
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}

        <div class="w-full sm:w-64 md:w-96 aspect-square rounded-lg overflow-hidden group transition ease-in-out delay-150 hover:-translate-y-1  bg-secondary hover:bg-secondary-focus duration-300">
          <div className=" w-full h-full justify-center items-center flex">
            <h1 className="text-9xl">🦄</h1>
          </div>
          <div className="sticky bottom-0 bg-primary h-20 p-4 flex items-center">
            <div className="flex flex-col flex-1">
              <h1 className="text-primary-content text-lg font-bold">
                Cooming
              </h1>
              <h1 className="text-primary-content text-xs">Soon</h1>
            </div>
            <div>
              <h1 className="text-6xl">🦄</h1>
              {/* <img
                src="https://static.wikia.nocookie.net/google/images/2/24/Play_Store.png"
                className="h-8 w-8"
                onClick={() => {}}
                alt=""
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DATA = [1];
