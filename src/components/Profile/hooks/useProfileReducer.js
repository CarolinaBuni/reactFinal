import { useReducer, useMemo } from 'react';

export const PROFILE_ACTIONS = {
     // UI ACTIONS
     SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
     SET_LOADING: 'SET_LOADING',
     SET_EDITING: 'SET_EDITING',

     // PROFILE ACTIONS
     SET_USER_DETAILS: 'SET_USER_DETAILS',
     SET_EDIT_FORM_DATA: 'SET_EDIT_FORM_DATA',
     UPDATE_EDIT_FIELD: 'UPDATE_EDIT_FIELD',
     SET_EDIT_ERROR: 'SET_EDIT_ERROR',
     SET_EDIT_SUCCESS: 'SET_EDIT_SUCCESS',
     SET_EDIT_LOADING: 'SET_EDIT_LOADING',
     RESET_EDIT_FORM: 'RESET_EDIT_FORM',

     // FAVORITES ACTIONS
     SET_CONFIRM_DELETE: 'SET_CONFIRM_DELETE',

     // REVIEW ACTIONS
     SET_EDITING_REVIEW: 'SET_EDITING_REVIEW',
     SET_REVIEW_COUNT: 'SET_REVIEW_COUNT',
     SET_CONFIRM_DELETE_REVIEW: 'SET_CONFIRM_DELETE_REVIEW',


     // DELETE ACCOUNT ACTIONS
     SET_SHOW_DELETE_CONFIRM: 'SET_SHOW_DELETE_CONFIRM',
     SET_DELETE_PHASE: 'SET_DELETE_PHASE',
     SET_DELETE_PROGRESS: 'SET_DELETE_PROGRESS',
     SET_DELETE_ERROR: 'SET_DELETE_ERROR',
     SET_DELETE_LOADING: 'SET_DELETE_LOADING',
     SET_MATRIX_CODE: 'SET_MATRIX_CODE',
     RESET_DELETE_STATE: 'RESET_DELETE_STATE',
};

export const initialState = {
     ui: {
          activeTab: 'info',
          loading: false,
          isEditing: false
     },
     profile: {
          userDetails: null,
          editFormData: {},
          editError: '',
          editSuccess: false,
          editLoading: false
     },
     favorites: {
          confirmDelete: null
     },
     reviews: {
          editingReview: null,
          reviewCount: 0,
          confirmDeleteReview: null
     },
     deleteAccount: {
          showDeleteConfirm: false,
          deletePhase: 0,
          deleteProgress: 0,
          deleteError: '',
          deleteLoading: false,
          matrixCode: ''
     }
};

