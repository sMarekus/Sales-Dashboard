const API_URL = "http://localhost:3000/api";

export const fetchStatisticsForPeriod = async (from: string, to: string): Promise<any> => {
    const response = await Promise.all([
      fetch(`${API_URL}/dashboard/total-orders?from=${from}&to=${to}`),
      fetch(`${API_URL}/dashboard/total-revenue?from=${from}&to=${to}`),
      fetch(`${API_URL}/dashboard/total-customers?from=${from}&to=${to}`),
      // fetch(`${API_URL}/dashboard/sales-trends?from=${from}&to=${to}`)
    ]);
    return Promise.all(response.map(res => res.json()));
};
