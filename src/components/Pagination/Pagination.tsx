import React from 'react';
import { Stack, Typography, Pagination as PaginationWrapper } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';

import formatMessage from '@utils/formatMessage';

import { CenteredStack, StyledPaginationItem } from './Pagination.styled';

interface IPaginationProps {
	count?: number;
	onPageClick?: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
	count = 0, 
	onPageClick = () => null,
}) => {
	const messages = {
		prev: formatMessage('pagination.prev.text'),
		next: formatMessage('pagination.next.text')
	};

	if (!count) return null;

	return (
		<CenteredStack spacing={2}>
			<PaginationWrapper
				count={count}
				shape="rounded"
				onChange={(_event: React.ChangeEvent<unknown>, page: number) => onPageClick(page)}
				renderItem={(item) => (
					<StyledPaginationItem
						slots={{
							previous: () => (
								<Stack
									gap={1}
									direction="row"
									alignItems="center"
								>
									<ChevronLeftIcon />
									<Typography>
										{messages.prev}
									</Typography>
								</Stack>
							),
							next: () => (
								<Stack
									gap={1}
									direction="row"
									alignItems="center"
								>
									<Typography>
										{messages.next}
									</Typography>
									<ChevronRightIcon />
								</Stack>
							),
						}}
						{...item}
					/>
				)}
			/>
		</CenteredStack>
	);
};

export default Pagination;

