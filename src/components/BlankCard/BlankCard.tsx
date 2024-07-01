import React from 'react';

const BlankCard: React.FC = () => (
	<div className="w-full px-5 py-4 flex flex-col lg:grid grid-cols-10 lg:h-[16rem] border rounded-2xl">
		<div className="lg:h-full h-[10rem] w-full col-span-4 bg-gray-200 rounded-xl mb-4 lg:mb-0" />
		<div className="w-full h-full col-span-6 lg:px-4 py-1">
			<div className="w-1/2 h-6 bg-gray-200 mb-2" />
			<div className="w-full mt-1 h-3 bg-gray-200" />
			<div className="w-full mt-1 h-3 bg-gray-200" />
			<div className="w-full mt-1 h-3 bg-gray-200" />
			<div className="w-1/4 border-gray-200 bg-gray-200 h-7 rounded-lg mt-6" />
		</div>
	</div>
);

export default BlankCard;

