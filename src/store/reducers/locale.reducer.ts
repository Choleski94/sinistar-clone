import types from '../types';
import states from '../states';

interface ILocaleAction {
	type: string;
	lang?: string;
	country?: string;
}

/**
 * Reducer function for managing the locale state.
 * @param state - Current state of the locale.
 * @param action - Action object describing the change to apply to the state.
 * @returns New state after applying the action.
 */
export default function locale (
	state = states.locale,
	action: ILocaleAction = {}
) {
	switch (action.type) {
		case types.LOCALE_SET:
			return {
			...state,
			lang: action.lang,
			country: action.country,
		};
		break;
		default:
			return state;
		break;
	}
}
