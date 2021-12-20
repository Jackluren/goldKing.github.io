import React, { FC, lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import useEagerConnect from '@/hooks/useEagerConnect'

import Loading from './Loading'

const Home = lazy(async () => await import('./web/Home'))

const Mobile = lazy(async () => await import('./mobile'))

const NotFound = lazy(async () => await import('./NotFound'))

const App: FC = () => {
  useEagerConnect()

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          {/* PC端 */}
          <Route path="/" exact>
            <Home />
          </Route>
          {/* 移动端 */}
          <Route path='/m'>
            <Mobile />
          </Route>
          {/* 404 */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Suspense>
  )
}

export default App
