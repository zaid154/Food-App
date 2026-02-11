export const restaurant = async () => {
 const response= await fetch("https://fakerestaurantapi.runasp.net/api/Restaurant");
 console.log(response);
 return response.json();
};
