// CollectionsView.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TitleBox from '../components/TitleBox';
import CollectionCard from '../components/cards/CollectionCard';
import getCollections from '../helpers/data/collectionData';

const CollectionsView = ({
  user
}) => {
  const [collectionArray, setCollectionArray] = useState([]);

  useEffect(() => {
    let mounted = true;
    console.warn(user.uid);
    getCollections(user.uid).then((respArr) => {
      if (mounted) {
        setCollectionArray(respArr);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div className='collections-view'>
      <TitleBox heading1='Collections' />
      <div className='collection-cards-container'>
        { collectionArray.map((response) => <CollectionCard
          key={response.id}
          collection={response} />) }
      </div>
    </div>
  );
};

CollectionsView.propTypes = {
  user: PropTypes.any
};

export default CollectionsView;