export const profileReducer = ( state, action ) => {
     switch ( action.type ) {
          // ========== UI ACTIONS ==========
          case PROFILE_ACTIONS.SET_ACTIVE_TAB:
               return {
                    ...state,
                    ui: { ...state.ui, activeTab: action.payload }
               };

          case PROFILE_ACTIONS.SET_LOADING:
               return {
                    ...state,
                    ui: { ...state.ui, loading: action.payload }
               };

          case PROFILE_ACTIONS.SET_EDITING:
               return {
                    ...state,
                    ui: { ...state.ui, isEditing: action.payload }
               };

          // ========== PROFILE ACTIONS ==========
          case PROFILE_ACTIONS.SET_USER_DETAILS:
               return {
                    ...state,
                    profile: { ...state.profile, userDetails: action.payload }
               };

          case PROFILE_ACTIONS.SET_EDIT_FORM_DATA:
               return {
                    ...state,
                    profile: { ...state.profile, editFormData: action.payload }
               };

          case PROFILE_ACTIONS.UPDATE_EDIT_FIELD:
               return {
                    ...state,
                    profile: {
                         ...state.profile,
                         editFormData: {
                              ...state.profile.editFormData,
                              [ action.payload.name ]: action.payload.value
                         }
                    }
               };

          case PROFILE_ACTIONS.SET_EDIT_ERROR:
               return {
                    ...state,
                    profile: { ...state.profile, editError: action.payload }
               };

          case PROFILE_ACTIONS.SET_EDIT_SUCCESS:
               return {
                    ...state,
                    profile: { ...state.profile, editSuccess: action.payload }
               };

          case PROFILE_ACTIONS.SET_EDIT_LOADING:
               return {
                    ...state,
                    profile: { ...state.profile, editLoading: action.payload }
               };

          case PROFILE_ACTIONS.RESET_EDIT_FORM:
               return {
                    ...state,
                    profile: {
                         ...state.profile,
                         editFormData: {},
                         editError: '',
                         editSuccess: false,
                         editLoading: false
                    },
                    ui: { ...state.ui, isEditing: false }
               };

          // ========== FAVORITES ACTIONS ==========
          case PROFILE_ACTIONS.SET_CONFIRM_DELETE:
               return {
                    ...state,
                    favorites: { ...state.favorites, confirmDelete: action.payload }
               };

          // ========== REVIEW ACTIONS ==========
          case PROFILE_ACTIONS.SET_EDITING_REVIEW:
               return {
                    ...state,
                    reviews: { ...state.reviews, editingReview: action.payload }
               };

          case PROFILE_ACTIONS.SET_REVIEW_COUNT:
               return {
                    ...state,
                    reviews: { ...state.reviews, reviewCount: action.payload }
               };

          case PROFILE_ACTIONS.SET_CONFIRM_DELETE_REVIEW:
               return {
                    ...state,
                    reviews: { ...state.reviews, confirmDeleteReview: action.payload }
               };

          // ========== DELETE ACCOUNT ACTIONS ==========
          case PROFILE_ACTIONS.SET_SHOW_DELETE_CONFIRM:
               return {
                    ...state,
                    deleteAccount: { ...state.deleteAccount, showDeleteConfirm: action.payload }
               };

          case PROFILE_ACTIONS.SET_DELETE_PHASE:
               return {
                    ...state,
                    deleteAccount: { ...state.deleteAccount, deletePhase: action.payload }
               };

          case PROFILE_ACTIONS.SET_DELETE_PROGRESS:
               return {
                    ...state,
                    deleteAccount: { ...state.deleteAccount, deleteProgress: action.payload }
               };

          case PROFILE_ACTIONS.SET_DELETE_ERROR:
               return {
                    ...state,
                    deleteAccount: { ...state.deleteAccount, deleteError: action.payload }
               };

          case PROFILE_ACTIONS.SET_DELETE_LOADING:
               return {
                    ...state,
                    deleteAccount: { ...state.deleteAccount, deleteLoading: action.payload }
               };

          case PROFILE_ACTIONS.SET_MATRIX_CODE:
               return {
                    ...state,
                    deleteAccount: { ...state.deleteAccount, matrixCode: action.payload }
               };

          case PROFILE_ACTIONS.RESET_DELETE_STATE:
               return {
                    ...state,
                    deleteAccount: {
                         showDeleteConfirm: false,
                         deletePhase: 0,
                         deleteProgress: 0,
                         deleteError: '',
                         deleteLoading: false,
                         matrixCode: ''
                    }
               };

          default:
               return state;
     }
};

// Hook para combinar reducer + action 
export const useProfileReducer = () => {
     const [ state, dispatch ] = useReducer( profileReducer, initialState );

     const actions = useMemo(() => ({
          // ========== UI ACTIONS ==========
          setActiveTab: ( tab ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_ACTIVE_TAB, payload: tab } ),

          setLoading: ( loading ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_LOADING, payload: loading } ),

          setEditing: ( editing ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_EDITING, payload: editing } ),

          // ========== PROFILE ACTIONS ==========
          setUserDetails: ( details ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_USER_DETAILS, payload: details } ),

          setEditFormData: ( data ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_EDIT_FORM_DATA, payload: data } ),

          updateEditField: ( name, value ) =>
               dispatch( { type: PROFILE_ACTIONS.UPDATE_EDIT_FIELD, payload: { name, value } } ),

          setEditError: ( error ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_EDIT_ERROR, payload: error } ),

          setEditSuccess: ( success ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_EDIT_SUCCESS, payload: success } ),

          setEditLoading: ( loading ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_EDIT_LOADING, payload: loading } ),

          resetEditForm: () =>
               dispatch( { type: PROFILE_ACTIONS.RESET_EDIT_FORM } ),

          // ========== FAVORITES ACTIONS ==========
          setConfirmDelete: ( event ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_CONFIRM_DELETE, payload: event } ),

          // ========== REVIEW ACTIONS ==========
          setEditingReview: ( review ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_EDITING_REVIEW, payload: review } ),

          setReviewCount: ( count ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_REVIEW_COUNT, payload: count } ),

          setConfirmDeleteReview: ( review ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_CONFIRM_DELETE_REVIEW, payload: review } ),

          // ========== DELETE ACCOUNT ACTIONS ==========
          setShowDeleteConfirm: ( show ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_SHOW_DELETE_CONFIRM, payload: show } ),

          setDeletePhase: ( phase ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_DELETE_PHASE, payload: phase } ),

          setDeleteProgress: ( progress ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_DELETE_PROGRESS, payload: progress } ),

          setDeleteError: ( error ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_DELETE_ERROR, payload: error } ),

          setDeleteLoading: ( loading ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_DELETE_LOADING, payload: loading } ),

          setMatrixCode: ( code ) =>
               dispatch( { type: PROFILE_ACTIONS.SET_MATRIX_CODE, payload: code } ),

          resetDeleteState: () =>
               dispatch( { type: PROFILE_ACTIONS.RESET_DELETE_STATE } )
     }), [dispatch]); 

     return { state, actions, dispatch };
};