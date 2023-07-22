import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    setIsLoading(true);
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-practice-cb3c2-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch");
      }
      const responseData = await response.json();
      const loaddedMeals = [];

      for (const key in responseData) {
        loaddedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
        setMeals(loaddedMeals);
        setIsLoading(false);
      }
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <p className={classes.mealsLoading}>Loading...</p>;
  } else if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  return <Card className={classes.meals}>{mealList}</Card>;
};

export default AvailableMeals;
