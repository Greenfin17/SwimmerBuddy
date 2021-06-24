// search

const searchWorkouts = (workout, searchVal) => {
  const lowerCaseSearchTerms = searchVal.toLowerCase();
  let returnVal = workout.description.toLowerCase().includes(lowerCaseSearchTerms);
  returnVal = returnVal || workout.title.toLowerCase().includes(lowerCaseSearchTerms);

  if (lowerCaseSearchTerms.includes('Longcourse'.toLowerCase())) {
    if (workout.longcourse === 'true') {
      returnVal = true;
    } else returnVal = returnVal || false;
  }
  if (lowerCaseSearchTerms.includes('Shortcourse'.toLowerCase())) {
    if (workout.longcourse === 'false') {
      returnVal = true;
    } else returnVal = returnVal || false;
  }
  if (lowerCaseSearchTerms.includes('Meter'.toLowerCase())) {
    if (workout.meters === 'true') {
      returnVal = true;
    } else returnVal = returnVal || false;
  }
  if (lowerCaseSearchTerms.includes('Yard'.toLowerCase())) {
    if (workout.meters === 'false') {
      returnVal = true;
    } else returnVal = returnVal || false;
  }
  return returnVal;
};

export default searchWorkouts;
