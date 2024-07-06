import {
	Box,
	Typography,
	CardContent,
	CardActionArea,
} from '@mui/material';
import React from 'react';

import Carousel from '../Carousel';
import { ICardProps } from './types';
import { Container, RatingContainer, Rating } from './Card.styled';

const Card = React.forwardRef<HTMLDivElement, ICardProps>((props, ref) => {
        const preventEventPropagation = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
                e.stopPropagation();
                e.preventDefault();
        };

	return (
		<Container 
			ref={ref}
			onClick={preventEventPropagation}
			onDoubleClick={preventEventPropagation}
		>
			<CardActionArea disableTouchRipple={true}>
				<Carousel images={props?.images} />
				<CardContent>
					<Typography variant="h6" component="h6" noWrap>
						{props?.name}
					</Typography>
					<Typography gutterBottom variant="subtitle2">
						{props?.address}
					</Typography>
					<Typography variant="body1" color="textSecondary" component="p" noWrap>
						{props?.description}
					</Typography>
					<RatingContainer>
						<Rating readOnly value={props?.review_score} size="small" />
						<Typography variant="body2" color="textSecondary" component="p">
							<Box ml={1}>
								{props?.review_score}
							</Box>
						</Typography>
					</RatingContainer>
				</CardContent>
			</CardActionArea>
		</Container>
	);
});

export default Card;

