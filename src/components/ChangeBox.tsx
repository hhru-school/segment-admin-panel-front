import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
    changed?: boolean;
    disabled?: boolean;
}

const ChangeBoxBody = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'changed' && prop !== 'height',
})<ChangeBoxBodyProps>(({ theme, changed }) => ({
    display: 'inline-block',
    borderRadius: '999em',
    verticalAlign: 'middle',
    transition: theme.transitions.create(['background-color']),
    ...(changed && { backgroundColor: lighten(theme.palette.info.light, 0.92) }),
}));

const ChangeBox: React.FC<ChangeBoxProps> = ({ currentValue, previousValue, disabled, changed = false }) => {
    const [expand, setExpand] = useState(false);
    const [width, setWidth] = useState(24);
    const currentValueBox = useRef<HTMLDivElement | null>(null);

    const hoverHandler: React.MouseEventHandler = (event) => {
        if (changed) {
            if (event.type === 'mouseenter') {
                setExpand(true);
            } else {
                setExpand(false);
            }
        }
    };

    useEffect(() => {
        setExpand(changed);
    }, [changed]);

    useLayoutEffect(() => {
        if (currentValueBox.current !== null) {
            setWidth(currentValueBox.current.offsetWidth);
        }
    }, []);

    return (
        <ChangeBoxBody changed={changed} onMouseEnter={hoverHandler} onMouseLeave={hoverHandler}>
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
                            sx={{ color: disabled ? 'action.disabled' : 'action.active' }}
                        >
                            {previousValue}
                            <EastIcon color={disabled ? 'disabled' : 'info'} sx={{ width: 16, height: 16 }} />
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
