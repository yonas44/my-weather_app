/* eslint-disable no-restricted-globals */
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';
import store from '../feature/configureStore';

// Mock API calls
const handlers = [
  rest.get('https://restcountries.com/v3.1/all', (req, res, ctx) => res(
    ctx.json([
      {
        name: {
          common: 'Hello world!',
        },
        flags: {
          svg: '',
        },
        region: 'Africa',
        area: 222,
        timezones: ['UTC'],
      },
    ]),
  )),
  rest.get(
    'https://weatherapi-com.p.rapidapi.com/forecast.json',
    (req, res, ctx) => {
      const country = req.url.searchParams.get('q');
      return res(
        ctx.json(
          [
            {
              forecast: {
                forecastday: [
                  {
                    day: {
                      maxtemp_c: 0,
                      mintemp_c: 0,
                      hum: 0,
                      condition: {},
                    },
                  },
                ],
              },
            },
          ],
          {
            country,
          },
        ),
      );
    },
  ),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('Page navigates', () => {
  test('Component renders in the screen', async () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>,
    );

    // Check if AllCountries component renders when a continent is selected.

    fireEvent.click(screen.getByTestId('africa'));
    expect(await screen.findByText(/Size/i)).toBeInTheDocument();
    expect(location.pathname).toBe('/all-countries');

    // Check if DetailPage component renders when a country is selected.
    fireEvent.click(screen.getByText(/Hello/));
    expect(await screen.findByText(/Population/)).toBeInTheDocument();
  });

  test('It matchs the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
