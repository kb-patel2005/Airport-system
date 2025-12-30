import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './assets/store.js'
import Home from './assets/Components/Home/Home.jsx'
import About from './assets/Components/About/About.jsx'
import Flights from './assets/Components/Flight/Flights.jsx'
import SighIn from './assets/Components/SignIn/SighIn.jsx'
import SignUp from './assets/Components/SignUp/SignUp.jsx'
import FlightAdd from './assets/Components/FlightAdd/FlightAdd.jsx'
import PassengerFlight from './assets/Components/PassengerFlight/PassengerFlight.jsx'
import FlightSeats from './assets/Components/FlightSeats/FlightSeats.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/flights', element: <Flights /> },
      { path: '/Signin', element: <SighIn /> },
      { path: '/Signup', element: <SignUp /> },
      { path: '/AddFlight', element: <FlightAdd /> },
      { path: '/passengerFlight', element: <PassengerFlight /> },
      { path: '/flightSeats', element: <FlightSeats /> }
    ],
  }
]);

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);

