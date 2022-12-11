import React, { useState, useEffect } from "react";
import TabPanel, { TabPanelProps } from "../../../components/tabPanel/tabPanel";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/user";
import { Box } from "@mui/system";
import ListOfTiles from "../../../components/listOfTiles/listOfTiles";
import {
  getRecipeById,
  getRecipeReviewsFromCritic,
} from "../../../../service/spoonacular/recipesService";
import Loading from "../../../components/loading/loading";
import { getFollowing } from "../../../../service/users/userService";
import UserTileList from "../../../components/userTileList/userTileList";
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
    // const reviewsFromUser = getRecipeReviews(user?._id);
    // console.log("reviewsFromUser :", reviewsFromUser);
    const fetchReviews = async () => {
      const recievedReviews = getRecipeReviewsFromCritic(user?._id);
      return recievedReviews;
    };
    fetchReviews().then((res) => {
      console.log("res.reviews", res.reviews);
      setReviews(res.reviews);
    });
  };

  useEffect(() => {
    console.log(user);
    getRecipeReviews();
    finishLoading();
  }, [user]);

  return loading ? (
    <Loading />
  ) : (
    <TabPanel value={value}>
      <h6>Reviews:</h6>
      {reviews
        ?.slice(0)
        .reverse()
        .map((review, index) => (
          <ProfileReview
            key={`review-${index}`}
            user={review.owner}
            rating={review.rating}
            review={review.review}
            recipeId={review.recipe}
          />
        ))}
    </TabPanel>
  );
};

export default ReviewsPanel;
