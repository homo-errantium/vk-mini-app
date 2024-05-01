import { useCallback, useEffect, useState } from 'react';
import { getNewsItemData, getComment } from '../services/api';
import {
    Header,
    Title,
    Footnote,
    Headline,
    Subhead,
    Group,
    PanelSpinner,
    Card,
    Link,
    Spacing,
    IconButton,
    VisuallyHidden,
} from '@vkontakte/vkui';
import { Icon28SwitchOutline } from '@vkontakte/icons';
import PropTypes from 'prop-types';
import { NewsCommentCard } from './newsCommentCard';

export const NewsPageContent = ({ newsItemID }) => {
    // массив индексов корневых комментариев
    const [newsCommentsArr, setNewsCommentsArr] = useState([]);

    // объект конкретной новости
    const [newsPageData, setNewsPageData] = useState({});

    // стейт загрузки
    const [isLoading, setIsLoading] = useState(true);

    //ф-я взятия и установки массива корневых комментариев
    const getNewsComment = async (kids) => {
        await kids.map((commentId) =>
            getComment(commentId).then((comment) =>
                setNewsCommentsArr((newsCommentsArr) => [
                    ...newsCommentsArr,
                    comment,
                ])
            )
        );
    };

    // ф-я взятия и установки информации о конкретной новости
    const getNewsItemInfo = useCallback(async () => {
        setIsLoading(true);
        await getNewsItemData(newsItemID).then((data) => {
            if (data) {
                setNewsPageData(data);
                if (data.kids) {
                    getNewsComment(data.kids);
                }
            }
        });
        setIsLoading(false);
    }, [newsItemID]);

    //первичное взятие информации о конкретной новости
    useEffect(() => {
        getNewsItemInfo();
    }, [getNewsItemInfo]);

    const { title, url, by, time, kids } = newsPageData;

    return isLoading ? (
        <PanelSpinner size={'large'}>
            загружается, пожалуйста, подождите...
        </PanelSpinner>
    ) : (
        <Group
            style={{ margin: 10 }}
            header={
                <Header
                    style={{
                        marginBottom: 10,
                        padding: 5,
                    }}
                    size='large'
                    mode='secondary'
                >
                    News page
                </Header>
            }
        >
            <IconButton
                borderRadiusMode='auto'
                hovered='true'
                style={{
                    marginBottom: 16,
                }}
                onClick={() => {
                    getNewsItemInfo();
                }}
            >
                <VisuallyHidden>Обновить</VisuallyHidden>
                <Icon28SwitchOutline />
            </IconButton>
            <Card
                style={{
                    marginBottom: 10,
                    padding: 15,
                }}
                mode='shadow'
            >
                <Title level='1' style={{ marginBottom: 15 }}>
                    {title}
                </Title>
                <Headline level='2' style={{ marginBottom: 15 }}>
                    {`Автор: ${by}`}
                </Headline>
                <Footnote
                    style={{ fontSize: 16, marginBottom: 15 }}
                    weight='3'
                >{`Дата публикации: ${new Date(
                    time * 1000
                ).toLocaleString()}`}</Footnote>

                <Link
                    target='_blank'
                    href={`${url}`}
                    style={{ fontSize: 16 }}
                    weight='3'
                >
                    {url}
                </Link>
                <Spacing size={20} />
                <Subhead>{`${kids ? kids.length : 0} comments`}</Subhead>
                <Group
                    style={{
                        position: 'static',
                        padding: 0,
                        marginLeft: 15,
                        backgroundColor: 'inherit',
                    }}
                >
                    {newsCommentsArr.map((commentObj, i) => (
                        <NewsCommentCard
                            key={i}
                            by={commentObj.by}
                            time={commentObj.time}
                            kids={commentObj.kids}
                            text={commentObj.text}
                        />
                    ))}
                </Group>
            </Card>
        </Group>
    );
};
NewsPageContent.propTypes = {
    newsItemID: PropTypes.string,
};
