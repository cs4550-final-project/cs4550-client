import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import styles from "./home.module.scss";
import {
  AccordionSummary,
  Typography,
  AccordionDetails,
  Checkbox,
  Divider,
  Modal,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListingTile from "../components/listingTile/recipeTile";
import Button from "../components/button/button";
import { getAllProducts } from "../../service/products/productService";
import {
  getRandomRecipes,
  getRecipesBySearchTerm,
} from "../../service/spoonacular/recipesService";
import { mockRecipes } from "../../service/spoonacular/mockRecipes";
import { Recipe } from "../types/recipes";
import filters from "./filters";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[] | undefined>();

  const closeMobileFilterOnResize = () => {
    if (window.innerWidth >= 900) {
      setFilterOpen(false);
    }
  };

  const handleSearchForRecipes = (term: string) => {
    const fetchRecipes = async () => {
      const recipesMatchingSearchTerm = getRecipesBySearchTerm(term);
      return recipesMatchingSearchTerm;
    };
    fetchRecipes().then((res) => {
      setRecipes(res.results);
    });
  };

  // Run on initial load
  useEffect(() => {
    setRecipes(mockRecipes.results);
    // const fetchRecipes = async () => {
    //   const randomRecipes = getRandomRecipes();
    //   return randomRecipes;
    // };
    // fetchRecipes().then((res) => {
    //   setRecipes(res.recipes);
    // });

    closeMobileFilterOnResize();
  }, []);

  // Run when screen size is changed
  const handleWindowResize = useCallback(() => {
    closeMobileFilterOnResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("orientationchange", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("orientationchange", handleWindowResize);
    };
  }, [handleWindowResize]);

  const applyFilters = () => {
    console.log("Apply filters");
  };

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
            {Object.values(filters).map((filter) => (
              <Accordion key={filter.id} className={styles.filterContainer}>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                  <Typography>{filter.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {filter.options.map((option) => (
                    <div
                      key={filter.id + option}
                      className={styles.filterCheckbox}
                    >
                      <Checkbox defaultChecked={false} />
                      <div>{option}</div>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Modal>
      </>
      <Box pb={2} className={styles.homeHeader}>
        <Typography variant="h6">
          {recipes ? `${Object.keys(recipes).length} listings` : <></>}
        </Typography>
        <Box sx={{ display: { md: "none", sm: "block", xs: "block" } }}>
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
          <Box
            sx={{
              display: { md: "block", sm: "none", xs: "none" },
              marginBottom: "8px",
            }}
          >
            <Typography variant="h6">Filters</Typography>
            {Object.values(filters).map((filter) => (
              <Accordion
                defaultExpanded={true}
                key={filter.id}
                className={styles.filterContainer}
              >
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                  <Typography>{filter.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {filter.options.map((option) => (
                    <div
                      key={filter.id + option}
                      className={styles.filterCheckbox}
                    >
                      <Checkbox defaultChecked={false} />
                      <div>{option}</div>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
          <Button
            variant="outlined"
            onClick={() => applyFilters()}
            label="Apply Filters"
          />
        </Grid>
        <Grid item md={9} sm={12} xs={12} className={styles.browseContainer}>
          <Box
            sx={{ marginTop: { md: "31px", sm: "0px", xs: "0px" } }}
            className={styles.searchBarContainer}
          >
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
                onClick={() => handleSearchForRecipes(searchInput)}
                label="Search"
              />
            </div>
          </Box>
          <Grid
            columns={12}
            container
            spacing={2}
            className={styles.listingsContainer}
          >
            {recipes ? (
              Object.values(recipes).map((recipe) => (
                <Grid
                  className={styles.listingItem}
                  item
                  xs={false}
                  onClick={() => console.log("Navigate to item details")}
                >
                  <ListingTile
                    key={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    id={recipe.id}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
