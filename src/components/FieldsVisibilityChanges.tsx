import React from 'react';
import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';

import { useAppSelector } from 'hooks/redux-hooks';
import { selectQuestionActivatorLinkMap, selectLayerChangesLoadingStatus } from 'models/layerChanges';

import ContentBox from 'components/ContentBox';
import QuestionTable from 'components/QuestionTable';
import Subtitle from 'components/Subtitle';

const FieldsVisibilityChanges: React.FC = () => {
    const isLoading = useAppSelector(selectLayerChangesLoadingStatus);
    const links = useAppSelector(selectQuestionActivatorLinkMap, shallowEqual);

    if (!isLoading && links === null) {
        return (
            <>
                <Subtitle>Значения полей сегментов</Subtitle>
                <ContentBox>
                    <Alert severity="info">Изменений нет.</Alert>
                </ContentBox>
            </>
        );
    }

    if (isLoading) {
        return (
            <>
                <Subtitle>Значения полей сегментов</Subtitle>
                <Subtitle variant="h6" loading={isLoading} SkeletonProps={{ sx: { width: '100%' } }} />
                <ContentBox loading={isLoading} skeletonWidth="100%" skeletonHeight={200} />
            </>
        );
    }

    return (
        <>
            <Subtitle>Значения полей сегментов</Subtitle>
            {links !== null &&
                Object.keys(links).map((segmentTitle) => {
                    const data = links[segmentTitle];
                    return (
                        <React.Fragment key={segmentTitle}>
                            <Subtitle variant="h6">{segmentTitle}</Subtitle>
                            <ContentBox>
                                {data === undefined ? (
                                    <Alert severity="info">Изменений нет.</Alert>
                                ) : (
                                    <QuestionTable items={data} />
                                )}
                            </ContentBox>
                        </React.Fragment>
                    );
                })}
        </>
    );
};

export default FieldsVisibilityChanges;
