import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import ErrorHandlerComponent from './components/ErrorHandler/ErrorHandler.component';
import React, { Suspense } from 'react';
import store from './redux-flow';
function App() {
  return (
    <BrowserRouter>
      <ErrorHandlerComponent>
        <Provider store={store}>
          <Suspense fallback='loading'>
            <div className='bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200'>
              <AppRouter />
            </div>
          </Suspense>
        </Provider>
      </ErrorHandlerComponent>
    </BrowserRouter>
  );
}

export default App;
