import axios from "axios"
export const url = import.meta.env.VITE_API_URL
export const urlImg  = import.meta.env.VITE_API_URL.replace("/api", "") + "/images"

export const getProductImage = (image: string | undefined): string => {
  if (!image) return "/placeholder.png";
  if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("//")) {
    return image;
  }
  if (image.startsWith("photo-")) {
    return `https://images.unsplash.com/${image}`;
  }
  return `${urlImg}/${image}`;
};
export function saveToken(token:string)
{
    localStorage.setItem("store_token",token)
}
export const getToken = () =>
    {
        return localStorage.getItem("store_token")
    }

export const axiosRequest = axios.create(
    {
        baseURL:import.meta.env.VITE_API_URL
    })

axiosRequest.interceptors.request.use(
    (config) =>
        {
            const token = getToken()

            if(token)
                {
                    config.headers["Authorization"] = `Bearer ${token}`
                }
                return config
        },
    (error) => Promise.reject(error)
)