import React, { useEffect, useState, useRef } from "react";
import { Doughnut, Pie, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Villa from "../assets/Icons/villa_24.svg";
import Cart from "../assets/Icons/shopping_cart_24.png";
import Gong from "../assets/Icons/notifications_active_24.svg";
import Wallet from "../assets/Icons/account_balance_wallet_24.svg";
import api from "../api";

export default function AdminHome() {
  const [subscribedUsers, setSubscribedUsers] = useState(0);
  const [subscribedUsersCount, setSubscribedCount] = useState(0);

  useEffect(() => {
    api
      .get("http://localhost:8000/api/get-subscribed-users/")
      .then((res) => res.data)
      .then((data) => {
        setSubscribedUsers(data.length);
        // console.log("Subscribers", data.length);
        SubAnimateCount(data.length); // Passer la valeur cible ici
      });

    const SubAnimateCount = (target) => {
      let count = 0;
      const duration = 700;
      const stepTime = Math.abs(Math.floor(duration / target));

      const interval = setInterval(() => {
        if (count < target) {
          count++;
          setSubscribedCount(count); // Utiliser count ici
        } else {
          clearInterval(interval);
        }
      }, stepTime);
    };
  }, []);

  const [housingCat, setHousingCat] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });
  const chartRef = useRef(null);

  // useEffect(() => {
  //   const fetchHousingCategories = async () => {
  //     try {
  //       const response = await api.get(
  //         "http://localhost:8000/api/create-housing-categories/"
  //       );
  //       const data = response.data;

  //       const labels = data.map((item) => item.category_name); // Utiliser category_name
  //       const values = data.map((item) => 1); // Chaque catégorie compte pour 1
  //       const colors = data.map(
  //         () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
  //       );

  //       setHousingCat({
  //         labels: labels,
  //         datasets: [
  //           {
  //             data: values,
  //             backgroundColor: colors,
  //           },
  //         ],
  //       });
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de la récupération des données des catégories de logements:",
  //         error
  //       );
  //     }
  //   };

  //   fetchHousingCategories();
  // }, []);

  useEffect(() => {
    const fetchHousingCategories = async () => {
      try {
        const response = await api.get(
          "http://localhost:8000/api/get-stat-housing-categories/"
        );
        const data = response.data;

        // Comptage des occurrences des catégories
        const categoryCount = data.reduce((acc, item) => {
          acc[item.category_name] = (acc[item.category_name] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(categoryCount); // Catégories uniques
        const values = Object.values(categoryCount); // Comptage de chaque catégorie
        const colors = labels.map(
          () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        );

        setHousingCat({
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: colors,
            },
          ],
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des catégories de logements:",
          error
        );
      }
    };

    fetchHousingCategories();
  }, []);

  const [ordersStat, setOrdersStat] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });
  const orderChartRefs = useRef(null);

  const [totalOrderCount, setTotalOrderCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    const fetchHousingOrderStats = async () => {
      try {
        const response = await api.get(
          "http://localhost:8000/api/housing-order-stats/"
        );
        const data = response.data;

        // console.log("Données récupérées :", data);

        const labels = Object.keys(data);
        const values = Object.values(data);
        const colors = labels.map(
          () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        );

        const total = values.reduce((acc, count) => acc + count, 0);
        setTotalOrderCount(total);

        animateCount(total);

        setOrdersStat({
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: colors,
            },
          ],
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des statistiques des commandes :",
          error
        );
      }
    };

    const animateCount = (target) => {
      let count = 0;
      const duration = 700;
      const stepTime = Math.abs(Math.floor(duration / target));

      const interval = setInterval(() => {
        if (count < target) {
          count++;
          setAnimatedCount(count);
        } else {
          clearInterval(interval);
        }
      }, stepTime);
    };

    fetchHousingOrderStats();
  }, []);

  const [providerHousingData, setProviderHousingData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nbHousing, setNbHousing] = useState(0);
  const [nbHousingAnimated, setNbHousingAnimated] = useState(0);
  // const orderChartRefs = useRef(null);

  useEffect(() => {
    const fetchMonthlyHousingStats = async () => {
      try {
        const response = await api.get(
          "http://localhost:8000/api/monthly-housing-stats/"
        );
        // console.log("Housing données récupérées :", response.data); // Vérifie les données dans la console
        setProviderHousingData(response.data);

        const total = Object.values(response.data).reduce(
          (acc, count) => acc + count,
          0
        );

        setNbHousing(total);
        animateCount(total);
      } catch (err) {
        setError("Erreur lors de la récupération des statistiques mensuelles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const animateCount = (target) => {
      let count = 0;
      const duration = 700;
      const stepTime = Math.abs(Math.floor(duration / target));

      const interval = setInterval(() => {
        if (count < target) {
          count++;
          setNbHousingAnimated(count);
        } else {
          clearInterval(interval);
        }
      }, stepTime);
    };

    fetchMonthlyHousingStats();
  }, []);

  // Prépare les données pour le graphique
  const chartData = {
    labels: [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ],
    datasets: [
      {
        label: "Logements publiés",
        data: [
          providerHousingData[1] || 0,
          providerHousingData[2] || 0,
          providerHousingData[3] || 0,
          providerHousingData[4] || 0,
          providerHousingData[5] || 0,
          providerHousingData[6] || 0,
          providerHousingData[7] || 0,
          providerHousingData[8] || 0,
          providerHousingData[9] || 0,
          providerHousingData[10] || 0,
          providerHousingData[11] || 0,
          providerHousingData[12] || 0,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Ne conditionne pas l'appel des hooks
  // if (!housingCat.labels.length) {
  //   return <div>Chargement des données...</div>;
  // }

  // const [chartData, setChartData] = useState({
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  //   datasets: [
  //     {
  //       label: "Ventes",
  //       data: [12, 19, 3, 5, 2],
  //       backgroundColor: [
  //         "rgba(75, 192, 192, 0.6)",
  //         "rgba(54, 162, 235, 0.6)",
  //         "rgba(255, 206, 86, 0.6)",
  //         "rgba(255, 99, 132, 0.6)",
  //         "rgba(153, 102, 255, 0.6)",
  //       ],
  //       borderColor: [
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(153, 102, 255, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // });

  const chartRefs = {
    donut: useRef(null),
    pie: useRef(null),
    bar1: useRef(null),
    bar2: useRef(null),
    bar3: useRef(null),
    bar4: useRef(null),
    bar5: useRef(null),
  };

  // Cleanup function to destroy charts on unmount
  // useEffect(() => {
  //   return () => {
  //     Object.values(chartRefs).forEach((chartRef) => {
  //       if (chartRef.current) {
  //         chartRef.current.destroy();
  //       }
  //     });
  //   };
  // }, []);

  return (
    <div>
      <br />
      <br />
      <div className="stat-card-container">
        <div className="stat-card">
          <div className="stat-card-item">
            <div>
              <h2>{nbHousingAnimated}</h2>
            </div>
            <div>
              <img src={Villa} alt="housing" />
            </div>
          </div>
          <p>Logements en tout</p>
        </div>
        <div className="stat-card">
          <div className="stat-card-item">
            <div>
              <h2>{animatedCount}</h2>
            </div>
            <div>
              <img src={Cart} alt="cart" />
            </div>
          </div>
          <p>Commandes en tout</p>
        </div>
        {/* <div className="stat-card">
          <div className="stat-card-item">
            <div>
              <h2>15 000 000 Xof</h2>
            </div>
            <div>
              <img src={Wallet} alt="" />
            </div>
          </div>
          <p>De chiffre d'affaire</p>
        </div> */}
        <div className="stat-card">
          <div className="stat-card-item">
            <div>
              <h2>{subscribedUsersCount}</h2>
            </div>
            <div>
              <img src={Gong} alt="gong" />
            </div>
          </div>
          <p>Abonnés</p>
        </div>
      </div>

      {/* Donut Chart */}

      <br />
      <br />
      <br />

      <div className="statistic-card-first-items">
        <div className="statistic-card">
          <h3>
            Statistique des catégories de logements les plus
            {/* commandés */} publiés sur la plate-forme.
          </h3>
          <Doughnut ref={chartRef} data={housingCat} />
        </div>

        {/* Pie Chart */}
        <div className="statistic-card">
          <h3>Statistique des commandes de l’année</h3>
          <Pie data={ordersStat} />
        </div>
      </div>

      <br />

      {/* 5 Bar Charts */}
      <div className="statistic-card">
        <h3>Statistique des logements publiés dans l’année</h3>
        <Bar ref={orderChartRefs} data={chartData} />{" "}
      </div>

      <br />

      {/* <div className="statistic-card">
        <h3>Statistique des utilisaters inscrit dans l’année</h3>
        <Bar ref={chartRefs.bar2} data={chartData} />
      </div> */}

      {/* <br /> */}

      {/* <div className="statistic-card">
        <h3>Statistique des prestataies inscrit dans l’année</h3>
        <Bar ref={chartRefs.bar3} data={chartData} />
      </div> */}

      {/* <br /> */}

      {/* <div className="statistic-card">
        <h3>Statistique des logements annulés dans l’année</h3>
        <Bar ref={chartRefs.bar4} data={chartData} />
      </div> */}

      {/* <br /> */}

      {/* <div className="statistic-card">
        <h3>Statistique des demandes de logements refusés</h3>
        <Bar ref={chartRefs.bar5} data={chartData} />
      </div> */}

      {/* <br />
      <br /> */}
    </div>
  );
}
