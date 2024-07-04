import types from './../types';

interface IClaimObject {
	review_score: null;
	city: string | null;
	name: string | null;
	images: string[] | [];
	address: string | null;
	latitude: string | null;
	longitude: string | null;
	id: number | string | null;
	description: string | null;
	host_response_rate: number | null;
	extension_flexibility: number | null;
}

/**
 * Action creator for setting claim.
 * @param {Object} claimObj - Object containing lang and country properties.
 * @param {string} claimObj.lang - The language code.
 * @param {string} claimObj.country - The country code.
 * @returns {Object} Action object for setting claim.
 */
const claimSet = (claimObj: IClaimObject) => ({
	type: types.CLAIM_SET,
	...claimObj
});

/**
 * Action creator that calls claimSet to set claim.
 * @param {Object} claimObj - Object containing lang and country properties.
 * @returns {Object} Action object for setting claim.
 */
const setClaim = (claimObj: IClaimObject) => claimSet(claimObj);

export default {
	setClaim,
};
