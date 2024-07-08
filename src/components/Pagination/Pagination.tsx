import React from 'react';
import { Stack, Typography, Pagination as PaginationWrapper } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';

import formatMessage from '@utils/formatMessage';

import { CenteredStack, StyledPaginationItem } from './Pagination.styled';

interface IPaginationProps {
	page?: number;
	limit?: number;
	totalItems?: number;
	totalPages?: number;
	onPageClick?: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
	page = 1,
	limit = 0,
	totalPages = 0, 
	totalItems = 0,
	onPageClick = () => null,
}) => {
	const messages = {
		prev: formatMessage('pagination.prev.text'),
		next: formatMessage('pagination.next.text')
	};

	if (!totalPages || totalItems < limit) return null;

	return (
		<CenteredStack spacing={2}>
			<PaginationWrapper
				page={page}
				shape="rounded"
				count={totalPages}
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

