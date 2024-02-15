import React, {useState, useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route, Link, useLocation, Navigate} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import {CssBaseline, StyledEngineProvider} from '@mui/material';

// routing
//import Routes from './routes';

// Temas
import themes from './themes'

import Login from "./views/authentication/login/index";
import Register from "./views/authentication/register/index";
import Home from "./views/Home";
import Profile from "./views/Profile";
import BoardUser from "./views/BoardUser";
import BoardModerator from "./views/BoardModerator";
import BoardAdmin from "./views/BoardAdmin";

import {logout} from "./actions/auth";
import {clearMessage} from "./actions/message";

// project imports
import NavigationScroll from './layout/layoutAdmin/NavigationScroll';

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import SamplePage from './views/sample-page';
import Route1 from './routes';
import ThemeRoutes from './routes/Admin/index';

const App = () => {
    const customization = useSelector((state) => state.customization);
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const {user: currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    let location = useLocation();

    useEffect(() => {
        if (["/login", "/register"].includes(location.pathname)) {
            dispatch(clearMessage()); // clear message when changing location
        }
    }, [dispatch, location]);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        } else {
            setShowModeratorBoard(false);
            setShowAdminBoard(false);
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);

    // Check if the user is not authenticated and trying to access protected routes
    if (!currentUser && !["/login", "/register"].includes(location.pathname)) {
        return <Navigate to="/login"/>;
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline/>
                <NavigationScroll>
                    {showModeratorBoard && (
                        <li className="nav-item"><Link to={"/home"} className="nav-link">Home</Link></li>
                    )}
                    {showModeratorBoard && (
                        <li className="nav-item"><Link to={"/mod"} className="nav-link">Moderator Board</Link></li>
                    )}
                    {showAdminBoard && <ThemeRoutes/>
                    }
                    {showAdminBoard && (
                        <li className="nav-item"><Link to={"/admin"} className="nav-link">Admin Board</Link></li>
                    )}
                    {currentUser && (
                        <li className="nav-item"><Link to={"/user"} className="nav-link">User</Link></li>
                    )}
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                        </div>
                    )}
                </NavigationScroll>
            </ThemeProvider>
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/user" element={<BoardUser/>}/>
                    <Route path="/mod" element={<BoardModerator/>}/>
                    <Route path="/admin" element={<BoardAdmin/>}/>
                    <Route path="/sample-page" element={<SamplePage/>}/>
                </Routes>
            </div>
            {/* <AuthVerify logOut={logOut}/> */}
        </StyledEngineProvider>
    );
};

export default App;
