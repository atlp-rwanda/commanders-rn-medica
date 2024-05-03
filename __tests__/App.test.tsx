import { render } from "@testing-library/react-native";
import App from "../app/index";

describe("Render <App />", () => {
  it("should render the App component", () => {
    const { getByText } = render(<App />);

    expect(getByText("Medica App")).toBeTruthy();
  });
});
