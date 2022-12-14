import React, { useCallback, useContext, useEffect, useState } from "react";
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
import Button from "../components/button/button";
import {
  getRandomRecipes,
  getRecipesBySearchTerm,
} from "../../service/spoonacular/recipesService";
import { Recipe } from "../types/recipes";
import ListOfTiles from "../components/listOfTiles/listOfTiles";
import filters from "./filters";
import Loading from "../components/loading/loading";
import { UserContext } from "../contextProviders/user/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [recipesSearched, setRecipesSearched] = useState(false);
  const [currentSearchedTerm, setCurrentSearchedTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState(filters);
  const [filteredRecipes, setFilteredRecipes] = useState<
    Recipe[] | undefined
  >();
  const [recipes, setRecipes] = useState<Recipe[] | undefined>();
  const currentUser = useContext(UserContext);
  const navigateTo = useNavigate();

  const filterRecipes = () => {
    const filtered = recipes?.filter((recipe) => {
      let ret = true;
      const options = filterOptions.options;
      Object.keys(options).every((key) => {
        if (
          options[key as keyof typeof options].value &&
          !recipe[key as keyof typeof recipe]
        ) {
          ret = false;
          return false;
        }
        return true;
      });
      return ret;
    });
    setFilteredRecipes(filtered);
  };

  const handleFilterClick = (e: any) => {
    const name = e.target.name;
    let newFilter = filterOptions;
    newFilter.options[name].value = !newFilter.options[name].value;
    setFilterOptions(newFilter);
    filterRecipes();
  };

  const closeMobileFilterOnResize = () => {
    if (window.innerWidth >= 900) {
      setFilterOpen(false);
    }
  };

  const handleSearchForRecipes = () => {
    const fetchRecipes = async () => {
      const recipesMatchingSearchTerm = getRecipesBySearchTerm(searchInput);
      return recipesMatchingSearchTerm;
    };
    fetchRecipes().then((res) => {
      setRecipes(res.results);
      setRecipesSearched(true);
      setCurrentSearchedTerm(searchInput);
    });
  };

  useEffect(() => {
    filterRecipes();
  }, [recipes]);

  // Run on initial load
  useEffect(() => {
    const fetchRecipes = async () => {
      const randomRecipes = getRandomRecipes();
      return randomRecipes;
    };
    fetchRecipes().then((res) => {
      setRecipes(res.recipes);
      setLoading(false);
    });

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
            <Accordion className={styles.filterContainer}>
              <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                <Typography>Dietary Restrictions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Object.keys(filterOptions.options).map((name) => (
                  <div
                    className={styles.filterCheckbox}
                    key={filterOptions.options[name].label + "-modal"}
                  >
                    <Checkbox
                      key={Math.random()}
                      name={name}
                      defaultChecked={filterOptions.options[name].value}
                      onClick={handleFilterClick}
                    />
                    <div>{filterOptions.options[name].label}</div>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Modal>
      </>
      <Box pb={2} className={styles.homeHeader}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          {!currentUser?.role && (
            <Box
              onClick={() => navigateTo("/signin")}
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#f57600",
                width: "260px",
                margin: "8px 0 16px 0",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out;",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              className={styles.signInContainer}
            >
              <p className={styles.signInMessage}>
                Sign in or sign up to access all of Recipeasy's great features!
              </p>
            </Box>
          )}
          <Typography variant="h6">
            {filteredRecipes &&
              (recipesSearched
                ? `Showing ${
                    Object.keys(filteredRecipes).length
                  } results for "${currentSearchedTerm}"`
                : `Showing ${filteredRecipes.length} results`)}
          </Typography>
        </Box>
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
            <Accordion
              defaultExpanded={true}
              className={styles.filterContainer}
            >
              <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                <Typography>Dietary Restrictions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Object.keys(filterOptions.options).map((name) => (
                  <div
                    key={filterOptions.options[name].label}
                    className={styles.filterCheckbox}
                  >
                    <Checkbox
                      key={Math.random()}
                      name={name}
                      defaultChecked={filterOptions.options[name].value}
                      onClick={handleFilterClick}
                    />
                    <div>{filterOptions.options[name].label}</div>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
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
              placeholder="Search for recipes"
              variant="outlined"
              className={styles.searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className={styles.searchButton}>
              <Button
                variant="outlined"
                onClick={handleSearchForRecipes}
                label="Search"
              />
            </div>
          </Box>
          {loading ? (
            <Loading />
          ) : filteredRecipes && filteredRecipes.length ? (
            <ListOfTiles recipes={filteredRecipes} />
          ) : (
            <p className={styles.noResults}>
              No recipes matched your search and filter results.
            </p>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
