import { forwardRef } from 'react';
import ScreenDownIcon from '@mui/icons-material/ArrowCircleDown';
import ScreenUpIcon from '@mui/icons-material/ArrowCircleUp';
import FieldDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FieldUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import { lighten, styled } from '@mui/material/styles';

export const enum Direction {
    Up = 'up',
    Down = 'down',
}

export interface PositionIconProps {
    direction: `${Direction}`;
    changed?: boolean;
    isField?: boolean;
}

const PositionIconBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'changed' })<
    Pick<PositionIconProps, 'changed'>
>(({ theme, changed }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '999em',
    ...(changed && { backgroundColor: lighten(theme.palette.info.light, 0.92) }),
}));

const isUp = (direction: `${Direction}`): boolean => direction === Direction.Up;

const PositionIcon = forwardRef(({ isField, direction, changed, ...rest }: PositionIconProps, ref): JSX.Element => {
    if (isField) {
        return (
            <PositionIconBox changed={changed} sx={{ p: '2px' }} ref={ref} {...rest}>
                {isUp(direction) ? (
                    <FieldUpIcon fontSize="small" color="inherit" />
                ) : (
                    <FieldDownIcon fontSize="small" color="inherit" />
                )}
            </PositionIconBox>
        );
    }
    return (
        <PositionIconBox changed={changed} sx={{ p: '4px' }} ref={ref} {...rest}>
            {isUp(direction) ? (
                <ScreenUpIcon color="inherit" sx={{ width: 30, height: 30 }} />
            ) : (
                <ScreenDownIcon color="inherit" sx={{ width: 30, height: 30 }} />
            )}
        </PositionIconBox>
    );
});

export default PositionIcon;
export { isUp };
