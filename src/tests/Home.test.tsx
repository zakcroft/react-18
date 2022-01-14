import { render, screen, userEvent } from "./testing-utils";
import { Home } from "../components";

describe("Counter", () => {
  test("Increments", () => {
    render(<Home />);
    userEvent.click(screen.getByText("Increment"));
    expect(screen.getByText(1)).toBeInTheDocument();
    userEvent.click(screen.getByText("Increment"));
    expect(screen.getByText(2)).toBeInTheDocument();
  });
  test("Decrements", () => {
    const initState = {
      counter: {
        value: 3,
      },
    };
    render(<Home />, initState);
    userEvent.click(screen.getByText("Decrement"));
    expect(screen.getByText(2)).toBeInTheDocument();
    userEvent.click(screen.getByText("Decrement"));
    expect(screen.getByText(1)).toBeInTheDocument();
  });
});
