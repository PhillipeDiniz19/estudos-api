import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from './Home';
import userEvent from '@testing-library/user-event';

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

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    // Mostrar se tem elementos na tela como search, posts e button
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title /i });
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /load more posts /i });
    expect(button).toBeInTheDocument();
  });

  it('should render posts', async () => {
    // verificar se tem o elemento posts na tela e title img
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(10);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Type your search/i);
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).toBeInTheDocument();

    userEvent.type(search, 'title 1');
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Search value: title1' })).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();

    userEvent.type(search, 'post does not exist');
    expect(screen.getByRole('Não existem posts =(')).toBeInTheDocument();
  });

  it('should button load more posts', async () => {
    // verificar se tem o elementor button no componente home
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts /i });

    userEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).not.toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
