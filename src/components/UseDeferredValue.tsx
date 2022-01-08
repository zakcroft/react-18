import { useState, useDeferredValue } from "react";

export function UseDeferredValue() {
  const [search_text, setSearchText] = useState("");
  const deferredValue = useDeferredValue(search_text);

  const isStale = deferredValue !== search_text;

  const count = 20000;
  return (
    <main>
      <label>
        <div className={"text-fuchsia-200 mb-8 text-white"}>Type Something</div>
        <input
          className={"block mx-auto p-2"}
          type={"text"}
          value={search_text}
          onChange={({ currentTarget }) => setSearchText(currentTarget.value)}
        />
        <span className={"text-white"}>Count {count}</span>
        <div
          className={`flex flex-wrap  text-white mt-4 mx-40 font-thin ${
            isStale ? "opacity-50" : "opacity-100"
          }`}
        >
          {[...Array(count)].map((e, i) => (
            <p className={"p-2"} key={i}>
              {deferredValue}
            </p>
          ))}
        </div>
      </label>
    </main>
  );
}
