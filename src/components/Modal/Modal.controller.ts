import { TModalSizeKey } from './types';

export const DEFAULT_MODAL_SIZES: { [key in TModalSizeKey]: number } = {
	sm: 300,
	md: 500,
	lg: 800,
	xl: 1100,
};

export const MOBILE_MODAL_SIZES: { [key in TModalSizeKey]: number }  = {
	sm: 250,
	md: 400,
	lg: 700,
	xl: 1000,
};

export const getResponsiveSize = (size: TModalSizeKey, isMobile: boolean) => (
	isMobile ? MOBILE_MODAL_SIZES[size] : DEFAULT_MODAL_SIZES[size]
);

