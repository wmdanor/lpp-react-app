import * as React from 'react';
import AppGridList from '../App/AppGridList';

const sortProps = [
  {
    property: 'id',
    text: 'Default',
  },
  {
    property: 'name',
    text: 'Name',
  },
  {
    property: 'price',
    text: 'Price',
  },
];

const searchProps = ['name'];

// const filterConfig = [
//   {
//     property: 'name',
//     filterType: 1,
//   },
// ];

function Main() {
  return (
    <div className="container">
      <AppGridList
        dataUrl="https://private-669abe-wmdanor.apiary-mock.com/products"
        sortProps={sortProps}
        searchProps={searchProps}
        pageSize={12}
      />
    </div>
  );
}

export default Main;
