import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Header } from 'components/Header'
import { Loading } from 'components/Loading'
import { Popups } from 'components/Popups'
import { PageLanding } from 'pages/landing'
import { PageGameRooms } from 'pages/game-rooms'
import { PageNotFound } from 'pages/not-found'
import { PagePlayground } from 'pages/playground'
import { PageViewCards } from 'pages/view-cards'

import GameContextProvider, { useGameContext } from 'contexts/GameContext.js'
import ModalContextProvider from 'contexts/ModalContext.js'
import PlayContextProvider from 'contexts/PlayContext.js'
import 'App.scss'

const PrivateRoute = ({ component: Component, ...options }) => {
  const { isLoggedIn } = useGameContext()

  switch (isLoggedIn) {
    case true:
      return <Component {...options} />
    case false:
      return <Redirect to='/' />
    default:
      return <Loading />
  }
}

const App = () => {
  return (
    <GameContextProvider>
      <ModalContextProvider>
        <PlayContextProvider>
          <BrowserRouter>
            <div id='app'>
              <div className='header-bg' />
              <div className='main'>
                <Header />
                <Loading />
                <Popups />
                <Switch>
                  <Route exact path='/' component={PageLanding} />
                  <PrivateRoute exact path='/rooms' component={PageGameRooms} />
                  <PrivateRoute exact path='/rooms/:slug' component={PagePlayground} />
                  <PrivateRoute exact path='/view-cards' component={PageViewCards} />
                  <Route component={PageNotFound} />
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </PlayContextProvider>
      </ModalContextProvider>
    </GameContextProvider>
  )
}

export default App
