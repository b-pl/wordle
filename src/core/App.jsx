import { useRoutes } from 'hookrouter'
import Routes from './Routes'

function App () {
  const routeResults = useRoutes(Routes)
  return routeResults
}

export default App
