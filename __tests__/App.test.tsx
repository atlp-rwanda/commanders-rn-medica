import { render } from "@testing-library/react-native";
import App from "../app/index";

describe("Render <App />", () => {
  test('should render the App component', () => {
    const { getByText } = render(<App />);
    expect(getByText("Wellcome to medica app")).toBeTruthy();
  });
});
