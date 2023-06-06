import ChangeTooltip from 'components/ChangeTooltip';

import Container from 'components/PositionView/Container';
import PositionIcon, { Direction } from 'components/PositionView/PositionIcon';
import PositionNumber from 'components/PositionView/PositionNumber';

export const enum PositionVariant {
    Field = 'field',
    Screen = 'screen',
}

export interface PositionViewProps {
    variant?: `${PositionVariant}`;
    position: number;
    previousPosition?: number | null;
    disabled?: boolean;
}

const isFieldVariant = (variant: `${PositionVariant}`): boolean => variant === PositionVariant.Field;

const PositionView: React.FC<PositionViewProps> = ({
    variant = PositionVariant.Field,
    position,
    previousPosition,
    disabled,
}) => {
    const isField = isFieldVariant(variant);

    if (!previousPosition || position === previousPosition) {
        return (
            <Container isField={isField} disabled={disabled}>
                <PositionIcon isField={isField} direction={Direction.Up} />
                {!isField && <PositionNumber>{position}</PositionNumber>}
                <PositionIcon isField={isField} direction={Direction.Down} />
            </Container>
        );
    }

    if (position > previousPosition) {
        return (
            <Container isField={isField} disabled={disabled}>
                <PositionIcon isField={isField} direction={Direction.Up} />
                {!isField && <PositionNumber>{position}</PositionNumber>}
                <ChangeTooltip
                    currentValue={position}
                    previousValue={previousPosition}
                    placement="left"
                    disabled={disabled}
                >
                    <PositionIcon isField={isField} direction={Direction.Down} changed />
                </ChangeTooltip>
            </Container>
        );
    }

    return (
        <Container isField={isField} disabled={disabled}>
            <ChangeTooltip
                currentValue={position}
                previousValue={previousPosition}
                placement="left"
                disabled={disabled}
            >
                <PositionIcon isField={isField} direction={Direction.Up} changed />
            </ChangeTooltip>
            {!isField && <PositionNumber>{position}</PositionNumber>}
            <PositionIcon isField={isField} direction={Direction.Down} />
        </Container>
    );
};

export default PositionView;
export { isFieldVariant };
