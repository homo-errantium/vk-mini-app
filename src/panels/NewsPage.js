import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';

export const NewsPage = ({ id, newsItemID }) => {
    const routeNavigator = useRouteNavigator();

    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    <PanelHeaderBack onClick={() => routeNavigator.back()} />
                }
            >
                News
            </PanelHeader>
            <Placeholder>
                <h2>{newsItemID}</h2>
            </Placeholder>
        </Panel>
    );
};

NewsPage.propTypes = {
    id: PropTypes.string.isRequired,
    newsItemID: PropTypes.number.isRequired,
};
