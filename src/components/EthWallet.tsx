import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

interface EthWalletProps {
  mnemonic: string;
}

export const EthWallet = ({ mnemonic }: EthWalletProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]); // Define the type as string[]

  return (
    <div>
      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex(currentIndex + 1);
          setAddresses((prevAddresses) => [...prevAddresses, wallet.address]); // Use functional update to prevent overwriting
        }}
      >
        Add ETH wallet
      </button>

      {addresses.map((p, index) => (
        <div key={index}>
          Eth - {p}
        </div>
      ))}
    </div>
  );
};
