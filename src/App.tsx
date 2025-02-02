import {BrowserRouter as Router, Route,Routes, BrowserRouter} from 'react-router-dom';
import IndexPage from './Layouts/IndexPage';
import BookingPage from './Layouts/BookingPage';
import MenuPage from './Layouts/MenuPage';
import CheckoutPage from './Layouts/CheckoutPage';
import SignInPage from './Layouts/SingInPage';
import SignUpPage from './Layouts/SignUpPage';
import VerificationPage from './Layouts/VerificationPage';
import HomePage from './Layouts/HomePage';
import MovieDetailPage from './Layouts/MovieDetailPage';
import PaymentPage from './Layouts/Payment';
import PaymentFailedPage from './Layouts/PaymentFailedPage';
import TicketSuccessPage from './Layouts/TicketSuccessPage';
import PaymentSuccessPage from './Layouts/PaymentSuccessPage';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        }
      });
    }
  }, []);
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route 
              path='/index' 
              element={<IndexPage />}>  
            </Route>
            <Route 
              path='/sign_in'
              element = {<SignInPage/>}>
            </Route>
            <Route 
              path='/sign_up'
              element = {<SignUpPage/>}>
            </Route>
            <Route 
              path='/verification'
              element = {<VerificationPage/>}>
            </Route>
            <Route 
              path='/home'
              element = {<HomePage/>}>
            </Route>
            <Route 
              path='/ticket_details/:id' 
              element = {<BookingPage />}>
            </Route>
            <Route 
              path='/movie/:id'
              element = {<MovieDetailPage />}>
            </Route>
            <Route 
              path='/buffet_page'
              element = {<MenuPage/>}>
            </Route>
            <Route 
              path='/buy_ticket/:id'
              element = {<CheckoutPage/>}>
            </Route>
            <Route 
              path='/payment'
              element = {<PaymentPage/>}>
            </Route>
            <Route 
              path='/payment_failed'
              element = {<PaymentFailedPage/>}>
            </Route>
            <Route 
              path='/payment_success'
              element = {<PaymentSuccessPage/>}>
            </Route>
            <Route 
              path='/success'
              element = {<TicketSuccessPage/>}>
            </Route>
          </Routes>
          <button id="install-btn">Install App</button>
       </BrowserRouter>
    </div>
  );
}

export default App;
