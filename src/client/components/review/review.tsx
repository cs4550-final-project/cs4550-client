import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../service/users/userService";
import { User } from "../../types/user";

type ReviewProps = {
  rating: number;
  review: string;
  user: {
    _id: string;
    username: string;
  };
};

const Review = ({ rating, review, user }: ReviewProps) => {
  const navigateTo = useNavigate();
  const [reviewUser, setReviewUser] = useState<User | undefined>();

  const handleUsernameClick = () => {
    navigateTo("/profile/" + reviewUser?._id);
  };

  useEffect(() => {
    getUserById(user).then((res) => {
      setReviewUser(res.data.user);
    });
  }, [user]);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { marginBottom: "24px", width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Rating
        name="simple-controlled"
        value={rating}
        readOnly
        sx={{ margin: "4px 0" }}
      />
      <h6
        style={{ marginBottom: "4px", marginLeft: "4px", cursor: "pointer" }}
        onClick={handleUsernameClick}
      >
        {reviewUser?.username}
      </h6>
      <p style={{ marginBottom: "48px", marginLeft: "4px" }}>{review}</p>
    </Box>
  );
};
export default Review;
