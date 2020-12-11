import "./Sign_In.css";
import { db, auth } from "./firebase";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import pf from "./pf_circle.png";


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin, setOpenSignin] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const SignUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return db.collection("posts").doc(cred.user.uid).set({
          table: 4,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const Login = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignin(false);
  };

  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src={pf} alt="" height="70" width="70" />
              <br></br>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br></br>
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <Button type="submit" onClick={SignUp}>
                Signup
              </Button>
            </center>
          </form>
        </div>
      </Modal>
      

      {user ? (
        user.email === "a@g.com" ? (
          <Redirect to="/admin" />
        ) : (
          <Redirect to="/Home_Page" />
        )
      ) : (
        <div className="Signin">
          <div className="Signin__Container1">
          <img  className="Container1__Image"src={"./ordee2.png"} alt=""  />
          <Button className="Container1_button"onClick={() => setOpen(true)}>SignUp</Button>
          </div>
          <div className="Signin__Container2">
          <form>
                  <h5>Email:</h5>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"/>
                  <h5>Password:</h5>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                  <button type="submit" onClick={Login}  className="login__signInBtn">sign in</button>
                  <p> </p>
        
              </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

/*<h1>heyy</h1>
<Button onClick={() => setOpen(true)}>SignUp</Button>
<Button onClick={() => setOpenSignin(true)}>Login</Button>*/
