import React, { useState } from "react";
import Link from "next/link";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import styles from "./CountriesTable.module.css";

const orderBy = (countries, value, order = "") => {
  if (order === "asc")
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  else if (order === "desc")
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  else return countries;
};

const SortArrow = (props) => {
  const { sortOrder = "" } = props;

  if (!sortOrder) return <></>;

  if (sortOrder.toLowerCase() === "desc")
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );

  return (
    <div className={styles.heading_arrow}>
      <KeyboardArrowUpRounded color="inherit" />
    </div>
  );
};

function ColumnHeading(props) {
  const { classes, onClick, title, sortArrow } = props;
  return (
    <button className={classes} onClick={onClick}>
      <div>{title}</div>
      {sortArrow}
    </button>
  );
}

function CountriesTable(props) {
  const { countries } = props;

  const [sortOrder, setSortOrder] = useState(null);
  const [value, setValue] = useState(null);

  const orderedCountries = orderBy(countries, value, sortOrder);

  const switchSortOrder = () => {
    if (!sortOrder) setSortOrder("desc");
    else if (sortOrder === "desc") setSortOrder("asc");
    else setSortOrder(null);
  };

  const setValueAndSortOrder = (value) => {
    switchSortOrder();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        {/* <button
          className={styles.heading_name}
          onClick={() => setValueAndSortOrder("name")}
        >
          <div>Name</div>
          {value === "name" && <SortArrow sortOrder={sortOrder} />}
        </button> */}

        <ColumnHeading
          classes={styles.heading_name}
          onClick={() => setValueAndSortOrder("name")}
          title="Name"
          sortArrow={value === "name" && <SortArrow sortOrder={sortOrder} />}
        />

        <ColumnHeading
          classes={styles.heading_population}
          onClick={() => setValueAndSortOrder("population")}
          title="Population"
          sortArrow={
            value === "population" && <SortArrow sortOrder={sortOrder} />
          }
        />

        {/* <button
          className={styles.heading_population}
          onClick={() => setValueAndSortOrder("population")}
        >
          <div>Population</div>
          {value === "population" && <SortArrow sortOrder={sortOrder} />}
        </button> */}

        <ColumnHeading
          classes={styles.heading_area}
          onClick={() => setValueAndSortOrder("area")}
          title={
            <>
              Area (km <sup style={{ fontSize: "0.5rem" }}>2</sup>)
            </>
          }
          sortArrow={value === "area" && <SortArrow sortOrder={sortOrder} />}
        />

        {/* <button
          className={styles.heading_area}
          onClick={() => setValueAndSortOrder("area")}
        >
          <div>
            Area (km <sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          {value === "area" && <SortArrow sortOrder={sortOrder} />}
        </button> */}

        <ColumnHeading
          classes={styles.heading_gini}
          onClick={() => setValueAndSortOrder("gini")}
          title="Gini"
          sortArrow={value === "gini" && <SortArrow sortOrder={sortOrder} />}
        />
        {/* <button
          className={styles.heading_gini}
          onClick={() => setValueAndSortOrder("gini")}
        >
          <div>Gini</div>
          {value === "gini" && <SortArrow sortOrder={sortOrder} />}
        </button> */}
      </div>

      {orderedCountries.map((country) => {
        const { flag, name, population, alpha3Code, area, gini } = country;
        return (
          <Link href={`/country/${alpha3Code}`} key={name}>
            <div className={styles.row}>
              <div className={styles.flag}>
                <img src={flag} alt={name} />
              </div>
              <div className={styles.name}>{name}</div>
              <div className={styles.population}>{population}</div>
              <div className={styles.area}>{area ?? 0}</div>
              <div className={styles.gini}>{gini ?? 0} %</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default React.memo(CountriesTable);
