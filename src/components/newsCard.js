import { useEffect, useState } from 'react';
import { getStory } from '../services/api';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Div, Button } from '@vkontakte/vkui';
import PropTypes from 'prop-types';

export const NewsCard = ({ storyId, setNewsItemID }) => {
    function changeNewsItemID(id) {
        setNewsItemID(id), routeNavigator.push('newsPage');
    }
    const routeNavigator = useRouteNavigator();
    const [story, setStory] = useState({});
    useEffect(() => {
        getStory(storyId).then((data) => {
            if (data && data.url) {
                setStory(data);
            }
        });
    }, []);
    const { title, kids, id, url } = story;
    return story && url ? (
        <Div key={storyId}>
            <Button
                stretched
                size='l'
                mode='secondary'
                onClick={() => changeNewsItemID(storyId)}
            >
                {(title, kids, id, url)}
            </Button>
        </Div>
    ) : null;
};

NewsCard.propTypes = {
    storyId: PropTypes.number.isRequired,
    setNewsItemID: PropTypes.func,
};
