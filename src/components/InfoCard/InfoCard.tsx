import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

interface IInfoCardProps {
	id: string;
	name: string;
	address: string;
	review_score: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ id, name, address, review_score }) => {
	return (
		<a target="_blank" rel="noreferrer" href={`/rooms?roomId=${id}`} onClick={(e) => e.preventDefault()}>
			<div className="flex p-5 flex-col max-w-full space-y-1 justify-center sm:justify-start md:flex-row sm:items-center rounded-2xl border cursor-pointer hover:opacity-95 hover:scale-[1.01] hover:shadow-lg transition-all duration-200 ease-out first:border-t last:mb-5">
				<img
					src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
					className="rounded-2xl h-[15rem] sm:h-[20rem] object-cover relative md:h-[14rem] w-full md:w-98 mb-4 sm:mb-0 md:w-80 flex-shrink-0"
				/>
				<div className="flex flex-col flex-grow pl-5">
					<div className="flex justify-between items-center">
						<p className="text-slate-600 py-1 font-[150]">
							{name}
						</p>
					</div>
					<div className="flex justify-between items-center">
						<span className="flex flex-col">
							<h4 className="text-xl">
								{address}
							</h4>
						</span>
						<span className="flex flex-col">
							<Stack direction="row" alignItems="center" gap={1}>
								<StarIcon />
								<Typography>
									{review_score}
								</Typography>
							</Stack>
						</span>
					</div>
					<div className="border-b w-10 pt-2" />
					<p className="pt-2 font-[300] text-sm text-gray-500 flex-grow sm:mb-5 pb-4">
						Lorem ipsum dolor sit amet. Vel dolores dignissimos sit voluptas enim eum autem quas ea dicta natus! Est aperiam autem qui ullam nostrum ut ipsam esse et dignissimos voluptate. Qui soluta corrupti vel dolor expedita est quia possimus.
					</p>
				</div>
			</div>
		</a>
	);
}

export default InfoCard;

