import React from 'react';
import { 
	Menu as MenuIcon, 
	Language as LanguageIcon,
} from '@mui/icons-material';

import { useStore } from '@store';
import { IListingItem } from '@api/types';
import formatMessage from '@utils/formatMessage';
import { IConstructLocaleObject } from '@locales/types';
import { Modal, Forms, SearchLocation } from '@components';

interface IHeaderProps {
	placeholder?: string;
}

const parseLocation = (payload: google.maps.GeocoderResult) => ({
	id: payload?.place_id,
	address: payload?.formatted_address,
	latitude: payload?.geometry?.viewport?.getNorthEast()?.lat(),
	longitude: payload?.geometry?.viewport?.getNorthEast()?.lng(),
});

const Header: React.FC<IHeaderProps> = () => {
	const { dispatch, actions } = useStore();

	const [ showLanguageModal, setShowLanguageModal ] = React.useState<boolean>(false);

	const messages = {
		hostingCta: formatMessage('header.hositng.cta'),
		languageTitle: formatMessage('modal.language.title'),
	}

	const toggleLanguageModal = () => {
		setShowLanguageModal(!showLanguageModal);
	};

	const handleLocationSet = (locationData: google.maps.GeocoderResult) => {
		const claimData = parseLocation(locationData) as IListingItem;
		dispatch(actions.setClaim(claimData));
	}

	const handleLanguageSet = (parsedLocaleISO: IConstructLocaleObject) => {
		dispatch(actions.setLocale(parsedLocaleISO));
		toggleLanguageModal();
	}

	return (
		<>
			<div className="fixed lg:sticky top-0 z-[900] w-full">
				<header className="sticky top-0 items-start lg:items-center z-50 flex justify-between md:grid md:grid-cols-3 bg-white shadow-md p-5 md:px-10 content-start">
					{/* Section: Branding */}
					<div className="hidden relative md:flex flex-col items-start justify-start h-10 cursor-pointer">
						<svg width={142} height={32} viewBox="0 0 142 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
							<path d="M27.5042 11.9506L16.9162 3.19287C16.7802 3.0688 16.6025 3 16.4182 3C16.2338 3 16.0561 3.0688 15.9201 3.19287L5.29524 11.9506C5.20265 12.024 5.12798 12.1175 5.07686 12.2239C5.02573 12.3303 4.99949 12.4468 5.00011 12.5648V28.3551C4.99708 28.5156 5.05714 28.6708 5.16745 28.7877C5.27777 28.9045 5.42957 28.9737 5.59038 28.9804C7.5818 29.0856 9.57281 28.766 11.4305 28.0429C13.2881 27.3198 14.9697 26.2099 16.3628 24.7873L14.2231 21.5873L12.3785 18.8177C11.8984 18.098 11.6229 17.2621 11.5813 16.3988C11.5397 15.5355 11.7336 14.6771 12.1423 13.9149C12.551 13.1527 13.1593 12.5152 13.9025 12.0702C14.6457 11.6252 15.4959 11.3894 16.3628 11.3878C17.6331 11.3977 18.8498 11.8988 19.7569 12.7855C20.5392 13.5681 21.0254 14.5967 21.133 15.6964C21.2406 16.7961 20.9629 17.899 20.3471 18.8177V18.8177L17.2851 23.3786L16.3628 24.7763C17.7567 26.1986 19.4381 27.309 21.2954 28.0338C23.1527 28.7587 25.1433 29.0813 27.1353 28.9804V28.9804C27.2961 28.9737 27.4479 28.9045 27.5582 28.7877C27.6685 28.6708 27.7286 28.5156 27.7255 28.3551V12.5648C27.7556 12.4521 27.7505 12.333 27.711 12.2232C27.6714 12.1135 27.5993 12.0184 27.5042 11.9506V11.9506Z" fill="#EDCC1F" />
							<path d="M39.9203 20.8972C39.9203 20.8972 41.7242 22.8757 43.9937 22.8757C45.3903 22.8757 46.5541 22.4684 46.5541 21.6537C46.5541 20.839 45.914 20.6063 43.8773 20.1407C41.2005 19.5588 38.8147 18.395 38.8147 15.8346C38.8147 13.7397 40.9096 11.5867 44.692 11.5867C46.5354 11.5874 48.3301 12.1788 49.8128 13.2742L48.067 15.7764C47.0741 15.0783 45.9042 14.6748 44.692 14.6126C43.4118 14.6126 42.2479 15.0781 42.2479 15.8928C42.2479 16.7075 43.179 16.9402 45.4484 17.4058C48.1252 17.9877 50.0455 18.8605 50.0455 21.6537C50.0455 23.9814 47.6015 25.8435 44.1101 25.8435C42.979 25.8722 41.854 25.6703 40.8035 25.2502C39.7531 24.83 38.7992 24.2003 38 23.3994L39.9203 20.8972Z" fill="#232323" />
							<path d="M54.061 6.00028C54.3603 5.99556 54.6575 6.05104 54.935 6.16342C55.2125 6.27581 55.4645 6.4428 55.6762 6.65448C55.8879 6.86616 56.0549 7.11823 56.1673 7.3957C56.2796 7.67317 56.3351 7.9704 56.3304 8.26973C56.3304 8.87162 56.0913 9.44887 55.6657 9.87447C55.2401 10.3001 54.6628 10.5392 54.061 10.5392C53.4591 10.5392 52.8818 10.3001 52.4562 9.87447C52.0306 9.44887 51.7915 8.87162 51.7915 8.26973C51.7915 7.66783 52.0306 7.09059 52.4562 6.66498C52.8818 6.23938 53.4591 6.00028 54.061 6.00028V6.00028ZM52.3734 11.9358H55.8067V25.5525H52.3734V11.9358Z" fill="#232323" />
							<path d="M71.1688 16.7074V25.4943H67.7356V17.5221C67.7356 15.5436 66.5136 14.7289 65.0588 14.7289C63.2549 14.7289 62.382 16.4746 62.382 16.4746V25.4361H58.9487V11.8194H62.1492V13.7979C62.5672 13.0892 63.1627 12.5017 63.8771 12.0935C64.5914 11.6854 65.3999 11.4705 66.2226 11.4702C66.8947 11.4781 67.5583 11.6212 68.174 11.8908C68.7897 12.1605 69.3448 12.5513 69.8063 13.04C70.2678 13.5286 70.6262 14.1051 70.8603 14.7352C71.0944 15.3652 71.1993 16.036 71.1688 16.7074V16.7074Z" fill="#232323" />
							<path d="M75.9406 6.00028C76.24 5.99556 76.5372 6.05104 76.8147 6.16342C77.0921 6.27581 77.3442 6.4428 77.5559 6.65448C77.7676 6.86616 77.9345 7.11823 78.0469 7.3957C78.1593 7.67317 78.2148 7.9704 78.2101 8.26973C78.2101 8.87162 77.971 9.44887 77.5454 9.87447C77.1198 10.3001 76.5425 10.5392 75.9406 10.5392C75.3387 10.5392 74.7615 10.3001 74.3359 9.87447C73.9103 9.44887 73.6712 8.87162 73.6712 8.26973C73.6665 7.9704 73.7219 7.67317 73.8343 7.3957C73.9467 7.11823 74.1137 6.86616 74.3254 6.65448C74.5371 6.4428 74.7891 6.27581 75.0666 6.16342C75.3441 6.05104 75.6413 5.99556 75.9406 6.00028V6.00028ZM74.1949 11.9358H77.6282V25.5525H74.1949V11.9358Z" fill="#232323" />
							<path d="M81.5849 20.8972C81.5849 20.8972 83.3888 22.8757 85.6582 22.8757C87.0548 22.8757 88.2186 22.4684 88.2186 21.6537C88.2186 20.839 87.5785 20.6063 85.5418 20.1407C82.8651 19.5588 80.4792 18.395 80.4792 15.8346C80.4792 13.7397 82.5741 11.5867 86.3565 11.5867C88.1999 11.5874 89.9946 12.1788 91.4773 13.2742L89.7316 15.7764C88.7387 15.0783 87.5687 14.6748 86.3565 14.6126C85.0763 14.6126 83.9125 15.0781 83.9125 15.8928C83.9125 16.7075 84.8436 16.9402 87.113 17.4058C89.7898 17.9877 91.7101 18.8605 91.7101 21.6537C91.7101 23.9814 89.2661 25.8435 85.7746 25.8435C84.6448 25.8632 83.5223 25.6572 82.4732 25.2375C81.424 24.8178 80.4691 24.1929 79.6646 23.3994L81.5849 20.8972Z" fill="#232323" />
							<path d="M92.6997 11.9358H95.3765V7.92065H98.8098V11.9358H102.883V15.02H98.8098V20.4899C98.8098 22.1775 99.6826 22.643 100.614 22.643C101.131 22.6155 101.632 22.4552 102.068 22.1775L103.349 24.9706C102.364 25.5568 101.236 25.8589 100.09 25.8435C97.4714 25.8435 95.4347 23.9232 95.4347 21.0136V15.02H92.7579L92.6997 11.9358Z" fill="#232323" />
							<path d="M117.78 11.9357V25.5524H114.579V23.7485C114.138 24.4191 113.532 24.9645 112.818 25.3315C112.104 25.6986 111.308 25.8749 110.506 25.8433C106.956 25.8433 103.872 22.8756 103.872 18.6858C103.872 14.4961 106.956 11.5283 110.506 11.5283C111.306 11.5084 112.098 11.6897 112.81 12.0558C113.522 12.4218 114.13 12.9608 114.579 13.6232V11.8193H117.78V11.9357ZM114.288 16.7073C113.967 16.1371 113.503 15.6601 112.942 15.3234C112.381 14.9867 111.742 14.8019 111.088 14.787C108.76 14.787 107.305 16.4746 107.305 18.744C107.305 21.0135 108.76 22.701 111.088 22.701C111.742 22.6862 112.381 22.5013 112.942 22.1646C113.503 21.8279 113.967 21.351 114.288 20.7807V16.7073Z" fill="#232323" />
							<path d="M130 11.994L128.778 15.0781C128.259 14.876 127.706 14.7771 127.149 14.7872C126.525 14.8049 125.918 14.9863 125.386 15.3132C124.855 15.64 124.419 16.1008 124.123 16.6493V25.5525H120.689V11.9358H123.948V13.9143C123.948 13.9143 125.112 11.5867 127.672 11.5867C128.465 11.6003 129.25 11.7377 130 11.994V11.994Z" fill="#232323" />
						</svg>
					</div>

					{/* Section: Search address location */}
					<div className="max-w-[60vw]">
						<SearchLocation 
							onSelect={handleLocationSet}
						/>
					</div>

					{/* Section: User navigation */}
					<div className="flex items-center justify-end space-x-1 md:space-x-3 text-gray-500">
						<div className="hover:bg-[#f7f7f7] cursor-pointer lg:p-2 rounded-full md:px-2 lg:px-4">
							<p className="hidden md:inline text-[#222222] font-[500]">
								{messages.hostingCta}
							</p>
						</div>
						<div className="hover:bg-[#f7f7f7] cursor-pointer lg:p-2 rounded-full md:px-2 lg:px-4">
							<p className="hidden md:inline text-[#222222] font-[500]">
								<LanguageIcon 
									onClick={toggleLanguageModal}
									className="h-6 cursor-pointer text-[#222222]" 
								/>
							</p>
						</div>
						<div id="icons" className="grid grid-cols-2 gap-1 items-center justify-center border-2 p-2 rounded-full hover:shadow-md transition box-shadow duration-150">
							<div className="flex justify-center w-full">
								<MenuIcon className="h-6 cursor-pointer text-[#222222]" />
							</div>
							<img 
								className="w-8 h-8 object-cover rounded-full overflow-hidden cursor-pointer"
								src="https://firebasestorage.googleapis.com/v0/b/airbnb-clone-alon.appspot.com/o/placeholder.jpg?alt=media&token=e007530f-1b35-4605-9312-db3af5ee536b"
							/>
						</div>
					</div>
				</header>
			</div>
			<Modal 
				open={showLanguageModal}
				onClose={toggleLanguageModal}
				title={messages.languageTitle}
			>
				<Forms.Language 
					onSubmit={handleLanguageSet}
				/>
			</Modal>
		</>
	);
}

export default Header;
