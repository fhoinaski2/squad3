import AllRoutes from "./Routes/Routes"
import { AuthProvider } from "./contexts/AuthContext"




function App() {


  return (
    <>
      <AuthProvider>
        <AllRoutes />
      </AuthProvider>
    </>
  )
}

export default App
