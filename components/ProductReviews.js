import { useEffect, useState } from "react";
import axios from "axios";
import WhiteBox from "@/styles/WhiteBox.styles";
import StarsRating from "@/components/StarsRating";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import { Title, Subtitle, ColsWrapper, ReviewWrapper, ReviewHeader } from "@/styles/ProductReviews.styles";

export default function ProductReviews({ product }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  function submitReview() {
    const data = { title, description, stars, product: product._id };
    axios.post('/api/reviews', data).then(res => {
      setTitle('');
      setDescription('');
      setStars(0);
      loadReviews();
    });
  }

  useEffect(() => {
    loadReviews();
  }, []);

  function loadReviews() {
    setReviewsLoading(true);
    axios.get('/api/reviews?product=' + product._id).then(res => {
      setReviews(res.data);
      setReviewsLoading(false);
    });
  }

  return (
    <div>
      <Title>Отзыв</Title>
      <ColsWrapper>
        <div>
          <WhiteBox>
            <Subtitle>Добавить новый отзыв</Subtitle>
            <div>
              <StarsRating onChange={setStars} />
            </div>
            <Input
              value={title}
              onChange={ev => setTitle(ev.target.value)}
              placeholder="Заголовок" />
            <Textarea
              value={description}
              onChange={ev => setDescription(ev.target.value)}
              placeholder="Вам нравиться? Плюсы? Минусы?" />
            <div>
              <Button primary onClick={submitReview}>Отправить отзыв</Button>
            </div>
          </WhiteBox>
        </div>
        <div>
          <WhiteBox>
            <Subtitle>Все отзывы</Subtitle>
            {reviewsLoading && (
              <Spinner fullWidth={true} />
            )}
            {reviews.length === 0 && (
              <p>Пока нет отзывов :(</p>
            )}
            {reviews.length > 0 && reviews.map(review => (
              <ReviewWrapper key={review._id}>
                <ReviewHeader>
                  <StarsRating size={'sm'} disabled={true} defaultHowMany={review.stars} />
                  <time>{(new Date(review.createdAt)).toLocaleString('sv-SE')}</time>
                </ReviewHeader>
                <h3>{review.title}</h3>
                <p>{review.description}</p>
              </ReviewWrapper>
            ))}
          </WhiteBox>
        </div>
      </ColsWrapper>
    </div>
  );
}
