import { useState } from 'react'
import { Link } from 'react-router-dom'
import useInput from '../hooks/useInput'
import useDialog from '../hooks/useDialog'
import useSignUp from '../hooks/useSignUp'
import './signup-dialog.css'

export default function SignUpDialog() {
  const [email, inputEmail] = useInput('email', 'email')
  const [password, inputPassword] = useInput('password', 'password')
  const [confirmPass, inputConfirmPass] = useInput('password', 'confirm password')
  const [name, inputName] = useInput('text', 'full name')
  const [birthday, inputBirthday] = useInput('date')

  const [signUpRef, showSignUp, closeSignUp] = useDialog()
  const [error, setError] = useState(null)

  function validateInputs() {
    if (!email || !name || !password || !confirmPass) {
      setError('Placeholder error message.')
    } else if (password != confirmPass) {
      setError("Password inputs don't match.")
    } else {
      setError(null)
      useSignUp(email, password, name, setError)
      if (!error) {
        closeNameSetUp()
        showLogIn()
        setError("Sign up successful")
      }
    }
  }

  return (
    <>
      <a onClick={showSignUp}>Sign Up</a>
      <dialog className='' ref={signUpRef}>
        <div className='signup-dialog box-shadow'>
          <h1>Seedmart Sign Up</h1>
          <div className="error-message">{error}</div>
          {inputEmail}
          {inputName}
          {inputPassword}
          {inputConfirmPass}
          <div className='captcha'>
            Captcha Placeholder
          </div>
          <p>
            By signing up, you agree with Seedmart's
            <br />
            <a>Terms of Services</a> and <a>Privacy Policy</a>.
          </p>
          <button onClick={validateInputs}>Sign up</button>
          <section className='login-link'><Link to=''>Back to Log in</Link></section>
        </div>
      </dialog>
    </>
  )
}