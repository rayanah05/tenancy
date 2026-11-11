import { createContext, useContext, useState } from 'react'

// Holds the signed-in user and the current mode (landlord or tenant).
// One account can be both, so the mode is just a view switch.
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [mode, setMode] = useState('landlord')
  const [user] = useState({ name: 'Khalid Al-Mannai', first: 'Khalid', email: 'khalid@email.com', phone: '+973 3300 0000', roles: ['landlord', 'tenant'] })
  const [toast, setToast] = useState(null)
  const notify = (message) => {
    setToast(message)
    window.clearTimeout(notify.t)
    notify.t = window.setTimeout(() => setToast(null), 4000)
  }
  return (
    <AppContext.Provider value={{ mode, setMode, user, toast, notify, clearToast: () => setToast(null) }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
