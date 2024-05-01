import PropTypes from 'prop-types';
import {
    Headline,
    Caption,
    Paragraph,
    Card,
    Button,
    Div,
} from '@vkontakte/vkui';
import { KidCommentCard } from './kidCommentCard';
import { useEffect, useState } from 'react';
import { getComment } from '../services/api';

export const NewsCommentCard = ({ by, time, kids, text }) => {
    //стейт скрытия комментов
    const [isHidden, setIsHidden] = useState(true);

    // массив индексов дочерних комментов
    const [KidCommentsArr, setKidCommentsArr] = useState([]);
    console.log(kids);

    const getKidComment = async () => {
        await kids?.map((commentId) =>
            getComment(commentId).then((comment) =>
                setKidCommentsArr((KidCommentsArr) => [
                    ...KidCommentsArr,
                    comment,
                ])
            )
        );
    };

    // ф-я кнопки скрытия дочерних комментов
    const handleCommentsButton = async () => {
        setIsHidden(!isHidden);
    };

    // взятие дочерних комментов
    useEffect(() => {
        getKidComment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card
            style={{
                marginTop: 20,
                marginBottom: 20,
                padding: 10,
            }}
        >
            <Paragraph>{text}</Paragraph>
            <Headline level='1' style={{ marginBottom: 16 }}>
                {`Автор: ${by}`}
            </Headline>
            <Caption level='1' style={{ marginBottom: 16 }}>
                {`${new Date(time * 1000).toLocaleString()}`}
            </Caption>
            <Button
                style={{
                    backgroundColor: 'ButtonShadow',
                }}
                align='right'
                onClick={handleCommentsButton}
            >{`${kids ? kids.length : 0} comments`}</Button>
            <Div
                style={{
                    display: `${isHidden ? 'none' : 'block'}`,
                }}
            >
                {KidCommentsArr?.map((commentObj, i) => (
                    <KidCommentCard
                        key={i}
                        by={commentObj.by}
                        time={commentObj.time}
                        text={commentObj.text}
                    />
                ))}
            </Div>
        </Card>
    );
};

NewsCommentCard.propTypes = {
    by: PropTypes.string,
    text: PropTypes.string,
    kids: PropTypes.array,
    time: PropTypes.number,
    KidCommentsArr: PropTypes.array,
};
