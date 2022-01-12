import React, { ErrorInfo, useTransition } from "react";
import sleep from "sleep-promise";

// LOOK FOR "START HERE" on line #62

export function StartTransition() {
  console.log("StartTransition");
  return (
    <div className={"text-white"}>
      <h1 className="mb-4 text-2xl font-medium sm:text-3xl title-font text-white-900">
        StartTransition()
      </h1>
      <h1 className="mb-4 text-2xl font-medium sm:text-3xl title-font text-white-900">
        Pokedex memory game
      </h1>
      <p>
        Test your Poke-memory by guessing which Pokemon is next — before it
        appears.
      </p>
      <ErrorBoundary>
        <React.Suspense fallback="loading pokemon…">
          <PokemonDetail />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

function suspensify(promise: Promise<any>) {
  let status = "pending";
  let result: any;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

let initialPokemon = suspensify(fetchPokemon(1));

function PokemonDetail() {
  let [pokemonResource, setPokemonResource] = React.useState(initialPokemon);
  let pokemon = pokemonResource.read();
  const [isPending, startTransition] = useTransition();

  const getPokamon = (id: number) => suspensify(fetchPokemon(id));

  const setPokamon = (resource: any) =>
    startTransition(() => setPokemonResource(resource));

  return (
    <article
      className={`text-white ${isPending ? "opacity-50" : "opacity-100"}`}
    >
      <h1 className="m-4 text-2xl font-medium text-white bg-indigo-600 sm:text-3xl title-font">
        {pokemon.name}
      </h1>
      <button
        className="flex px-5 py-2 mx-auto mt-6 text-white bg-indigo-500 rounded border-0 focus:outline-none hover:bg-indigo-600"
        type="button"
        onClick={() =>
          // START HERE
          setPokamon(getPokamon(pokemon.id + 1))
        }
      >
        {isPending ? "Searching" : "Next"}
      </button>
    </article>
  );
}

function fetchPokemon(id = 1) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then(sleep(500));
}

interface State {
  hasError: boolean;
}
interface Props {
  children: JSX.Element | JSX.Element[];
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
