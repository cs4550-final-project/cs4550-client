import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import styles from "./home.module.scss"
import { AccordionSummary, Typography, AccordionDetails, Checkbox, Divider, Modal } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListingTile from "../components/listingTile/listingTile";
import Button from "../components/button/button";

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
      price: 200,
    },
    listing2: {
      id: 2,
      title: "listing 2",
      price: 400,
    },
    listing3: {
      id: 3,
      title: "listing 3",
      price: 350,
    },
    listing4: {
      id: 4,
      title: "listing 4",
      price: 150
    },
    listing5: {
      id: 5,
      title: "listing 5",
      price: 200,
    },
    listing6: {
      id: 6,
      title: "listing 6",
      price: 400,
    },
    listing7: {
      id: 7,
      title: "listing 7",
      price: 350,
    },
    listing8: {
      id: 8,
      title: "listing 8",
      price: 150
    },
    listing9: {
      id: 9,
      title: "listing 9",
      price: 200,
    },
    listing10: {
      id: 10,
      title: "listing 10",
      price: 400,
    },
    listing11: {
      id: 11,
      title: "listing 11",
      price: 350,
    },
    listing12: {
      id: 12,
      title: "listing 12",
      price: 150
    },
  };

  const [searchInput, setSearchInput] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const closeMobileFilterOnResize = () => {
    if (window.innerWidth >= 900) {
      setFilterOpen(false);
    }
  };

  // Run on initial load
  useEffect(() => {
    closeMobileFilterOnResize();
  }, []);

  // Run when screen size is changed
  const handleWindowResize = useCallback(() => {
    closeMobileFilterOnResize();
  }, []); 

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('orientationchange', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('orientationchange', handleWindowResize);
    };
  }, [handleWindowResize]);

  const applyFilters = () => {
    console.log("Apply filters")
  }

  return (
    <Box>
      <>
        <Modal
          open={filterOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.filterModal}>
            <Button
              variant="contained"
              onClick={() => setFilterOpen(false)}
              label="Close"
            />
            <Button
              variant="outlined"
              onClick={() => applyFilters()}
              label="Apply Filters"
            />
              {
              Object.values(filterOptions).map((filter) => (
                <Accordion 
                  key={filter.id} className={styles.filterContainer}
                >
                  <AccordionSummary 
                    expandIcon={<ArrowDropDownIcon />}
                  >
                    <Typography>{filter.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {
                      filter.options.map((option) => (
                        <div key={filter.id + option} className={styles.filterCheckbox}>
                          <Checkbox defaultChecked={false} />
                          <div>{option}</div>
                        </div>
                      ))
                    }
                  </AccordionDetails>
                </Accordion>
              ))
            }
          </Box>
        </Modal>
      </>
      <Box pb={2} className={styles.homeHeader}>
        <Typography variant="h6">
          {`${Object.keys(listings).length} listings` }
        </Typography>
        <Box sx={{ display: {md: "none", sm: "block", xs: "block"} }}>
          <Button
            variant="contained"
            onClick={() => setFilterOpen(!filterOpen)}
            label="Filter"
          />
        </Box>
      </Box>
      <Divider />
      <Grid py={1} container spacing={2} className={styles.homeContainer}>
        <Grid item md={3} sm={0} xs={0} className="filter-contianer">
          <Box sx={{ display: {md: "block", sm: "none", xs: "none"}, marginBottom: "8px" }}>
            <Typography variant="h6">Filters</Typography>
            {
              Object.values(filterOptions).map((filter) => (
                <Accordion 
                  defaultExpanded={true} key={filter.id} className={styles.filterContainer}
                >
                  <AccordionSummary 
                    expandIcon={<ArrowDropDownIcon />}
                  >
                    <Typography>{filter.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {
                      filter.options.map((option) => (
                        <div key={filter.id + option} className={styles.filterCheckbox}>
                          <Checkbox defaultChecked={false} />
                          <div>{option}</div>
                        </div>
                      ))
                    }
                  </AccordionDetails>
                </Accordion>
              ))
            }
          </Box>
          <Button
            variant="outlined"
            onClick={() => applyFilters()}
            label="Apply Filters"
          />
        </Grid>
        <Grid item md={9} sm={12} xs={12} className={styles.browseContainer}>
          <Box sx={{ marginTop: { md: "31px", sm: "0px", xs: "0px" } }} className={styles.searchBarContainer}>
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
          </Box>
          <Grid columns={ 12 } container spacing={2} className={styles.listingsContainer}>
            {Object.values(listings).map((listing) => (
              <Grid className={styles.listingItem} item xs={false} onClick={() => console.log("Navigate to item details")}>
                <ListingTile key={listing.id} title={listing.title} price={listing.price} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
