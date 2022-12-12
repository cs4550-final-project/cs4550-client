import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/system";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../service/users/userService";
import { User } from "../../types/user";
import { Delete } from "@mui/icons-material";
import { UserContext } from "../../contextProviders/user/UserContext";
import { deleteRecipeReview } from "../../../service/spoonacular/recipesService";
import { UserRecipeReview } from "../../types/userRecipeReview";

type ReviewProps = {
  id: string;
  rating: number;
  review: string;
  user: string;
  setReviews: React.Dispatch<
    React.SetStateAction<UserRecipeReview[] | undefined>
  >;
  reviews: UserRecipeReview[];
};

const Review = ({
  rating,
  review,
  user,
  id,
  setReviews,
  reviews,
}: ReviewProps) => {
  const navigateTo = useNavigate();
  const [reviewUser, setReviewUser] = useState<User | undefined>();
  const currentUser = useContext(UserContext);

  const handleUsernameClick = () => {
    navigateTo("/profile/" + reviewUser?._id);
  };

  const handleDeleteReview = () => {
    deleteRecipeReview(id, currentUser);
    setReviews(reviews.filter((review) => review._id !== id));
  };

  useEffect(() => {
    getUserById(user).then((res) => {
      setReviewUser(res.data.user);
    });
  }, [user]);

  return (
    <>
      <Box
        component="form"
        sx={{
          marginBottom: "24px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        noValidate
        autoComplete="off"
      >
        <Box>
          <Rating
            name="simple-controlled"
            value={rating}
            readOnly
            sx={{ margin: "4px 0" }}
          />
          <h6
            style={{
              marginBottom: "4px",
              marginLeft: "4px",
              cursor: "pointer",
            }}
            onClick={handleUsernameClick}
          >
            {reviewUser?.username}
          </h6>
          <p style={{ marginBottom: "4px", marginLeft: "4px" }}>{review}</p>
        </Box>
        {reviewUser?._id === currentUser?._id && (
          <Delete sx={{ cursor: "pointer" }} onClick={handleDeleteReview} />
        )}
      </Box>
      <hr></hr>
    </>
  );
};
export default Review;
