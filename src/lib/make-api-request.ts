interface Props {
  url: string;
  options?: RequestInit;
}

export async function makeApiRequest({
  url,
  options = {},
}: Props): Promise<Response> {
  let requestOptions: RequestInit = {
    ...options,
  };

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${baseUrl}${url}`, requestOptions);

  if (response.status === 401) {
    // access token has expired, try to refresh it
    const refreshResponse = await fetch(`/api/auth/refresh`, {
      method: "POST"
    });
    if (refreshResponse.ok) {
    //   const { accessToken, refreshToken } = await refreshResponse.json();
      // retry original request with new access token
      const retryResponse = await makeApiRequest({
        url,
        options: {
          ...requestOptions
        },
      });
      return retryResponse;
    }
  }
  return response;
}
