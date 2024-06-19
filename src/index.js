import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { CategoryProvider } from './components/CategoryContext';
import { SingleHotelProvider } from './components/SingleHotelContext';
import { SearchProvider } from './components/SearchContext';
import { BrowserRouter } from 'react-router-dom';
import { OutsideProvider } from './components/OutsideContext';
import { WhereoptionsProvider } from './components/WhereoptionsContext';
import { FiltersProvider } from './components/filters/FiltersContext';
import { UserDataProvider } from './components/UserDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserDataProvider>
    <CategoryProvider>
      <SearchProvider>
    <SingleHotelProvider>
      <OutsideProvider>
        <WhereoptionsProvider>
          <FiltersProvider>
          <App />
          </FiltersProvider>
          </WhereoptionsProvider>
          </OutsideProvider>
          </SingleHotelProvider>
          </SearchProvider>
    </CategoryProvider>
    </UserDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);

