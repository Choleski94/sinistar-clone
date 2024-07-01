export interface IAction {
	type: string;
	payload?: any;
}

export interface IState {
	[key: string]: any;
}

export interface IStore {
	actions: any;
	state: IState;
	dispatch: React.Dispatch<IAction>;
}

export interface IActionTypes {
	[key: string]: string;
}

export type TReducer = (state: IState, action: IAction) => IState;

/**
 * ActionTypes object containing various action type constants used throughout the application.
 * @type {IActionTypes}
 */
export const ActionTypes: IActionTypes = {
	LOCALE_SET: 'LOCALE_SET',
};

export default ActionTypes;
