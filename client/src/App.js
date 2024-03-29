import 'font-awesome/css/font-awesome.min.css';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import { FilterContextProvider } from './context/FilterContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from './pages/Main';
import DataPage from './pages/DataPage';
import HowToUse from './pages/HowToUse';
import withAuth from './hooks/withAuth'

function App() {
  const AuthDataPage = withAuth(DataPage);
  const AuthHowToUse = withAuth(HowToUse);

  return (
    <>
      <BrowserRouter>
        <ToastContainer position='top-right' />
        <Routes>
          <Route index element={<Main />} />
          <Route path='/page-three' element={<AuthHowToUse />} />
          <Route path='/data' element={
            <FilterContextProvider>
              <AuthDataPage />
            </FilterContextProvider>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
