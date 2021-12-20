import React, { FC, lazy } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import C from '@/components'

const Home = lazy(async () => await import('./Home'))

const NotFound = lazy(async () => await import('../NotFound'))

const App: FC = () => {
  const { path } = useRouteMatch()
  return (
    <C.MobileLayout>
      <Switch>
        <Route path={`${path}`} exact>
          <Home />
        </Route>
        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </C.MobileLayout>
  )
}

export default App
