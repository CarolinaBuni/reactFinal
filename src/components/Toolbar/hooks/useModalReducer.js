import { useCallback, useReducer, useMemo } from "react";

export const MODAL_ACTIONS = {
     OPEN_AUTH: 'OPEN_AUTH',
     OPEN_PROFILE: 'OPEN_PROFILE',
     OPEN_HISTORY: 'OPEN_HISTORY',
     OPEN_REVIEW: 'OPEN_REVIEW',
     CLOSE_ALL: 'CLOSE_ALL',
     CLOSE_REVIEW: 'CLOSE_REVIEW'
};

// Estado inicial
const initialState = {
     showAuthModal: false,
     showProfileModal: false,
     showEventHistory: false,
     showReviewModal: false,
     selectedEvent: null,
     selectedReview: null,
     onReviewSuccess: null
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
                    ...state,
                    showReviewModal: true,
                    selectedEvent: action.payload.event,
                    selectedReview: action.payload.review,
                    onReviewSuccess: action.payload.onSuccess 
               };

          case MODAL_ACTIONS.CLOSE_ALL:
               return initialState;

          case MODAL_ACTIONS.CLOSE_REVIEW:
               return {
                    ...state,
                    showReviewModal: false,
                    selectedEvent: null,
                    selectedReview: null
               };

          default:
               return state;
     }
};


export const useModalReducer = () => {
     const [ state, dispatch ] = useReducer( modalReducer, initialState );


     const openAuth = useCallback( () => {
          dispatch( { type: MODAL_ACTIONS.OPEN_AUTH } );
     }, [] );

     const openProfile = useCallback( () => {
          dispatch( { type: MODAL_ACTIONS.OPEN_PROFILE } );
     }, [] );

     const openHistory = useCallback( () => {
          dispatch( { type: MODAL_ACTIONS.OPEN_HISTORY } );
     }, [] );

     const openReview = useCallback( ( event, existingReview = null, onSuccess = null ) => {
          dispatch( {
               type: MODAL_ACTIONS.OPEN_REVIEW,
               payload: { event, review: existingReview, onSuccess }
          } );
     }, [] );

     const closeAll = useCallback( () => {
          dispatch( { type: MODAL_ACTIONS.CLOSE_ALL } );
     }, [] );

     const closeReview = useCallback( () => {  
          dispatch( { type: MODAL_ACTIONS.CLOSE_REVIEW } );
     }, [] );

     const actions = useMemo( () => ( {
          openAuth,
          openProfile,
          openHistory,
          openReview,
          closeAll,
          closeReview
     } ), [ openAuth, openProfile, openHistory, openReview, closeAll, closeReview ] );

     return {
          state,
          actions
     };
};