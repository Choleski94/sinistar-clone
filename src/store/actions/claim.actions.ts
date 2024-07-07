import types from './../types';

import { IListingItem } from '@mocks/types';

export interface IClaimObject {
	review_score?: null;
	city?: string | null;
	name?: string | null;
	images?: string[] | [];
	address?: string | null;
	latitude?: number | null;
	longitude?: number | null;
	id?: number | string | null;
	description?: string | null;
	host_response_rate?: number | null;
	extension_flexibility?: number | null;
}

/**
 * Action creator for setting claim.
 * @param {Object} claimObj - Object containing lang and country properties.
 * @param {string} claimObj.lang - The language code.
 * @param {string} claimObj.country - The country code.
 * @returns {Object} Action object for setting claim.
 */
const claimSet = (claimObj: IListingItem) => ({
	type: types.CLAIM_SET,
	...claimObj
});

/**
 * Action creator that calls claimSet to set claim.
 * @param {Object} claimObj - Object containing lang and country properties.
 * @returns {Object} Action object for setting claim.
 */
const setClaim = (claimObj: IListingItem) => claimSet(claimObj);

export default {
	setClaim,
};
