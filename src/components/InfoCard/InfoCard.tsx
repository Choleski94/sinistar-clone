import { Star as StarIcon } from '@mui/icons-material';
import { Typography, Stack, Box, Link } from '@mui/material';

import { 
	StyledCard,
	StyledCardMedia,
	StyledCardContent,
} from './InfoCard.styled';
import { IListingItem } from '@api/types';

const InfoCard = ({ id, name, address, review_score }: IListingItem) => (
	<Link href={`/rooms?roomId=${id}`} target="_blank" rel="noreferrer" underline="none">
		<StyledCard>
			<StyledCardMedia
				alt={name} component="img"
				image="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
			/>
			<StyledCardContent>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography variant="h6" color="textSecondary">
					{name}
				</Typography>
			</Box>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Box>
					<Typography variant="subtitle1">
						{address}
					</Typography>
				</Box>
				<Stack direction="row" alignItems="center" spacing={1}>
					<StarIcon />
					<Typography variant="body2">
						{review_score}
					</Typography>
				</Stack>
				</Box>
				<Box mt={2} mb={2} width="10%">
					<hr />
				</Box>
				<Typography variant="body2" color="textSecondary">
					Lorem ipsum dolor sit amet. Vel dolores dignissimos sit voluptas enim eum autem quas ea dicta natus! 
					Est aperiam autem qui ullam nostrum ut ipsam esse et dignissimos voluptate. 
					Qui soluta corrupti vel dolor expedita est quia possimus.
				</Typography>
			</StyledCardContent>
		</StyledCard>
	</Link>
);

export default InfoCard;

