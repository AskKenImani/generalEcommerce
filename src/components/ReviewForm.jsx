
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Star } from 'lucide-react';
import { useReviews } from '../hooks/useReviews';
import { useUserProfile } from '../hooks/useUserProfile';
import styles from './ReviewForm.module.css';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { addReview } = useReviews();
  const { profile } = useUserProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim() || !profile) return;

    setSubmitting(true);
    try {
      await addReview(rating, comment.trim(), `${profile.firstName} ${profile.lastName}`);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>
              Rating
            </label>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className={styles.starButton}
                >
                  <Star
                    className={`${styles.star} ${
                      star <= (hoveredRating || rating)
                        ? styles.starFilled
                        : styles.starEmpty
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className={styles.label}>
              Comment
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              required
            />
          </div>
          
          <Button
            type="submit"
            disabled={!rating || !comment.trim() || submitting}
            className={styles.submitButton}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
