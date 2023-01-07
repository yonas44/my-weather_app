import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import App from '../App';
import store from '../feature/configureStore';

describe('Page navigates', () => {
  test('It renders in the screen', async () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>,
    );

    waitFor(() => {
      fireEvent.click(screen.getByText(/Africa/));
    });
    expect(screen.getByTestId('africa')).toBeInTheDocument();
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
