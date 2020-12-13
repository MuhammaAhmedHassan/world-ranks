import { useEffect, useState } from "react";
import { Layout } from "../../components";
import styles from "./Country.module.css";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await res.json();

  return country;
};

const DetailsPanelRow = ({ name, value }) => {
  return (
    <div className={styles.details_panel_row}>
      <div className={styles.details_panel_label}>{name}</div>
      <div className={styles.details_panel_value}>{value}</div>
    </div>
  );
};

const Country = (props) => {
  const { country } = props;
  console.log(country);
  const [borderCountries, setBorderCountries] = useState([]);

  const getBorderCountries = async () => {
    const _borderCountries = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );

    setBorderCountries(_borderCountries);
  };

  useEffect(() => {
    getBorderCountries();
  }, []);

  const detailsPanel = [
    { name: "Capital", value: country.capital },
    { name: "Subregion", value: country.subregion },
    {
      name: "Language",
      value: country.languages.map(({ name }) => name).join(", "),
    },
    {
      name: "Currencies",
      value: country.currencies.map(({ name }) => name).join(", "),
    },
    { name: "Native name", value: country.nativeName },
    { name: "Gini", value: country.gini + " %" },
  ];

  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img src={country.flag} alt={country.name} />

            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            {detailsPanel.map(({ name, value }) => (
              <DetailsPanelRow key={name} name={name} value={value} />
            ))}

            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighbouring Countries
              </div>

              <div className={styles.details_panel_borders_container}>
                {borderCountries.map(({ flag, name }) => (
                  <div
                    key={name}
                    className={styles.details_panel_borders_country}
                  >
                    <img src={flag} alt={name} />
                    <div className={styles.details_panel_borders_name}>
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};
