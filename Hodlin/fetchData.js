import axios from "axios";
import connection from "./db.js";

const fetchingData = async () => {
    try {
        const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
        const fetched_data = Object.values(response.data).slice(0, 10);

        for (const data of fetched_data) {
            const { name, last, buy, sell, volume, base_unit } = data;
            
          const lastValue = !isNaN(last) ? parseFloat(last) : 0;
          const buyValue = !isNaN(buy) ? parseFloat(buy) : 0;
          const sellValue = !isNaN(sell) ? parseFloat(sell) : 0;
          const volumeValue = !isNaN(volume) ? parseFloat(volume) : 0;


            const result = await connection.query(
               `INSERT INTO trade (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)`,
               [name, lastValue, buyValue, sellValue, volumeValue, base_unit]
            );
        } 
    } catch (error) {
        console.error("Error fetching or storing data:", error);
    }
}

export default fetchingData