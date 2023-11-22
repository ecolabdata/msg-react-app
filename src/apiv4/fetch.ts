type ApiResponse<T> = {
  data: T | null;
  status: number;
};

export const fetchData = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: T = await response.json();
    return { data, status: response.status };
  } catch (error) {
    console.error('Error fetching data:', (error as Error)?.message);
    return { data: null, status: 500 };
  }
};
