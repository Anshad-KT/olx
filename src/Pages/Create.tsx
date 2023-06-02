import React, { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';

const CreatePage: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <Create/>
    </Fragment>
  );
};

export default CreatePage;
