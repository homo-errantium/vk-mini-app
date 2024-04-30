import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { reactLocalStorage } from 'reactjs-localstorage';
import PropTypes from 'prop-types';
import { NewsPageContent } from '../components/newsPageContent';
import { useEffect, useState } from 'react';

export const NewsPage = ({ id }) => {
    const [newsItemID, setNewsItemID] = useState();
    const routeNavigator = useRouteNavigator();

    useEffect(() => {
        setNewsItemID(reactLocalStorage.get('newItemId'));
    }, []);
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
    newsItemID: PropTypes.string,
};
