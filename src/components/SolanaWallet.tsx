import { useState } from "react";
import { mnemonicToSeed } from "bip39"; // or mnemonicToSeed (async)
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

interface SolanaWalletProps {
  mnemonic: string;
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<Keypair['publicKey'][]>([]);

  return (
    <div>
      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic); 
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setPublicKeys([...publicKeys, keypair.publicKey]);
        }}
      >
        Add wallet
      </button>
      {publicKeys.map((p, index) => (
        <div key={index}>{p.toBase58()}</div>
      ))}
    </div>
  );
}
