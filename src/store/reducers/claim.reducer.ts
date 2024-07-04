import types from '../types';
import states from '../states';

interface IClaimAction {
	type: string;
	geometry: any;
	place_id: string;
	formatted_address: string;
}

/**
 * Reducer function for managing the claim state.
 * @param state - Current state of the claim.
 * @param action - Action object describing the change to apply to the state.
 * @returns New state after applying the action.
 */
export default function claim (
	state = states.claim,
	action: IClaimAction = {}
) {
	switch (action.type) {
		case types.CLAIM_SET:
			return {
				...state,
				id: action?.id,
				city: action?.city,
				name: action?.name,
				images: action?.images,
				address: action?.address,
				latitude: action?.latitude,
				longitude: action?.longitude,
				description: action?.description,
				review_score: action?.review_score,
				host_response_rate: action?.host_response_rate,
				extension_flexibility: action?.extension_flexibility,
			};
		break;
		default:
			return state;
		break;
	}
}
