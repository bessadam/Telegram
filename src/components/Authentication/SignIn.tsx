import React from 'react';
import styles from "./Authentication.module.scss";
//redux
import { useDispatch } from "react-redux";
import { switchSign, completeSign } from "../../redux/slices/setAuthentication";
//firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const SignIn: React.FC = () => {
  //user input fields
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  //label error fields
  const [emailFieldError, setEmailFieldError] = React.useState<string>("");
  const [passwordFieldError, setPasswordFieldError] = React.useState<string>("");

  const usernameRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const switchToSignUp = () => {
    setTimeout(() => {
      dispatch(switchSign({id: 1}));
    }, 100)
  }

  const handleLogIn = () => {
    if(email && password) {
      const auth = getAuth();
  
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          localStorage.setItem("email", email);
          dispatch(completeSign({active: false}));
          document.location.reload();
        })
      .catch((error) => {
        error.code === "auth/invalid-email" && setEmailFieldError("Please enter valid Email Adress")
        error.code === "auth/wrong-password" && setPasswordFieldError("Please enter valid Password")
        error.code === "auth/too-many-requests" && alert("Too many server requests. Please try again a little later.")
      });
    } else {
      !email && setEmailFieldError("Please enter Email Adress")
      !password && setPasswordFieldError("Please enter Password")
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === "Enter") {
      handleLogIn()
    }
  } 

  React.useEffect(() => {
    if(usernameRef.current) usernameRef.current.focus();
  }, [])

  return (
    <div className={styles.signIn}>
      <div className={styles.header}>
        <h1>Telegram</h1>
        <span>The world's fastest messaging app</span>
      </div>
      <div className={styles.inputFields}>
        <div className={styles.username}>
          <span>Your Email Adress</span>
          <input 
            type="text" 
            placeholder="Email Adress" 
            ref={usernameRef} value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          <label className={styles.warningLabel} htmlFor="">{emailFieldError}</label>
        </div>
        <div className={styles.password}>
          <span>Your Password</span>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            onKeyDown={(e: any) => handleKeyDown(e)} 
          />
          <label className={styles.warningLabel} htmlFor="">{passwordFieldError}</label>
        </div>
      </div>
      <div className={styles.logIn} onClick={handleLogIn}>
        <span>Forgot Password?</span>
        <button>Log in</button>
      </div>
      <div className={styles.signUp}>
        <span>Don't have an Account yet?</span>
        <button onClick={switchToSignUp}>Sign up for telegram</button>
      </div>
    </div>
  )
}

export default SignIn;