import PropTypes from 'prop-types';
import {
    Headline,
    Caption,
    Paragraph,
    Card,
    Button,
    Div,
} from '@vkontakte/vkui';
import { KidCommentCard } from './kidCommentCard copy';
import { useState } from 'react';

export const NewsCommentCard = ({ by, time, kids, text, KidCommentsArr }) => {
    const [isHidden, setIsHidden] = useState(true);

    const handleCommentsButton = () => {
        setIsHidden(!isHidden);
    };
    console.log('🚀 ~ NewsCommentCard ~ KidCommentsArr:', KidCommentsArr);
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
            <Button align='right' onClick={handleCommentsButton}>{`${
                kids ? kids.length : 0
            } comments`}</Button>
            <Div
                style={{
                    display: `${isHidden ? 'none' : 'block'}`,
                }}
            >
                {KidCommentsArr?.map((commentObj) => (
                    <KidCommentCard
                        key={commentObj.id}
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
