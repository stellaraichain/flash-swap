import CryptoConverter from '../components/CryptoConverter';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8">
      {/* Connect Wallet Button */}
      <div className="w-full max-w-4xl flex justify-end mb-6">
        <button className="bg-white text-black font-medium px-5 py-2 rounded-lg hover:bg-gray-200 transition">
          Connect Wallet
        </button>
      </div>

      {/* Crypto Converter Box */}
      <CryptoConverter />
    </main>
  );
}
