import { render, screen } from "./testing-utils";
import userEvent from "@testing-library/user-event";
import { StartTransition } from "../components";
import { server } from "./testServer";

describe("StartTransition", () => {
  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  test("Shows text on load", async () => {
    render(<StartTransition />);

    expect(screen.getByText("loading pokemon…")).toBeInTheDocument();
    await screen.findByText("Next");
  });
  test("Search and shows next", async () => {
    render(<StartTransition />);

    await screen.findByText("Next");
    userEvent.click(screen.getByText("Next"));
    await screen.findByText("Searching");
    await screen.findByText("Next pokemon 2");
  });
});
