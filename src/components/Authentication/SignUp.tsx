import React from 'react';
import styles from "./Authentication.module.scss";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { switchSign, setRegistredUser, registerNewUser } from '../../redux/slices/setAuthentication';
//firebase
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//icons
import { MdKeyboardArrowLeft } from "../../assets/icons";
import { BsFillCloudUploadFill } from "../../assets/icons";
//mock avatar
import MockAvatar from "../../assets/images/Empty-Avatar.jpg";

const SignUp: React.FC = () => {
  //first register phase
  const [username, setUsername] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = React.useState<string>("");
  //second register phase
  const [avatar, setAvatar] = React.useState<any>(); // setting up the user Avatar is optional
  const [avatarUrl, setAvatarUrl] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  
  //label error fields
  const [usernameFieldError, setUsernameFieldError] = React.useState<string>("");
  const [surnameFieldError, setSurnameFieldError] = React.useState<string>("");
  const [emailFieldError, setEmailFieldError] = React.useState<string>("");
  const [phoneNumberFieldError, setPhoneNumberFieldError] = React.useState<string>("");
  const [passwordFieldError, setPasswordFieldError] = React.useState<string>("");
  const [confirmedPasswordFieldError, setConfirmedPasswordFieldError] = React.useState<string>("");

  //animation
  const [secondSignUpPhase, setSecondSignUpPhase] = React.useState<boolean>(false);
  const [animationCondition, setAnimationCondition] = React.useState<boolean>(false);

  const users = useSelector((state: RootState) => state.authentication.users);
  const dispatch = useDispatch<AppDispatch>();

  /*
    https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#example_using_object_urls_to_display_images
    URL.createObjectURL()
  */

  React.useEffect(() => {
    avatar && setAvatarUrl(URL.createObjectURL(avatar[0]));
  }, [avatar]);

  React.useEffect(() => {
    if(secondSignUpPhase) {
      setUsernameFieldError("");
      setSurnameFieldError("");
      setPasswordFieldError("");
      setConfirmedPasswordFieldError("");
    }
  }, [secondSignUpPhase])

  const firstPhaseVerify = () => {
    if(username && surname && password && confirmedPassword) {
      if(username.trim().length > 2) {
        if(surname.trim().length > 2) {
          if(password.trim().length > 6) {
            if(confirmedPassword === password) {
              setAnimationCondition(true);
              setTimeout(() => {
                setSecondSignUpPhase(true);
              }, 200);
            } else {
              setConfirmedPasswordFieldError("Password's don't match");
            }
          } else {
            setPasswordFieldError("Password must contain more than 6 symbols");
          }
        } else {
          setSurnameFieldError("Surname must be at least 3 characters");
        }
      } else {
        setUsernameFieldError("Username must be at least 3 characters");
      }
    } else {
      !username && setUsernameFieldError("Please enter your Username");
      !surname && setSurnameFieldError("Please enter your Surname");
      !password && setPasswordFieldError("Please enter Password");
      !confirmedPassword && setConfirmedPasswordFieldError("Please confirm Password");
    }
  }

  const secondPhaseVerify = () => {
    if(email && phoneNumber) {
      if(phoneNumber.toString().length === 11) {
        const auth = getAuth();
        const newUser = {
          id: users.length + 1,
          name: username,
          surname: surname, 
          email: email,
          phoneNumber: phoneNumber,
          avatar: avatar ? avatarUrl : "https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png", // adding sstock photo by default
          link: "@" + username,
          lastActivity: Date.now(),
          channels: [{id: 13, muted: false}], // adding guest channel for newbies,
          contacts: [],
          calls: [],
        }
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            alert("Profile created successfully!");
            dispatch(setRegistredUser(newUser));
            setTimeout(() => {
              dispatch(registerNewUser(newUser));
              dispatch(switchSign({id: 0}));
            }, 1000)
          })
          .catch((error) => {
            error.code === "auth/invalid-email" && setEmailFieldError("This Email is invalid")
            error.code === "auth/email-already-in-use" && setEmailFieldError("This Email is already connected to another Account")
          });
      } else {
        setPhoneNumberFieldError("Phone Number must contain 11 Digits");
      }
    } else {
      !email && setEmailFieldError("Please enter your Email");
      !phoneNumber && setPhoneNumberFieldError("Please enter your Phone Number");
    }
  }

  const handleSignUp = () => {
    firstPhaseVerify();
    secondSignUpPhase && secondPhaseVerify();
  }

  const switchFields= () => {
    if(secondSignUpPhase && setAnimationCondition) {
      setAnimationCondition(false);
      setTimeout(() => {
        setSecondSignUpPhase(false);
      }, 200);
    } else {
      setTimeout(() => {
        dispatch(switchSign({id: 0}));
      }, 100);
    }
  }

  const firstPhase = () => {
    return <div style={{
      display: secondSignUpPhase ? "none" : "block",
      transform: animationCondition ? "translate(-250px)" : "", 
      opacity: animationCondition ? "0" : "1", 
    }}>
      <div className={styles.username}>
        <span>Type your Username</span>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
        />
        <label className={styles.warningLabel} htmlFor="">{usernameFieldError}</label>
      </div>
      <div className={styles.surname}>
        <span>Type your Surname</span>
        <input 
          type="text" 
          placeholder="Surname" 
          value={surname} 
          onChange={e => setSurname(e.target.value)} 
        />
        <label className={styles.warningLabel} htmlFor="">{surnameFieldError}</label>
      </div>
      <div className={styles.password}>
        <span>Set Password</span>
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <label className={styles.warningLabel} htmlFor="">{passwordFieldError}</label>
      </div>
      <div className={styles.password}>
        <span>Confirm Password</span>
        <input 
          type="password" 
          placeholder="Password" 
          value={confirmedPassword} 
          onChange={e => setConfirmedPassword(e.target.value)} 
        />
        <label className={styles.warningLabel} htmlFor="">{confirmedPasswordFieldError}</label>
      </div>
    </div>
  }

  const secondPhase = () => {
    return <div style={{
      display: secondSignUpPhase ? "block" : "none",
      transform: animationCondition ? "" : "translate(250px)", 
      opacity: animationCondition ? "1" : "0", 
    }}>
      <div className={styles.avatar}>
        <div className={styles.image}>
          {avatarUrl ? <img src={avatarUrl} alt="avatar"/> : <img src={MockAvatar} alt="empty"/>}
        </div>
        <label htmlFor="file"><i><BsFillCloudUploadFill/></i>Upload your Avatar</label>
        <label className={styles.optionalLabel} style={{fontSize: "12px"}}>(optional)</label>
        <input 
          type="file" 
          accept="image/*" 
          id="file" 
          onChange={(e: any) => setAvatar([...e.target.files])} 
        />
      </div>
      <div className={styles.email}>
        <span>Type your Email Adress</span>
        <input 
          type="text" 
          placeholder="Email Adress" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <label className={styles.warningLabel} htmlFor="">{emailFieldError}</label>
      </div>
      <div className={styles.phoneNumber}>
        <span>Type your Phone Number</span>
        <input 
          type="number" 
          placeholder="Phone Number" 
          value={phoneNumber} 
          onChange={e => setPhoneNumber(e.target.value)} 
        />
        <label className={styles.warningLabel} htmlFor="">{phoneNumberFieldError}</label>
      </div>
    </div>
  }

  return (
    <div className={styles.signUp}>
      <div className={styles.header}>
        <h1>Telegram</h1>
        <span>Sign Up for Telegram</span>
      </div>
      <div className={styles.inputFields}>
        {firstPhase()} 
        {secondPhase()}
      </div>
      <div className={styles.logIn}>
        <span className={styles.backField} onClick={switchFields}>
          <i><MdKeyboardArrowLeft/></i>
          <p>{secondSignUpPhase ? "Back" : "Back to Sign In"}</p>
        </span>
        <button onClick={handleSignUp}>{secondSignUpPhase ? "Sign Up" :"Next"}</button>
      </div>
    </div>
  )
}

export default SignUp;