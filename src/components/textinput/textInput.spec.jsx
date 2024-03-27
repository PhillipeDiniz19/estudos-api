import {
  getAllByPlaceholderText,
  render,
  screen,
} from "@testing-library/react";
import { TextInput } from ".";
import userEvent from "@testing-library/user-event";

describe("<TextInput/>", () => {
  it("sholder have a serchvalue", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} />);
    const input = screen.getByPlaceholderText(/Type your search/i);

    expect(input).toBeInTheDocument();
    expect(input.value).toBe("testando");
  });

  it("sholder call handlechanger function on each key press", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} />);
    const input = screen.getByPlaceholderText(/Type your search/i);

    const value = "O valor";

    // eslint-disable-next-line no-undef
    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it("sholder math snapshot", () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} />);
    expect(container).toMatchSnapshot();
  });
});
