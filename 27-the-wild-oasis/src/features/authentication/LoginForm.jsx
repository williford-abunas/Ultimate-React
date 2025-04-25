import { useState } from 'react'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import FormRow from '../../ui/FormRow'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogin } from './useLogin'

function LoginForm() {
  const [email, setEmail] = useState('99mysterium99@gmail.com')
  const [password, setPassword] = useState('plmoknij123')
  const { login, isLoading } = useLogin()

  function handleSubmit(e) {
    e.preventDefault()

    if (!email || !password) return

    login({ email, password })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? 'Log In' : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  )
}

export default LoginForm
