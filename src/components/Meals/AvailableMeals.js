import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setmeals] = useState([]);
  const [isLoading, setIsLodaing] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        "https://react-http-fa29b-default-rtdb.firebaseio.com/meals.json"
      );
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const resJson = await res.json();

      const loadedMeals = [];
      for (const key in resJson) {
        loadedMeals.push({
          id: key,
          name: resJson[key].name,
          description: resJson[key].description,
          price: resJson[key].price,
        });
      }
      setmeals(loadedMeals);
      setIsLodaing(false);
    };

    fetchMeals().catch((e) => {
      setIsLodaing(false);
      setError(e.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <h2>Loading...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
