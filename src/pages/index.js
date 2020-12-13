import { useState } from "react";
import { CountriesTable, Layout, SearchInput } from "../components";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  const { countries } = props;
  const [search, setSearch] = useState("");

  const filteredCountries = countries.filter(
    ({ name, region, subregion }) =>
      name.toLowerCase().includes(search) ||
      region.toLowerCase().includes(search) ||
      subregion.toLowerCase().includes(search)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.input_container}>
        <div className={styles.counts}>Found {countries.length} countires</div>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by name, region or sub-region"
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
