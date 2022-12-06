import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import styles from "./home.module.scss";
import {
  AccordionSummary,
  Typography,
  AccordionDetails,
  Checkbox,
  Input,
} from "@mui/material";
import Button from "../components/button/button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListingTile from "../components/listingTile/listingTile";

const Home = () => {
  const filterOptions = {
    filter1: {
      id: 1,
      name: "filter 1",
      options: ["option 1", "option 2", "option 3"],
    },
    filter2: {
      id: 2,
      name: "filter 2",
      options: ["option 1", "option 2", "option 3"],
    },
    filter3: {
      id: 3,
      name: "filter 3",
      options: ["option 1", "option 2", "option 3"],
    },
  };

  const listings = {
    listing1: {
      id: 1,
      title: "listing 1",
    },
    listing2: {
      id: 2,
      title: "listing 2",
    },
    listing3: {
      id: 3,
      title: "listing 3",
    },
    listing4: {
      id: 4,
      title: "listing 4",
    },
  };

  const [searchInput, setSearchInput] = useState("");

  return (
    <Box>
      <Grid container spacing={2} className={styles.homeContainer}>
        <Grid item xs={3} className="filter-container">
          {Object.values(filterOptions).map((option) => (
            <Accordion key={option.id}>
              <AccordionSummary>
                <Typography>{option.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {option.options.map((option) => (
                  <div className={styles.filterCheckbox}>
                    <Checkbox defaultChecked />
                    <div>{option}</div>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid item xs={9} className={styles.browseContainer}>
          <div className={styles.searchBarContainer}>
            <TextField
              sx={{
                ".MuiInputBase-input": {
                  height: "36.49px",
                  padding: "1px 8px",
                },
              }}
              placeholder="placeholder asjkd"
              variant="outlined"
              className={styles.searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className={styles.searchButton}>
              <Button
                variant="outlined"
                onClick={() => console.log("Search for: ", searchInput)}
                label="Search"
              />
            </div>
          </div>
          <section className={styles.listingsContainer}>
            {Object.values(listings).map((listing) => (
              <ListingTile key={listing.id} title={listing.title} />
            ))}
          </section>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
