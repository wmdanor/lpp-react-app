import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Nav, NavItem, NavLink } from 'reactstrap';
import FriendsTableComponent from '../../components/friends/friends-table.component';

/*
 * mode: "FRIENDS" - find friends, "SENT_REQUEST"
 * */
const getFriends = async (mode, query) => {
  return [
    {
      id: 1,
      username: 'username_1',
    },
    {
      id: 2,
      username: 'username_2',
    },
    {
      id: 3,
      username: 'username_3',
    },
    {
      id: 4,
      username: 'username_4',
    },
    {
      id: 5,
      username: 'username_5',
    },
    {
      id: 6,
      username: 'username_6',
    },
  ];
};

const Friends = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [friends, setFriends] = useState([]);
  const [loadingError, setLoadingError] = useState('');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const getFriendsHandler = (mode) => {
    getFriends()
      .then((data) => setFriends(data))
      .catch((err) => setLoadingError(err.message));
  };

  useEffect(() => {
    getFriends()
      .then((data) => setFriends(data))
      .catch((err) => setLoadingError(err.message));
  }, []);

  return (
    <div className="container py-4 px-5 shadow">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
              getFriendsHandler('FRIENDS');
            }}
          >
            Friends
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
              getFriendsHandler('SENT');
            }}
          >
            Sent requests
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
              getFriendsHandler('RECEIVED');
            }}
          >
            Received requests
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              getFriendsHandler('SEARCH');
              toggle('4');
            }}
          >
            Search
          </NavLink>
        </NavItem>
      </Nav>
      {loadingError ? (
        <div className="my-4 d-flex flex-column align-center">
          <span className="text-center text-danger w-100">
            Error occurred while loading title: &quot;{loadingError}&quot;
          </span>
        </div>
      ) : (
        <FriendsTableComponent friends={friends} />
      )}
    </div>
  );
};

export default Friends;
