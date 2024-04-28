import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import PersikImage from '../assets/persik.png';

export const NewsPage = ({ id }) => {
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
                <img width={230} src={PersikImage} alt='Persik The Cat' />
            </Placeholder>
        </Panel>
    );
};

NewsPage.propTypes = {
    id: PropTypes.string.isRequired,
};
