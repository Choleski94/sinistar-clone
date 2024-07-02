import React from 'react';
import { styled } from '@mui/material/styles';

interface IAccomodationProps {
	$color?: string;
}

export const MarkerIconWrapper = styled('div')({
	width: '52px',
	height: '52px',
	display: 'flex',
	borderRadius: '50%',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#fff',
	transition: 'all .25s linear',
	boxShadow: '0 4px 8px -2px rgba(16, 24, 40, .3), 0 2px 4px -2px rgba(16, 24, 40, .06)',
});

export const Accomodation: React.FC<IAccomodationProps> = ({ $color = '#000' }) => (
	<MarkerIconWrapper>
		<svg
			width={27}
			height={30}
			fill={$color}
			viewBox="0 0 27 30"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_5_720)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12.7694 0.0982231L0.148924 10.6344C0.0544726 10.7133 0 10.8291 0 10.9512V29.6885C0 29.8605 0.141391 30 0.315806 30H1.15371C5.60433 30 9.87271 28.2581 13.0223 25.1572L8.72886 18.929C7.4168 17.0257 7.24617 14.5726 8.2824 12.5103C8.74839 11.5829 9.52696 10.8443 10.4846 10.4212L10.7845 10.2887C12.2188 9.65498 13.8609 9.66468 15.2874 10.3153L15.6304 10.4717C16.4904 10.864 17.1996 11.5187 17.6533 12.3392C18.776 14.3696 18.6659 16.8464 17.3673 18.7721L13.0608 25.1581C15.8993 28.2414 19.9257 30 24.1487 30H25.6904C25.8614 30 26 29.8633 26 29.6946V10.9504C26 10.8288 25.9459 10.7133 25.8521 10.6345L13.314 0.0990809C13.1572 -0.0327017 12.9267 -0.0330648 12.7694 0.0982231Z"
				/>
			</g>
			<defs>
				<clipPath id="clip0_5_720">
					<rect width="26.23" height={30} fill="white" />
				</clipPath>
			</defs>
		</svg>
	</MarkerIconWrapper>
);

export const House: React.FC = () => (
	<svg
		width={78}
		height={79}
		fill="none"
		viewBox="0 0 78 79"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M39.0018 4.93658C46.1103 4.94516 52.9253 7.80901 57.9518 12.8999C62.9783 17.9909 65.8059 24.8932 65.8143 32.0928C65.8143 55.329 41.4393 72.8803 40.4016 73.6157C39.9911 73.906 39.5025 74.0617 39.0018 74.0617C38.5012 74.0617 38.0126 73.906 37.6021 73.6157C36.5643 72.8803 12.1893 55.329 12.1893 32.0928C12.1978 24.8932 15.0254 17.9909 20.0519 12.8999C25.0784 7.80901 31.8933 4.94516 39.0018 4.93658ZM39 22.2188C37.0716 22.2188 35.1866 22.7979 33.5832 23.883C31.9798 24.9681 30.7301 26.5103 29.9922 28.3148C29.2542 30.1192 29.0611 32.1047 29.4373 34.0203C29.8135 35.9358 30.7421 37.6954 32.1057 39.0764C33.4693 40.4575 35.2066 41.398 37.0979 41.779C38.9892 42.16 40.9496 41.9645 42.7312 41.2171C44.5127 40.4697 46.0355 39.2039 47.1068 37.58C48.1782 35.9561 48.75 34.0468 48.75 32.0938C48.75 29.4747 47.7228 26.963 45.8943 25.1111C44.0658 23.2592 41.5859 22.2188 39 22.2188Z"
			fill="#B42318"
		/>
		<ellipse cx={39} cy="31.9291" rx="10.3333" ry="10.2042" fill="#B42318" />
		<g clipPath="url(#clip0_927_30912)">
			<path
				d="M38.2909 23.5803L25.3778 34.7331C25.2821 34.8176 25.1597 34.8569 25.0546 34.9269V45.6278C25.0546 46.1393 25.4776 46.5536 26 46.5536H34.8181L32.6182 42.3407L38.7701 38.6376L35.2152 31.7394L43.9636 39.6536L37.8117 43.3568L40.1706 46.5536H50.5818C51.1042 46.5536 51.5273 46.1393 51.5273 45.6278V34.9292C51.4268 34.8621 51.3075 34.8239 51.2165 34.7441L38.2909 23.5803ZM54.9953 30.6001L51.5273 27.6011V19.7059C51.5273 19.1944 51.1042 18.7802 50.5818 18.7802H46.8C46.2776 18.7802 45.8546 19.1944 45.8546 19.7059V22.6968L39.8716 17.5251C39.4207 17.1282 38.8558 16.9292 38.2909 16.9286C37.726 16.928 37.1623 17.1259 36.7132 17.5228L21.5865 30.6001C21.1983 30.942 21.1658 31.527 21.515 31.9077L22.7796 33.286C23.1282 33.6661 23.7262 33.698 24.115 33.356L37.6657 21.6518C38.0232 21.3434 38.5592 21.3434 38.9167 21.6518L52.4674 33.3554C52.8556 33.6968 53.4536 33.6656 53.8029 33.2854L55.0674 31.9072C55.416 31.527 55.3841 30.9414 54.9953 30.6001Z"
				fill="white"
			/>
		</g>
		<defs>
			<clipPath id="clip0_927_30912">
				<rect
					fill="white"
					width="34.0364"
					height="29.625"
					transform="translate(21.2727 16.9286)"
				/>
			</clipPath>
		</defs>
	</svg>
);

export const Icons = {
	House,
	Accomodation
}
