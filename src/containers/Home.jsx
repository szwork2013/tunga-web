import React from 'react';
import {Link} from 'react-router';
import connect from '../utils/connectors/NotificationConnector';
import Clock from '../components/Clock';

import { getUser, isAdmin, isProjectManager } from '../utils/auth';

class Home extends React.Component {
    componentDidMount() {
        if (this.props.Auth.isAuthenticated) {
            this.props.NotificationActions.getNotifications();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.Auth.isAuthenticated != this.props.Auth.isAuthenticated) {
            this.props.NotificationActions.getNotifications();
        }
    }

    getGreetingTime() {
        var greeting = null; //return g

        const currentTime = new Date();
        let currentHour = currentTime.getHours();

        let start_afternoon = 12;
        let start_evening = 17;

        if (currentHour >= start_afternoon && currentHour < start_evening) {
            greeting = "afternoon";
        } else if (currentHour >= start_evening) {
            greeting = "evening";
        } else {
            greeting = "morning";
        }

        return greeting;
    }

    render() {
        const {Notification} = this.props;
        return (
            <div className="home-page">
                <div className="bg-wrapper">
                    <img src={require("../images/home/image-5.jpg")}/>
                </div>

                <div className="content">
                    <div className="card">
                        <p className="title">
                            Hello {getUser().first_name || getUser().display_name}!
                        </p>
                        <Clock/>
                    </div>

                    <div className={`notification-list ${isAdmin() || isProjectManager()?'large':''}`}>
                        <ul>
                            <li>
                                <Link to="/profile">
                                <span className="icon">
                                    <i className="tunga-icon-profile"/>
                                    {Notification.notifications.profile &&
                                    Notification.notifications.profile.missing &&
                                    Notification.notifications.profile.missing.length?(
                                        <span className="badge">{Notification.notifications.profile.missing.length}</span>
                                    ):null}
                                </span><br/>
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/people/filter/requests">
                                <span className="icon">
                                    <i className="tunga-icon-tribe"/>
                                    {Notification.notifications.requests?(
                                        <span className="badge">{Notification.notifications.requests}</span>
                                    ):null}
                                </span><br/>
                                    Tribe
                                </Link>
                            </li>
                            <li>
                                <Link to="/conversation">
                                <span className="icon">
                                    <i className="tunga-icon-message"/>
                                    {Notification.notifications.messages?(
                                        <span className="badge">{Notification.notifications.messages}</span>
                                    ):null}
                                </span><br/>
                                    Messages
                                </Link>
                            </li>
                            <li>
                                <Link to="/work/filter/running">
                                <span className="icon">
                                    <i className="tunga-icon-running-tasks"/>
                                    {Notification.notifications.tasks?(
                                        <span className="badge">{Notification.notifications.tasks}</span>
                                    ):null}
                                </span><br/>
                                    Running tasks
                                </Link>
                            </li>
                            {isAdmin() || isProjectManager()?(
                                [
                                    <li>
                                        <Link to="/work/filter/estimates">
                                            <span className="icon">
                                                <i className="tunga-icon-project"/>
                                                {Notification.notifications.estimates?(
                                                    <span className="badge">{Notification.notifications.estimates}</span>
                                                ):null}
                                            </span><br/>
                                            Estimates
                                        </Link>
                                    </li>,
                                    <li>
                                        <Link to="/work/filter/quotes">
                                            <span className="icon">
                                                <i className="tunga-icon-project"/>
                                                {Notification.notifications.quotes?(
                                                    <span className="badge">{Notification.notifications.quotes}</span>
                                                ):null}
                                            </span><br/>
                                            Quotes
                                        </Link>
                                    </li>
                                ]
                            ):null}
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(Home);
