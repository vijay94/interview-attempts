import React from 'react'
import ReactDOM from 'react-dom/client'

import UserList from './userList.jsx'

import './style.scss'
import UserProvider from './providers/user.provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <UserList />
    </UserProvider>
  </React.StrictMode>,
)
