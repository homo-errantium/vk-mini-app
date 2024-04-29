// import { useEffect, useState } from 'react';
import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    // Placeholder,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
// import { getStory } from '../services/api';
import { NewsPageContent } from '../components/newsPageContent';

export const NewsPage = ({ id, newsItemID }) => {
    const routeNavigator = useRouteNavigator();
    // const [newsItem, setNewsItem] = useState({});

    // useEffect(() => {
    //     getStory(newsItemID).then((data) => {
    //         if (data && data.url) {
    //             setNewsItem(data);
    //             console.log(data);
    //         }
    //     });
    // }, []);

    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    <PanelHeaderBack onClick={() => routeNavigator.back()} />
                }
            >
                News
            </PanelHeader>
            <NewsPageContent newsItemID={newsItemID} />
        </Panel>
    );
};

NewsPage.propTypes = {
    id: PropTypes.string.isRequired,
    newsItemID: PropTypes.number,
};
