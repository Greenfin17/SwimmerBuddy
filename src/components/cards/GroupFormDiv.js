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
  formSetArr,
  setFormSetArr,
  removeGroup,
  triggerGroup,
  deletedSets,
  setDeletedSets
}) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const tmpGroupArr = [];
      getGroups(workoutId).then((groupArr) => {
        let i = 0;
        let tmpGroupObj = {};
        // add SetArr for each set group
        groupArr.forEach((group) => {
          tmpGroupObj = { ...group };
          tmpGroupObj.setArr = [];
          tmpGroupArr.push(tmpGroupObj);
          i += 1;
          if (i === groupArr.length) {
            setLocalGroupArr(tmpGroupArr);
          }
        });
      });
    }
    return function cleanup() {
      mounted = false;
      return mounted;
    };
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
          formSetArr={formSetArr}
          setFormSetArr={setFormSetArr}
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
  formSetArr: PropTypes.array,
  setFormSetArr: PropTypes.func,
  removeGroup: PropTypes.func,
  triggerGroup: PropTypes.bool,
  deletedSets: PropTypes.array,
  setDeletedSets: PropTypes.func
};

export default GroupFormDiv;
