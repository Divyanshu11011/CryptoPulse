import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LineChart } from "./LineChart";

const CryptoChart = ({ selectedCrypto, timeRange, setLivePriceAvailable, setCurrentPrice }) => {
  const [livePrice, setLivePrice] = useState(null);
  const [chartData, setChartData] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Reset chart data when selectedCrypto changes
    setChartData([]);
    setLivePrice(null);
    setLivePriceAvailable(false); // Reset live price availability

    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(`/api/coingecko/coins/${selectedCrypto}/market_chart`, {
          params: {
            vs_currency: "usd",
            days: timeRange,
          },
        });
        const data = response.data.prices.map((price) => ({
          timestamp: price[0],
          price: price[1],
        }));
        setChartData(data);
        fetchLivePrices(); // Fetch live prices after historical data is available
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    const fetchLivePrices = () => {
      const wsUrl = `wss://ws.coincap.io/prices?assets=${selectedCrypto.toLowerCase()}`;

      const connectWebSocket = () => {
        if (socketRef.current) {
          socketRef.current.onclose = () => {
            console.log("WebSocket closed");
            socketRef.current = null;
            openWebSocket(wsUrl);
          };
          socketRef.current.close();
        } else {
          openWebSocket(wsUrl);
        }
      };

      const openWebSocket = (url) => {
        socketRef.current = new WebSocket(url);

        socketRef.current.onopen = () => {
          console.log("WebSocket connected");
        };

        socketRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data[selectedCrypto.toLowerCase()]) {
            const newPrice = parseFloat(data[selectedCrypto.toLowerCase()]);
            setLivePrice(newPrice);
            updateChartData(newPrice);
            setLivePriceAvailable(true); // Set live price availability to true
            setCurrentPrice(newPrice); // Update current price in the dashboard
          }
        };

        socketRef.current.onerror = (error) => {
          console.error("WebSocket error:", error);
          if (socketRef.current) {
            socketRef.current.close();
          }
        };

        socketRef.current.onclose = () => {
          console.log("WebSocket closed");
          socketRef.current = null;
        };
      };

      connectWebSocket();
    };

    fetchHistoricalData();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [selectedCrypto, timeRange, setLivePriceAvailable, setCurrentPrice]);

  const updateChartData = (newPrice) => {
    setChartData(currentData => [
      ...currentData,
      { timestamp: Date.now(), price: newPrice }
    ]);
  };

  const formatDateOrTime = (timestamp) => {
    const date = new Date(timestamp);
    if (timeRange === "1") {
      return date.toLocaleTimeString();
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="w-full h-full">
      <LineChart
        data={chartData.map(item => ({
          date: formatDateOrTime(item.timestamp),
          price: item.price,
        }))}
        index="date"
        categories={["price"]}
        valueFormatter={(tickValue) => `$${tickValue.toFixed(2)}`}
        yAxisWidth={40}
        startEndOnly={false}
        connectNulls={false}
        showLegend={false}
        showTooltip={true}
        xAxisLabel={timeRange === "1" ? "Time" : "Date"}
        livePrice={livePrice}
      />
    </div>
  );
};

export default CryptoChart;