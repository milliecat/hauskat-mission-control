import { useReducer, useEffect, useCallback } from 'react';
import { loadState, saveState, initializeStorage } from '../utils/storage';

/**
 * Action types for mission control state
 */
const ActionTypes = {
  SET_ACTIVE_SECTION: 'SET_ACTIVE_SECTION',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  TOGGLE_ITEM_COMPLETION: 'TOGGLE_ITEM_COMPLETION',
  SET_ACTIVE_PHASE: 'SET_ACTIVE_PHASE',
  BULK_COMPLETE_ITEMS: 'BULK_COMPLETE_ITEMS',
};

/**
 * Initial state factory
 */
function createInitialState() {
  const completedItemsArray = loadState('completedItems', []);

  return {
    activeSection: loadState('activeSection', 'overview'),
    sidebarOpen: loadState('sidebarOpen', true),
    searchTerm: '',
    completedItems: new Set(completedItemsArray),
    activePhase: loadState('activePhase', 'planning'),
  };
}

/**
 * Reducer for mission control state
 */
function missionControlReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.payload,
      };

    case ActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };

    case ActionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };

    case ActionTypes.TOGGLE_ITEM_COMPLETION: {
      const newSet = new Set(state.completedItems);
      if (newSet.has(action.payload)) {
        newSet.delete(action.payload);
      } else {
        newSet.add(action.payload);
      }
      return {
        ...state,
        completedItems: newSet,
      };
    }

    case ActionTypes.SET_ACTIVE_PHASE:
      return {
        ...state,
        activePhase: action.payload,
      };

    case ActionTypes.BULK_COMPLETE_ITEMS:
      return {
        ...state,
        completedItems: new Set([...state.completedItems, ...action.payload]),
      };

    default:
      return state;
  }
}

/**
 * Custom hook for mission control state management
 */
export function useMissionControl() {
  const [state, dispatch] = useReducer(missionControlReducer, null, createInitialState);

  // Initialize storage on mount
  useEffect(() => {
    initializeStorage();
  }, []);

  // Persist activeSection
  useEffect(() => {
    saveState('activeSection', state.activeSection);
  }, [state.activeSection]);

  // Persist sidebarOpen
  useEffect(() => {
    saveState('sidebarOpen', state.sidebarOpen);
  }, [state.sidebarOpen]);

  // Persist completedItems
  useEffect(() => {
    saveState('completedItems', Array.from(state.completedItems));
  }, [state.completedItems]);

  // Persist activePhase
  useEffect(() => {
    saveState('activePhase', state.activePhase);
  }, [state.activePhase]);

  // Actions
  const setActiveSection = useCallback((section) => {
    dispatch({ type: ActionTypes.SET_ACTIVE_SECTION, payload: section });
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: ActionTypes.TOGGLE_SIDEBAR });
  }, []);

  const setSearchTerm = useCallback((term) => {
    dispatch({ type: ActionTypes.SET_SEARCH_TERM, payload: term });
  }, []);

  const toggleComplete = useCallback((itemId) => {
    dispatch({ type: ActionTypes.TOGGLE_ITEM_COMPLETION, payload: itemId });
  }, []);

  const setActivePhase = useCallback((phase) => {
    dispatch({ type: ActionTypes.SET_ACTIVE_PHASE, payload: phase });
  }, []);

  const bulkCompleteItems = useCallback((itemIds) => {
    dispatch({ type: ActionTypes.BULK_COMPLETE_ITEMS, payload: itemIds });
  }, []);

  const calculateCompletion = useCallback(
    (items) => {
      if (!items || items.length === 0) return 0;
      const completed = items.filter((item) => state.completedItems.has(item.id)).length;
      return Math.round((completed / items.length) * 100);
    },
    [state.completedItems]
  );

  return {
    state,
    actions: {
      setActiveSection,
      toggleSidebar,
      setSearchTerm,
      toggleComplete,
      setActivePhase,
      bulkCompleteItems,
    },
    utils: {
      calculateCompletion,
    },
  };
}
