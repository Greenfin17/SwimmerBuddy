// GroupFormDiv.js
// Displays groups and sets in the workout form

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import GroupFormCard from './GroupFormCard';
import SetGroupForm from '../forms/SetGroupForm';
import { getGroups } from '../../helpers/data/groupData';

const GroupFormDiv = ({
  workoutId,
  localGroupArr,
  setLocalGroupArr,
  removeGroup,
  triggerGroup,
  deletedSets,
  setDeletedSets
}) => {
  useEffect(() => {
    getGroups(workoutId).then((groupArr) => {
      console.warn('group-form-div');
      setLocalGroupArr(groupArr);
    });
  }, []);

  return (
    <div className='form-group-listing'>
      <div className='form-listing-wrapper'>
      { localGroupArr.map((group, key) => <SetGroupForm
          key={key}
          index={key}
          groupId={group.id}
          localGroupArr={localGroupArr}
          setLocalGroupArr={setLocalGroupArr}
          workoutId={workoutId}
          removeGroup={removeGroup}
          triggerGroup={triggerGroup}
          deletedSets={deletedSets}
          setDeletedSets={setDeletedSets}
        />)}
      </div>
    </div>
  );
};

GroupFormDiv.propTypes = {
  workoutId: PropTypes.string,
  localGroupArr: PropTypes.array,
  setLocalGroupArr: PropTypes.func,
  removeGroup: PropTypes.func,
  triggerGroup: PropTypes.bool,
  deletedSets: PropTypes.array,
  setDeletedSets: PropTypes.func
};

export default GroupFormDiv;
