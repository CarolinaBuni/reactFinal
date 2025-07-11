import { useCallback, useReducer } from "react";

export const MODAL_ACTIONS = {
     OPEN_AUTH: 'OPEN_AUTH',
     OPEN_PROFILE: 'OPEN_PROFILE',
     OPEN_HISTORY: 'OPEN_HISTORY',
     OPEN_REVIEW: 'OPEN_REVIEW',
     CLOSE_ALL: 'CLOSE_ALL'
};

// Estado inicial
const initialState = {
     showAuthModal: false,
     showProfileModal: false,
     showEventHistory: false,
     showReviewModal: false,
     selectedEvent: null,
     selectedReview: null
};

const modalReducer = ( state, action ) => {
     switch ( action.type ) {
          case MODAL_ACTIONS.OPEN_AUTH:
               return {
                    ...initialState,
                    showAuthModal: true
               };
          case MODAL_ACTIONS.OPEN_PROFILE:
               return {
                    ...initialState,
                    showProfileModal: true
               };
          case MODAL_ACTIONS.OPEN_HISTORY:
               return {
                    ...initialState,
                    showEventHistory: true
               };

          case MODAL_ACTIONS.OPEN_REVIEW:
               return {
                    ...initialState,
                    showReviewModal: true,
                    selectedEvent: action.payload.event,
                    selectedReview: action.payload.review
               };

          case MODAL_ACTIONS.CLOSE_ALL:
               return initialState;

          default:
               return state;
     }
};

export const useModalReducer = () => {
     const [ state, dispatch ] = useReducer( modalReducer, initialState );

     // Action creators memoizados
     const actions = {
          openAuth: useCallback( () => {
               dispatch( { type: MODAL_ACTIONS.OPEN_AUTH } );
          }, [] ),

          openProfile: useCallback( () => {
               dispatch( { type: MODAL_ACTIONS.OPEN_PROFILE } );
          }, [] ),

          openHistory: useCallback( () => {
               dispatch( { type: MODAL_ACTIONS.OPEN_HISTORY } );
          }, [] ),

          openReview: useCallback( ( event, existingReview = null ) => {
               dispatch( {
                    type: MODAL_ACTIONS.OPEN_REVIEW,
                    payload: { event, review: existingReview }
               } );
          }, [] ),

          closeAll: useCallback( () => {
               dispatch( { type: MODAL_ACTIONS.CLOSE_ALL } );
          }, [] )
     };

     return {
          state,
          actions
     };
};