import React from 'react';

import { IState, TReducer, IAction } from '../types';

/**
 * Returns the current time formatted as HH:mm:ss.SSS.
 * @returns {string} Formatted current time.
 */
const getCurrentTimeFormatted = (): string => {
	const currentTime = new Date();
	const hours = currentTime.getHours();
	const minutes = currentTime.getMinutes();
	const seconds = currentTime.getSeconds();
	const milliseconds = currentTime.getMilliseconds();
	return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

/**
 * Enhances a reducer function with logging capabilities.
 * @param {Types.Reducer} reducer - The original reducer function.
 * @returns {Types.Reducer} A new reducer function with logging.
 */
const useLogger = (reducer: TReducer): TReducer => {
	const reducerWithLogger = React.useCallback((state: IState, action: IAction) => {
		const next = reducer(state, action);
		console.group(
			`%cAction: %c${action.type} %cat ${getCurrentTimeFormatted()}`,
			"color: lightgreen; font-weight: bold;",
			"color: white; font-weight: bold;",
			"color: lightblue; font-weight: lighter;"
		);
		console.log(
			"%cPrevious State:",
			"color: #9E9E9E; font-weight: 700;",
			state
		);
		console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
		console.log("%cNext State:", "color: #47B04B; font-weight: 700;", next);
		console.groupEnd();
		return next;
	}, [ reducer ]);

	return reducerWithLogger;
};

export default useLogger;
