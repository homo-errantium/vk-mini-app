import { useEffect, useState } from 'react';
import { getStory } from '../services/api';
import {
    Div,
    Title,
    Footnote,
    Caption,
    Headline,
    Subhead,
} from '@vkontakte/vkui';
import PropTypes from 'prop-types';

export const NewsPageContent = ({ newsItemID }) => {
    const [newsPageData, setNewsPageData] = useState({});
    const [isLoading, setIsLoading] = useState(true); // set some state for loading
    const getNewsInfo = async () => {
        await getStory(newsItemID).then((data) => {
            if (data && data.url) {
                setNewsPageData(data);
                setIsLoading(false);
            }
        });
    };

    useEffect(() => {
        getNewsInfo();
        console.log(newsPageData);
    }, []);

    const { title, url, by, time, kids } = newsPageData;

    if (!isLoading)
        return (
            <Div style={{ padding: 20 }}>
                <Caption level='1' style={{ marginBottom: 16 }}>
                    {`Дата публикации: ${new Date(
                        time * 1000
                    ).toLocaleString()}`}
                </Caption>
                <Headline level='1' style={{ marginBottom: 16 }}>
                    {`Автор: ${by}`}
                </Headline>
                <Title level='1' style={{ marginBottom: 16 }}>
                    {title}
                </Title>
                <Subhead>{`${kids} comments`}</Subhead>
                <Footnote> {`ссылка на новость: ${url}`}</Footnote>
            </Div>
        );
};
NewsPageContent.propTypes = {
    newsItemID: PropTypes.number,
};
