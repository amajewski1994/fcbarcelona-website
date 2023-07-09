import React, { Suspense } from 'react';
import './styles/css/style.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
// import Store from './Components/Sections/Store/Store';
// import SingleItem from './Components/Sections/Store/SingleItem';
// import Contact from './Components/Sections/Contact';
// import Cart from './Components/Sections/Cart';

import CartContextProvider from './context/cart-context';
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import News from './Components/Sections/News/News';
// import SingleNews from './Components/Sections/News/SingleNews';
// import Home from './Components/Sections/Home';
// import Gallery from './Components/Sections/Gallery/Gallery';
// import Team from './Components/Sections/Team/Team';
// import SinglePlayer from './Components/Sections/Team/SinglePlayer';
// import Admin from './Components/Admin/Admin';
import LoadingSpinner from './shared/LoadingSpinner';

const Store = React.lazy(() => import('./Components/Sections/Store/Store'));
const SingleItem = React.lazy(() => import('./Components/Sections/Store/SingleItem'));
const Contact = React.lazy(() => import('./Components/Sections/Contact'));
const Cart = React.lazy(() => import('./Components/Sections/Cart'));
const News = React.lazy(() => import('./Components/Sections/News/News'));
const SingleNews = React.lazy(() => import('./Components/Sections/News/SingleNews'));
const Home = React.lazy(() => import('./Components/Sections/Home'));
const Gallery = React.lazy(() => import('./Components/Sections/Gallery/Gallery'));
const Team = React.lazy(() => import('./Components/Sections/Team/Team'));
const SinglePlayer = React.lazy(() => import('./Components/Sections/Team/SinglePlayer'));
const Admin = React.lazy(() => import('./Components/Admin/Admin'));

function App() {

  const { token, login, logout, userId, role, avatar, nickname } = useAuth();

  let routes
  routes = (
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/store" element={<Store />}>
      </Route>
      <Route path="/store/:iid" element={<SingleItem />}>
      </Route>
      <Route path="/store/:iid/cart" element={<Cart />}>
      </Route>

      <Route path="/news" element={<News />}>
      </Route>
      <Route path="/news/:nid" element={<SingleNews />}>
      </Route>

      <Route path="/admin" element={<Admin />}>
      </Route>

      <Route path="/contact" element={<Contact />}>
      </Route>

      <Route path="/gallery" element={<Gallery />}>
      </Route>

      <Route path="/team" element={<Team />}>
      </Route>
      <Route path="/team/:pid" element={<SinglePlayer />}>
      </Route>
    </Routes>
  );

  return (

    <div className="App">

      <Router basename="/fcbarcelona-website">
        <AuthContext.Provider
          value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            role: role,
            avatar: avatar,
            nickname: nickname,
            login: login,
            logout: logout
          }}
        >
          <CartContextProvider>
            <Header />
            <Suspense
            fallback={<div className='center fallback'><LoadingSpinner asOverlay={true} /></div>}
            >
            {routes}
            </Suspense>
            
            <Footer />
          </CartContextProvider>
        </AuthContext.Provider>
      </Router>
    </div>

  );
}

export default App;
