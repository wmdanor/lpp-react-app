import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import loggedUserProp from '../../prop-types/loggedUser';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getFriendshipStatus = async (loggedUserId, checkedUserId) => {
  const a = getRandomInt(1, 4);

  switch (a) {
    case 1:
      return 'NONE';
    case 2:
      return 'FRIENDS';
    case 3:
      return 'SENT_REQUEST';
    default:
      return 'RECEIVED_REQUEST';
  }
};

const setFriendship = async (loggedUserId, checkedUserId, status) => status;

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser.user,
  };
}

const FriendsTableItemComponent = ({ friend, loggedUser }) => {
  const [friendshipStatus, setFriendshipStatus] = useState('');

  const handler = (status) => () => {
    setFriendship(loggedUser?.id, friend.id, status)
      .then((data) => setFriendshipStatus(data))
      .catch(() => setFriendshipStatus(''));
  };

  const renderButtons = () => {
    switch (friendshipStatus) {
      case 'FRIENDS':
        return (
          <>
            <Button onClick={handler('NONE')} color="danger">
              Remove friend
            </Button>
          </>
        );
      case 'SENT_REQUEST':
        return (
          <>
            <Button onClick={handler('NONE')} color="danger">
              Cancel request
            </Button>
          </>
        );
      case 'RECEIVED_REQUEST':
        return (
          <>
            <Button
              className="me-2"
              onClick={handler('FRIENDS')}
              color="success"
            >
              Accept
            </Button>
            <Button onClick={handler('NONE')} color="danger">
              Reject
            </Button>
          </>
        );
      case 'NONE':
        return (
          <>
            <Button onClick={handler('SENT_REQUEST')} color="primary">
              Add friend
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    getFriendshipStatus(loggedUser?.id, friend.id)
      .then((status) => setFriendshipStatus(status))
      .catch(() => setFriendshipStatus(''));
  }, []);

  return (
    <tr>
      <td className="p-2">{friend.username}</td>
      <td className="p-2 text-end">{renderButtons()}</td>
    </tr>
  );
};

FriendsTableItemComponent.propTypes = {
  loggedUser: loggedUserProp,
  friend: PropTypes.object,
};

export default connect(mapStateToProps)(FriendsTableItemComponent);
