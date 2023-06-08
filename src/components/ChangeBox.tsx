import { useLayoutEffect, useRef, useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import { styled, lighten } from '@mui/material/styles';

interface ChangeBoxBodyProps {
    height?: number;
    changed?: boolean;
}

interface ChangeBoxProps {
    currentValue: React.ReactNode;
    previousValue?: React.ReactNode;
}

const ChangeBoxBody = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'changed' && prop !== 'height',
})<ChangeBoxBodyProps>(({ theme, changed }) => ({
    display: 'inline-block',
    padding: '7px',
    borderRadius: '999em',
    verticalAlign: 'middle',
    ...(changed && { backgroundColor: lighten(theme.palette.info.light, 0.92) }),
}));

const ChangeBox: React.FC<ChangeBoxProps> = ({ currentValue, previousValue }) => {
    const [expand, setExpand] = useState(false);
    const [width, setWidth] = useState(24);
    const currentValueBox = useRef<HTMLDivElement | null>(null);
    const isChanged = previousValue !== null && previousValue !== undefined;

    const hoverHandler: React.MouseEventHandler = (event) => {
        if (isChanged) {
            if (event.type === 'mouseenter') {
                setExpand(true);
            } else {
                setExpand(false);
            }
        }
    };

    useLayoutEffect(() => {
        if (currentValueBox.current !== null) {
            setWidth(currentValueBox.current.offsetWidth);
        }
    }, []);

    return (
        <ChangeBoxBody changed={isChanged} onMouseEnter={hoverHandler} onMouseLeave={hoverHandler}>
            <Collapse
                in={expand}
                orientation="horizontal"
                collapsedSize={width}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
                <Stack direction="row" alignItems="center" flexWrap="nowrap" justifyContent="flex-end">
                    <Fade in={expand}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ color: 'action.active' }}
                        >
                            {previousValue}
                            <EastIcon color="info" sx={{ width: 16, height: 16, mx: 1 }} />
                        </Stack>
                    </Fade>
                    <Stack direction="row" alignItems="center" justifyContent="center" ref={currentValueBox}>
                        {currentValue}
                    </Stack>
                </Stack>
            </Collapse>
        </ChangeBoxBody>
    );
};

export default ChangeBox;
