import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import FriendsTableItemComponent from './friends-table-item.component';

const FriendsTableComponent = ({ friends }) => {
  return (
    <Table bordered responsive>
      {!friends.length ? (
        <div className="my-4 d-flex flex-column align-center">
          <span className="text-center w-100">Empty</span>
        </div>
      ) : (
        friends.map((item) => <FriendsTableItemComponent friend={item} />)
      )}
    </Table>
  );
};

FriendsTableComponent.propTypes = {
  friends: PropTypes.object,
};

export default FriendsTableComponent;
