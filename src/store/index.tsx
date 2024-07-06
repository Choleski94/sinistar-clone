import React from 'react';

import { IStore, IState, IAction, TReducer } from './types';
import { useLogger } from './hooks';

import actions from './actions';
import reducers from './reducers';

/**
 * Props for the StoreProvider component.
 */
export type TStoreProviderProps = {
	initialState?: IState;
	children: React.ReactNode;
};


let store: IStore | undefined;

/**
 * Context for holding the application state.
 */
export const StateCTX = React.createContext<IState | undefined>(undefined);

/**
 * Context for dispatching actions to update the state.
 */
export const DispatchCTX = React.createContext<React.Dispatch<IAction> | undefined>(undefined);

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
const combineReducers = (slices: { [key: string]: TReducer }) => 
	(state: IState, action: IAction) => 
		Object.keys(slices).reduce((acc, prop) => ({
			...acc, [prop]: slices[prop](acc[prop], action)
		}), state);
/**
 * Creates a store by initializing state using provided reducers and initial state.
 * @param slices An object containing initializer functions for each slice of state.
 * @param initialState The initial state of the store.
 * @returns An object representing the initialized store.
 */
const createStore = (slices: { [key: string]: () => IState }, initialState: IState = {}) => ({
	...Object.keys(slices).reduce((acc, prop) => ({
	  ...acc, 
	  [prop]: slices[prop]() || {} 
	}), {} as { [key: string]: IState }),
	...initialState
  });
  

/**
 * Root reducer function created by combining all application reducers.
 */
export const rootReducer = combineReducers(reducers as { [key: string]: () => IState });

/**
 * Initializes the global store instance.
 * @param initialState The initial state of the store.
 * @returns The initialized store instance.
 */
export const initStore = (initialState: IState) => createStore(reducers, initialState);

/**
 * Initializes the global store with optional preloaded state.
 * @param preloadedState Optional preloaded state to initialize the store.
 * @returns The initialized store instance.
 */
export const initializeStore = (preloadedState: IState) => {
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
 * Provider component that wraps the entire application with the global store.
 */
export const StoreProvider: React.FC<TStoreProviderProps> = ({ initialState = {}, children }) => {
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
const withStoreProvider = (Component: React.ComponentType<any>, initialState: IState = {}) => {
	const WithStoreProvider: React.FC<any> = (props) => (
		<StoreProvider initialState={initialState}>
			{Component && <Component {...props} />}
		</StoreProvider>
	);

	return WithStoreProvider
}

withStoreProvider.defaultName = 'withStoreProvider';

export default withStoreProvider;
