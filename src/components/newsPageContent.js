import { useEffect, useState } from 'react';
import { getStory, getComment } from '../services/api';
import {
    Div,
    Title,
    Footnote,
    Caption,
    Headline,
    Subhead,
    Group,
} from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { NewsCommentCard } from './newsCommentCard';

export const NewsPageContent = ({ newsItemID }) => {
    const [KidCommentsArr, setKidCommentsArr] = useState([]);
    const [newsCommentsArr, setNewsCommentsArr] = useState([]);
    const [newsPageData, setNewsPageData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getNewsComment = async (kids) => {
        await kids.map(
            (commentId) =>
                getComment(commentId).then((comment) =>
                    setNewsCommentsArr((newsCommentsArr) => [
                        ...newsCommentsArr,
                        comment,
                    ])
                )
            // getComment(commentId).then((comment) => commentsArray.push(comment))
        );
    };

    const getKidComment = async (kids) => {
        await kids.map((commentId) =>
            getComment(commentId).then((comment) =>
                setKidCommentsArr((KidCommentsArr) => [
                    ...KidCommentsArr,
                    comment,
                ])
            )
        );
        console.log(KidCommentsArr);
    };

    const getNewsInfo = async () => {
        await getStory(newsItemID).then((data) => {
            if (data && data.url) {
                setNewsPageData(data);
                setIsLoading(false);
            }
            if (data && data.kids) {
                getNewsComment(data.kids);
                console.log(data.kids); //data.kids - массив прямых комментариев

                getKidComment(data.kids);
                // console.log(KidCommentsArr);
            }
        });
    };

    useEffect(() => {
        Promise.all([getNewsInfo()]);
    }, []);

    const { title, url, by, time, kids } = newsPageData;

    if (!isLoading)
        return (
            <Div style={{ padding: 20 }}>
                <Group
                    mode='plain'
                    separator='auto'
                    style={{
                        background: 'grey',
                        borderRadius: 5,
                        padding: 5,
                    }}
                >
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
                    <Subhead>{`${kids ? kids.length : 0} comments`}</Subhead>
                    <Footnote> {`ссылка на новость: ${url}`}</Footnote>
                </Group>

                {newsCommentsArr.map((commentObj) => (
                    <NewsCommentCard
                        key={commentObj.id}
                        by={commentObj.by}
                        time={commentObj.time}
                        kids={commentObj.kids}
                        text={commentObj.text}
                        KidCommentsArr={KidCommentsArr}
                    />
                ))}
            </Div>
        );
};
NewsPageContent.propTypes = {
    newsItemID: PropTypes.number,
};
