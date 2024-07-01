import React from 'react';

import * as Types from './types';
import { useLogger } from './hooks';

import actions from './actions';
import reducers from './reducers';

let store: Types.IStore | undefined;

/**
 * Context for holding the application state.
 */
export const StateCTX = React.createContext<Types.IState | undefined>(undefined);

/**
 * Context for dispatching actions to update the state.
 */
export const DispatchCTX = React.createContext<React.Dispatch<Types.IAction> | undefined>(undefined);

/**
 * Hook to access the global store's actions, state, and dispatch function.
 * @returns An object containing actions, state, and dispatch function.
 */
export const useStore = () => ({
	actions,
	state: React.useContext(StateCTX)!,
	dispatch: React.useContext(DispatchCTX)!
});

/**
 * Combines multiple reducers into a single reducer function.
 * @param slices An object containing individual reducers.
 * @returns A combined reducer function.
 */
const combineReducers = (slices: { [key: string]: Types.TReducer }) => 
	(state: Types.IState, action: Types.IAction) => 
		Object.keys(slices).reduce((acc, prop) => ({
			...acc, [prop]: slices[prop](acc[prop], action)
		}), state);
/**
 * Creates a store by initializing state using provided reducers and initial state.
 * @param slices An object containing initializer functions for each slice of state.
 * @param initialState The initial state of the store.
 * @returns An object representing the initialized store.
 */
const createStore = (slices: { [key: string]: () => Types.IState}, initialState: Types.IState = {}) => ({
	...Object.keys(slices).reduce((acc, prop) => ({
		...acc, 
		// TODO: Consider removing deconstruction.
		...{
			[prop]: slices[prop]() || {} 
		}
	}), null),
	...initialState
});

/**
 * Root reducer function created by combining all application reducers.
 */
export const rootReducer = combineReducers(reducers);

/**
 * Initializes the global store instance.
 * @param initialState The initial state of the store.
 * @returns The initialized store instance.
 */
export const initStore = (initialState: Types.IState) => createStore(reducers, initialState);

/**
 * Initializes the global store with optional preloaded state.
 * @param preloadedState Optional preloaded state to initialize the store.
 * @returns The initialized store instance.
 */
export const initializeStore = (preloadedState?: Types.IState) => {
	let _store = store ?? initStore(preloadedState);
	// Reinitialiaze store. Merge that state with the
	// current state in the store and create a new one.
	if (preloadedState && store) {
		_store = initStore({
			...store,
			...preloadedState
		});
		// Reset the current store.
		store = undefined;
	}
	// Create the store
	if (!store) store = _store;
	return _store;
};

/**
 * Props for the StoreProvider component.
 */
type StoreProviderProps = {
	initialState: Types.IState;
	children: React.ReactNode;
};

/**
 * Provider component that wraps the entire application with the global store.
 */
export const StoreProvider: React.FC<StoreProviderProps> = ({ initialState, children }) => {
	const reducers = useLogger(rootReducer);

	const [ state, dispatch ] = React.useReducer(reducers, initializeStore(initialState));

	return (
		<DispatchCTX.Provider value={dispatch}>
			<StateCTX.Provider value={state}>
				{children}
			</StateCTX.Provider>
		</DispatchCTX.Provider>
	);
};

/**
 * Higher-order function that enhances a component with the StoreProvider.
 * @param Component The component to be enhanced.
 * @param initialState The initial state for the store.
 * @returns A component wrapped with StoreProvider.
 */
const withStoreProvider = (Component: React.ComponentType<any>, initialState: Types.IState = {}) => {
	const WithStoreProvider: React.FC<any> = (props) => (
		<StoreProvider initialState={initialState}>
			<Component {...props} />
		</StoreProvider>
	);

	WithStoreProvider.defaultName = 'WithStoreProvider';

	return WithStoreProvider
}

export default withStoreProvider;
