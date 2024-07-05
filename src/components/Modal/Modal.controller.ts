export const DEFAULT_MODAL_SIZES: Record<string, number> = {
	sm: 300,
	md: 500,
	lg: 800,
	xl: 1100,
};

export const MOBILE_MODAL_SIZES: Record<string, number> = {
	sm: 250,
	md: 400,
	lg: 700,
	xl: 1000,
};

export const getResponsiveSize = (size: keyof typeof DEFAULT_MODAL_SIZES, isMobile: boolean) => (
	isMobile ? MOBILE_MODAL_SIZES[size] : DEFAULT_MODAL_SIZES[size]
);

