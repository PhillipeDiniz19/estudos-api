/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react"
import { PostCard } from "."
import { postCardPropsMock } from "./mock"

const props = postCardPropsMock

describe("<PostCard/>", () => { // Passar sempre o nome do componente
    it("sholder render postcard correctly", () => {
        render(<PostCard {...props} />)

        expect(screen.getByRole("img", {name: props.title})).toHaveAttribute('src', 'img/img.png');
        expect(screen.getByRole("heading", {name: 'title 1'})).toBeInTheDocument();
        expect(screen.getByText('body 1')).toBeInTheDocument()


      // debug()  metado debug meio que da um console.log no meu componente mostrando div, title etc.
    })

    it("sholder match snapshot", () => {
        const { container } = render(<PostCard {...props} />)
        // eslint-disable-next-line testing-library/no-node-access
        expect(container.firstChild).toMatchSnapshot()

    });
})