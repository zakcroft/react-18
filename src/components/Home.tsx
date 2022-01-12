import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { increment, decrement } from "../store/counterSlice";

export function Home() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  const incrementCounterCb = useCallback(
    () => dispatch(increment()),
    [dispatch]
  );
  const decrementCounterCb = useCallback(
    () => dispatch(decrement()),
    [dispatch]
  );

  return (
    <>
      <div className={"text-white-200 mb-8 text-white"}>
        Redux toolkit reducer count
      </div>
      <div className="px-5 py-2 m-6 text-white bg-indigo-500 rounded border-0 focus:outline-none hover:bg-indigo-600">
        {count}
      </div>
      <div className={"flex text-white mx-auto"}>
        <button
          className="px-5 py-2 m-6 text-white bg-indigo-500 rounded border-0 focus:outline-none hover:bg-indigo-600"
          type={"button"}
          onClick={incrementCounterCb}
        >
          Increment
        </button>
        <button
          className=" px-5 py-2 m-6 text-white bg-indigo-500 rounded border-0 focus:outline-none hover:bg-indigo-600"
          type={"button"}
          onClick={decrementCounterCb}
        >
          Decrement
        </button>
      </div>
    </>
  );
}
