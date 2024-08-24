import { useState } from "react";
import { generateMnemonic, validateMnemonic } from "bip39";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet";
import { SolanaWallet } from "./components/SolanaWallet";
import { EthWallet } from "./components/EthWallet";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

function App() {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [mnemonicGroups, setMnemonicGroups] = useState<string[][]>([]);
  const [showSolanaWallet, setShowSolanaWallet] = useState(false);
  const [showEthWallet, setShowEthWallet] = useState(false);
  const [isValidMnemonic, setIsValidMnemonic] = useState<boolean | null>(null); // Track validity (null = unvalidated)

  async function generateMn() {
    const mn = await generateMnemonic();
    setMnemonic(mn);

    const words = mn.split(" ");
    const groups = [];
    for (let i = 0; i < words.length; i += 4) {
      groups.push(words.slice(i, i + 4));
    }
    setMnemonicGroups(groups);
  }

  function handleMnemonicChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMnemonic(e.target.value);
    setIsValidMnemonic(null); // Reset validity on change
  }

  function validateMnemonicPhrase() {
    const valid = validateMnemonic(mnemonic);
    if (valid) {
      setIsValidMnemonic(true);
    } else {
      setIsValidMnemonic(false);
      alert("Invalid mnemonic phrase");
    }
  }

  function handleShowSolanaWallet() {
    if (isValidMnemonic) {
      setShowSolanaWallet(true);
    }
  }

  function handleShowEthWallet() {
    if (isValidMnemonic) {
      setShowEthWallet(true);
    }
  }

  return (
    <>
    <Header/>
    <HeroSection/>
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <button
        onClick={generateMn}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Create Seed Phrase
      </button>

      <div className="mt-4 w-full max-w-md ">
        <Sheet>
          <SheetTrigger>Open Seed Phrase</SheetTrigger>
          <SheetContent className="w-full max-w-4xl">
            <SheetHeader>
              <SheetTitle>Mnemonic Seed Phrase</SheetTitle>
              <SheetDescription>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {mnemonicGroups.flat().map((word, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 p-4 rounded-lg text-center bg-white shadow-sm break-words"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <div className="mt-4">
          <input
            placeholder="Paste your seed phrase here"
            type="password"
            value={mnemonic}
            onChange={handleMnemonicChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isValidMnemonic === false ? "border-red-500" : ""
            }`}
          />
          {isValidMnemonic === false && (
            <p className="text-red-500 text-sm mt-2">
              Invalid mnemonic phrase
            </p>
          )}
        </div>

        <button
          onClick={validateMnemonicPhrase}
          className="bg-green-500 text-white font-bold py-2 px-4 mt-4 rounded shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          disabled={!mnemonic}
        >
          Validate Mnemonic
        </button>

        {/* Only show wallet buttons after validation and if the mnemonic is valid */}
        {isValidMnemonic && (
          <>
            <button
              onClick={handleShowSolanaWallet}
              className="bg-green-500 text-white font-bold py-2 px-4 mt-4 rounded shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Show Solana Wallet
            </button>
            <button
              onClick={handleShowEthWallet}
              className="bg-green-500 text-white font-bold py-2 px-4 mt-4 rounded shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Show ETH Wallet
            </button>
          </>
        )}

        {showSolanaWallet && <SolanaWallet mnemonic={mnemonic} />}
        {showEthWallet && <EthWallet mnemonic={mnemonic} />}
      </div>
    </div>
    </>
  );
}

export default App;
