import { render, screen, within, userEvent } from "./testing-utils";
import { App } from "../App";

test("renders all nav link", () => {
  render(<App />);

  const linktext = {
    "/": "Home",
    "/batching": "Batching",
    "/startTransition": "StartTransition",
    "/useDeferredValue": "UseDeferredValue",
    "/react-router": "React Router and RTK Query",
  };

  const links = screen.getAllByRole("link");

  expect(links.length).toBe(5);

  Object.entries(linktext).forEach(([href, name]) => {
    const link = screen.getByText(name).closest("a");
    const ls = within(link as HTMLAnchorElement);
    expect(ls.getByText(name)).toBeInTheDocument();
    expect(link).toHaveAttribute("href", href);
  });
});

test("renders Home on App page", () => {
  render(<App />);

  const homePage = screen
    .getByText("Redux toolkit reducer count")
    .closest("div");
  expect(homePage).toBeInTheDocument();
});

test.only("Navigates routes", () => {
  render(<App />);

  const leftClick = { button: 0 }; // default
  userEvent.click(screen.getByText(/Batching/i), leftClick);
  expect(
    screen.getByText(/Open Console to see rerender logs/i)
  ).toBeInTheDocument();

  userEvent.click(screen.getByText(/StartTransition/i));
  expect(screen.getByText(/Pokedex memory game/i)).toBeInTheDocument();

  // and on
});
