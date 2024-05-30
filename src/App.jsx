import { useEffect } from "react";
import './style/main.scss';
import Router from './Router.jsx';
import { auth } from "./utils/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useAppContext } from './context/app';

function App() {
    const { setAuthed } = useAppContext();

    useEffect(() => {
		//see if a user is already signed in
		onAuthStateChanged(auth, (user) => {
			if (user) {
                console.log("user", user);
                setAuthed(true);
			}
		});

    }, []);

	return (
        <>
            <Router />
        </>
    )
}

export default App;