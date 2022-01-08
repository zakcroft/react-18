import { useState } from "react";
import { flushSync } from "react-dom";

export default function Batching() {
  const [count, updateCount] = useState(1);
  const [isOdd, updateIsOdd] = useState(true);
  const [anotherChange, updateAnotherChange] = useState(true);

  const handler = () => {
    setTimeout(() => {
      updateCount((count) => count + 1);
      updateIsOdd((oddness) => !oddness);
      flushSync(() => updateAnotherChange((oddness) => !oddness));
    }, 0);
  };

  console.count("Render");

  return (
    <>
      <div className={"text-white-200 mb-8 text-white"}>
        Open Console to see rerender logs
      </div>
      <div className={"text-white"}>
        <button
          className="flex px-5 py-2 mx-auto my-6 text-white bg-indigo-500 rounded border-0 focus:outline-none hover:bg-indigo-600"
          type={"button"}
          onClick={handler}
        >
          {count} {isOdd.toString()}
          <div className={"text-white my-4"}>{anotherChange}</div>
        </button>
      </div>
    </>
  );
}
