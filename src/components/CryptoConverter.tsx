'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const coins = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '/btc.png' },
  { symbol: 'ETH', name: 'Ethereum', icon: '/eth.png' },
  { symbol: 'USDT', name: 'Tether', icon: '/usdt.png' },
];

export default function CryptoConverter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('BTC');
  const [to, setTo] = useState('ETH');
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchConversion = async () => {
    const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await res.json();
    setResult(data.result);
    setRate(data.info.rate);
    setLastUpdated(new Date().toISOString().split('.')[0].replace('T', ' '));
  };

  useEffect(() => {
    fetchConversion();
  }, [amount, from, to]);

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const CoinSelect = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent text-white font-semibold pl-2 pr-6 py-2 appearance-none focus:outline-none"
    >
      {coins.map((coin) => (
        <option
          key={coin.symbol}
          value={coin.symbol}
          className="text-black"
        >
          {coin.symbol}
        </option>
      ))}
    </select>
  );

  const getIcon = (symbol: string) =>
    coins.find((c) => c.symbol === symbol)?.icon || '';

  return (
    <div className="bg-[#101114] text-white p-8 rounded-2xl max-w-4xl w-full mx-auto shadow-xl">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center bg-[#16171c] border border-blue-500 rounded-lg px-4 py-3 w-full sm:w-1/3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="bg-transparent text-white text-lg w-full focus:outline-none"
          />
          <Image src={getIcon(from)} alt={from} width={24} height={24} className="mx-2" />
          <CoinSelect value={from} onChange={setFrom} />
        </div>

        <button
          onClick={swap}
          className="text-white text-xl hover:opacity-80 rotate-90 sm:rotate-0"
        >
          ⟳
        </button>

        <div className="flex items-center bg-[#16171c] border border-blue-500 rounded-lg px-4 py-3 w-full sm:w-1/3">
          <div className="text-lg font-bold w-full">{result?.toLocaleString(undefined, { maximumFractionDigits: 8 })}</div>
          <span>{amount * 97000}</span>
          <Image src={getIcon(to)} alt={to} width={24} height={24} className="mx-2" />
          <CoinSelect value={to} onChange={setTo} />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full whitespace-nowrap">
          Flash Swap
        </button>
      </div>

      <div className="text-gray-400 text-sm mt-4">
        1 {from} = {rate?.toLocaleString(undefined, { maximumFractionDigits: 6 })} {to} &nbsp;
        <span className="text-gray-500">Last Update: {lastUpdated}</span>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        This offers real-time exchange rates for easy conversion from {from} to {to}.
        All crypto prices are real-time data and can change rapidly.
      </p>
    </div>
  );
}
