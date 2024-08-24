function HeroSection() {
  return (
    <>
      <div>
        <div className="mt-14 pl-8">
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
            {" "}
            <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
              OwnWallets
            </mark>{" "}
            Supports Multiple Blockchains
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Enter a seed phrase or generate a new one to get started.
          </p>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
