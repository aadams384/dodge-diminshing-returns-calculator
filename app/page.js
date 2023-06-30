"use client";
import Image from "next/image";
import RootLayout from "./layout";
import react, { useEffect, useState } from "react";

export default function Home() {
  const [undiminishedAmount, setUndiminishedAmount] = useState(0);
  const [diminishedAmount, setDiminishedAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [playerClass, setPlayerClass] = useState("warrior");

  const coefficients = {
    warPalDK: {
      k: 0.956,
      cInverse: 0.011347,
    },

    druid: {
      k: 0.972,
      cInverse: 0.008555,
    },
  };

  useEffect(() => {
    let k;
    let cInverse;
    if (
      (playerClass === "warrior") |
      (playerClass === "paladin") |
      (playerClass === "death knight")
    ) {
      k = coefficients.warPalDK.k;
      cInverse = coefficients.warPalDK.cInverse;
    } else if (playerClass === "druid") {
      k = coefficients.druid.k;
      cInverse = coefficients.druid.cInverse;
    }

    const result = cInverse + k / undiminishedAmount;
    setDiminishedAmount((1 / result).toFixed(2));
  }, [
    playerClass,
    undiminishedAmount,
    coefficients.druid.cInverse,
    coefficients.druid.k,
    coefficients.warPalDK.cInverse,
    coefficients.warPalDK.k,
  ]);

  return (
    <RootLayout>
      <form name="stats" id="stats">
        <div className="m-auto grid md:grid-cols-6 md: grid-rows-6 place-items-center h-screen">
          <div className="md:col-span-6">
            dodge diminishing returns calculator
          </div>
          <div className="md:col-span-6 flex items-center">
            <div className="w-1/2 place-items-center grid place-items-center">
              <h2 className="text-2xl font-bold">class</h2>
              <select
                className="w-1/2 text-black"
                name="playerClass"
                id="playerClass"
                onChange={(e) => setPlayerClass(e.target.value)}
              >
                <option>warrior</option>
                <option>paladin</option>
                <option>death knight</option>
                <option>druid</option>
              </select>
            </div>
            <div className="md:col-start-4 md:col-span-2 w-1/2 grid place-items-center">
              <h2 className="text-2xl font-bold">bonus dodge</h2>
              <div className="flex justify-center">
                <input
                  className="w-1/4 text-black"
                  type="text"
                  name="dodgeChance"
                  id="dodgeChance"
                  onChange={(e) => setUndiminishedAmount(e.target.value)}
                ></input>
                <p>%</p>
              </div>
              <Image
                className="p-2"
                src="/images/bonusdodge.png"
                width={500}
                height={500}
                alt="bonus-dodge"
              />
            </div>
            <div className="md:col-start-4 md:col-span-2 w-1/2 grid place-items-center">
              <h2 className="text-2xl font-bold">total dodge</h2>
              <div className="flex justify-center">
                <input
                  className="w-1/4 text-black"
                  type="text"
                  name="dodgeChance"
                  id="dodgeChance"
                  onChange={(e) => setTotalAmount(e.target.value)}
                ></input>
                <p>%</p>
              </div>
              <Image
                className="p-2"
                src="/images/totaldodge.png"
                width={500}
                height={500}
                alt="total-dodge"
              />
            </div>
          </div>
          <div></div>

          {playerClass && undiminishedAmount ? (
            <h2 className="text-center text-2xl font-bold md:col-span-6">
              your diminished bonus dodge is: {diminishedAmount}% <br />
              your dodge is diminished at a rate of{" "}
              {((diminishedAmount / undiminishedAmount) * 100).toFixed(2)}%{" "}
              <br />
              your effective dodge rate is{" "}
              {totalAmount - (undiminishedAmount - diminishedAmount)}%
            </h2>
          ) : (
            {}
          )}
        </div>
      </form>
    </RootLayout>
  );
}
