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
    const [story, setStory] = useState({});

    useEffect(() => {
        getStory(storyId).then((data) => {
            if (data && data.url) {
                setStory(data);
            }
        });
    }, []);

    const { title, url, score, by, time } = story;
    return story && url ? (
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
