import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Pagination as PaginationWrapper } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';

import { CenteredStack, StyledPaginationItem } from './Pagination.styled';

interface IPaginationProps {
	count?: number;
	onPageClick?: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
	count = 0, 
	onPageClick = () => null,
}) => {
	if (!count) return null;

	return (
		<CenteredStack spacing={2}>
			<PaginationWrapper
				count={count}
				shape="rounded"
				onChange={onPageClick}
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
										Previous
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
										Next
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

