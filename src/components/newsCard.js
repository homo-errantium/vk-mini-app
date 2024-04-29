import { useEffect, useState } from 'react';
import { getStory } from '../services/api';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ContentCard } from '@vkontakte/vkui';
import PropTypes from 'prop-types';

export const NewsCard = ({ storyId, setNewsItemID }) => {
    const routeNavigator = useRouteNavigator();
    function redirectNewsItem(id) {
        setNewsItemID(id), routeNavigator.push('newsPage');
    }
    const [newsItem, setNewsItem] = useState({});

    useEffect(() => {
        getStory(storyId).then((data) => {
            if (data && data.url) {
                setNewsItem(data);
            }
        });
    }, []);

    const { title, url, score, by, time } = newsItem;
    return newsItem && url ? (
        <ContentCard
            onClick={() => redirectNewsItem(storyId)}
            subtitle={`Дата публикации: ${new Date(
                time * 1000
            ).toLocaleString()}`}
            header={`Автор: ${by}`}
            text={`${title}`}
            caption={`рейтинг: ${score}`}
            maxHeight={150}
            style={{
                marginBottom: 10,
            }}
            mode='shadow'
        />
    ) : null;
};

NewsCard.propTypes = {
    storyId: PropTypes.number.isRequired,
    setNewsItemID: PropTypes.func,
};
