import { rest } from 'msw';
import { setupServer } from 'msq/node';

const { render, screen, waitForElementToBeRemoved } = require('@testing-library/react');
import Home from './Home';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img1.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home/>', () => {
  // dentro do describe eu vou ter os teste do componente que é o componente home e pode trocar para outros components.
  it('should render search, posts, and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    await waitForElementToBeRemoved(noMorePosts);
    screen.debug();
  });
});

// Vamos usar "Home.spec.jsx" para teste unitarios ou seja teste de componentes unicos.
