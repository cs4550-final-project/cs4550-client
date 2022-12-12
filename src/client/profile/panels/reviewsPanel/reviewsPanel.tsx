import React, { useState, useEffect } from "react";
import TabPanel, { TabPanelProps } from "../../../components/tabPanel/tabPanel";
import { User } from "../../../types/user";
import { getRecipeReviewsFromCritic } from "../../../../service/spoonacular/recipesService";
import Loading from "../../../components/loading/loading";
import { UserRecipeReview } from "../../../types/userRecipeReview";
import ProfileReview from "../../../components/review/profileReview";

interface FollowingPanelProps extends TabPanelProps {
  user: User | undefined;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
}

const ReviewsPanel = ({ value, user, setTabValue }: FollowingPanelProps) => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<UserRecipeReview[] | undefined>();

  const finishLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const getRecipeReviews = () => {
    const fetchReviews = async () => {
      const recievedReviews = getRecipeReviewsFromCritic(user?._id);
      return recievedReviews;
    };
    fetchReviews().then((res) => {
      setReviews(res.reviews);
    });
  };

  useEffect(() => {
    getRecipeReviews();
    finishLoading();
  }, [user]);

  return loading ? (
    <Loading />
  ) : (
    <TabPanel value={value}>
      <h6>Reviews:</h6>
      {reviews && reviews?.length > 0 ? (
        reviews
          ?.slice(0)
          .reverse()
          .map((review, index) => (
            <ProfileReview
              id={review._id}
              key={`review-${index}`}
              rating={review.rating}
              review={review.review}
              recipeId={review.recipe}
            />
          ))
      ) : (
        <p>No reviewed recipes</p>
      )}
    </TabPanel>
  );
};

export default ReviewsPanel;
