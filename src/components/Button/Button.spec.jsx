import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";
import userEvent from "@testing-library/user-event";

describe("<Button/>", () => {
  it("should render the button with the text", () => {
    // dentro da aspas é descrição do meu teste
    render(<Button text="Load more" />); // aqui eu renderizo meu componente para teste

    expect.assertions(1); // Nesse caso eu falo que vai ter certa quantidade de erros para o teste.

    const button = screen.getByRole("button", { name: /load more/i }); // Estou criando uma const para receber o meu elemento na tela junto com o texto

    // expect(button).toHaveAttribute('class', 'button') // Aqui meu teste ver se no meu button eu tenho a class com o nome.
    expect(button).toBeInTheDocument(); // Espero que meu elemento estaja na tela se não teste falha.
  });

  it("should call function on button click", () => {
    render(<Button text="Load more" />);
    const fn = jest.fn(); // cria um mocker meio que substituir função existente com uma versão simulada
    const button = screen.getByRole("button", { name: /load more/i });

    userEvent.click(button); // faz a mesma coisa de baixo
    // fireEvent.click(button)  aqui eu crio um evento para disparar um click no button

    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("should be disable when disable is true", () => {
    render(<Button text="Load more" disabled={true} />);

    const button = screen.getByRole("button", { name: /load more/i });

    expect(button).toBeDisabled();
  });

  it("should be disable when disable is false", () => {
    render(<Button text="Load more" disabled={false} />);

    const button = screen.getByRole("button", { name: /load more/i });

    expect(button).toBeEnabled();
  });

  it("should button snpshot teste", () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Load more" disabled={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
