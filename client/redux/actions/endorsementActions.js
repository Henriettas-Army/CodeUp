import axios from 'axios';

// Action types
export const POSTING_ENDORSEMENT = 'POSTING_ENDORSEMENT';
export const POSTED_ENDORSEMENT = 'POSTED_ENDORSEMENT';
export const FAILED_POSTING_ENDORSEMENT = 'FAILED_POSTING_ENDORSEMENT';
export const GETTING_ENDORSEMENTS = 'GETTING_ENDORSEMENTS';
export const GOT_ENDORSEMENTS = 'GOT_ENDORSEMENTS';
export const FAILED_GETTING_ENDORSEMENTS = 'FAILED_GETTING_ENDORSEMENTS';

// Action Creators
export const postingEndorsement = end => ({ type: POSTING_ENDORSEMENT, end });
export const postedEndorsement = end => ({ type: POSTED_ENDORSEMENT, end });
export const failedPostingEndorsement = end => ({ type: FAILED_POSTING_ENDORSEMENT, end });

export const gettingEndorsements = () => ({ type: GETTING_ENDORSEMENTS });
export const gotEndorsement = ends => ({ type: GOT_ENDORSEMENTS, ends });
export const failedGettingEndorsement = err => ({ type: GETTING_ENDORSEMENTS, err });

// Thunks
export const postEndorsement = endorsement => (dispatch) => {
  dispatch(postingEndorsement);
  return axios.post('/api/endorsement', endorsement)
  .then((res) => {
    const end = res.data['Sent endorsement'];
    dispatch(postedEndorsement(end));
  })
  .catch((e) => {
    dispatch(failedPostingEndorsement(e));
  });
};
