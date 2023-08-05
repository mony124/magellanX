import { useState, useEffect } from "react";
import "./App.css";

const Markets = () => {
  const [markets, setMarkets] = useState([]);
  const [catItems, setCatItems] = useState<any>([]);
  const [profitResult, setProfitResult] = useState<String>("")
  useEffect(() => {
    fetchAllMarkets();
  }, []);

  console.log(catItems)

  const fetchAllMarkets = async () => {
    await fetch("http://localhost:7421/cat-markets")
      .then((response) => response.json())
      .then((data) => setMarkets(data));
  };

  const fetchAllCatItems = async (catItem: String) => {
    await fetch(`http://localhost:7421/cat-market/${catItem}`)
      .then((response) => response.json())
      .then((data) => setCatItems(data));
  };

  const calculateProfit = (breed: any) => {
    const filter = catItems
      .map((item: any) => item.filter((subItem: any) => subItem.breed === breed))
      .flat();

    const profitArray = filter.map((subItem: any) => subItem.sell - subItem.buy);
    const profit = Math.max(...profitArray)
    const profitIndex = profitArray.indexOf(Math.max(...profitArray));
    profit > 0 ? setProfitResult(`Profit for ${breed} Breed will be ${profit} on day ${profitIndex + 1} `) : setProfitResult(`No Profits ${breed} `)

  };

  return (
    <div style={{ width: "100%" }}>
      <header style={{ textAlign: "center" }}>Cat Markets</header>
      <div style={{ display: "flex" }}>
        <div style={{ width: "20%", padding: "1rem" }}>
          {markets.map((catItem) => (
            <div>
              <button
                style={{ padding: "1rem" }}
                onClick={() => fetchAllCatItems(catItem)}
              >
                {catItem}
              </button>
            </div>
          ))}
        </div>
        <div style={{ width: "80%", padding: "1rem" }}>
          {catItems.length > 0 && catItems?.[0]?.map((item: any) => (
            <div>
            <button
              onClick={() => calculateProfit(item.breed)}
              style={{
                padding: "0.5rem",
                border: "1px solid black",
                margin: "0.1rem",
              }}
            >
              Calculate Profit - {item.breed}
            </button>
            </div>
          ))}
            <div>{profitResult.length > 0 ? profitResult : "Profit will be display here"}</div>

          <table>
            <tr>
              <th>Breed</th>
              <th>Buy Price</th>
              <th>Sell Price</th>
            </tr>

            {catItems.map((catItem: any) =>
              catItem.map((item: any) => (
                <tr>
                  <td>{item.breed}</td>
                  <td>{item.buy}</td>
                  <td>{item.sell}</td>
                </tr>
              ))
            )}
          </table>
        </div>{" "}
      </div>
    </div>
  );
};

export default Markets;
