import { useEffect, useState } from 'react';
import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import { getStory } from '../services/api';

export const NewsPage = ({ id, newsItemID }) => {
    const routeNavigator = useRouteNavigator();
    const [newsItem, setNewsItem] = useState({});

    useEffect(() => {
        getStory(newsItemID).then((data) => {
            if (data && data.url) {
                setNewsItem(data);
                console.log(data);
            }
        });
    }, []);
    const { title, url, score, by, time } = newsItem;

    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    <PanelHeaderBack onClick={() => routeNavigator.back()} />
                }
            >
                News
            </PanelHeader>
            <Placeholder>{(title, url, score, by, time)}</Placeholder>
        </Panel>
    );
};

NewsPage.propTypes = {
    id: PropTypes.string.isRequired,
    newsItemID: PropTypes.number,
};
