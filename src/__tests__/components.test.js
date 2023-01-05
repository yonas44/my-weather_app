import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AllCountries from '../components/AllCountries';
import Header from '../components/header';
import store from '../feature/configureStore';
import DetailPage from '../components/DetailPage';
import Country from '../components/country';

describe('AllCountries-component renders', () => {
  test('It renders in the screen', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AllCountries />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByAltText(/loading/)).toBeInTheDocument();
  });

  test('It matchs the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <AllCountries />
          </BrowserRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('Header-component renders', () => {
  test('It renders in the screen', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/All countries/)).toBeInTheDocument();
  });

  test('It matchs the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('DetailPage-component renders', () => {
  test('It renders in the screen', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Capital/)).toBeInTheDocument();
  });

  test('It matchs the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <DetailPage />
          </BrowserRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('SingleCountry-component renders', () => {
  test('It renders in the screen', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Country />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Size/)).toBeInTheDocument();
  });

  test('It matchs the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Country />
          </BrowserRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
