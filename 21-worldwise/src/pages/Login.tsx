import { useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import PageNav from '../components/PageNav.tsx'
import Button from '../components/Button.tsx'
import {useAuth} from '../contexts/FakeAuthContext.tsx'
import styles from "./Login.module.css";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const  navigate = useNavigate()

  const { login, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) navigate('/app', {replace: true})
  }, [isAuthenticated, navigate])

  function handleSubmit(e) {
    e.preventDefault()

    if(email && password) login(email, password)
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
