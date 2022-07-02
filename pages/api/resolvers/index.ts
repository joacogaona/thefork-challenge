/**
 * DO NOT EDIT
 */

const headers = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
  'content-type': 'application/json',
  'accept-language': 'en-US',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
};

export const resolvers = {
  Query: {
    getCities: async () => {
      try {
        const response = await fetch(
          'https://www.thefork.com/api/cities?countryId=182',
          {
            headers,
          }
        );
        const responseData = await response.json();

        return responseData.data
          .map((city: any) => {
            return { id: city.id, name: city.name, photo: city.photo };
          })
          .slice(0, 4);
      } catch (error) {
        throw error;
      }
    },
    getRestaurants: async (_: any, args: { cityID: number }) => {
      try {
        const response = await fetch(
          `https://www.thefork.com/api/search/v2/restaurants?query[place][type]=near_city&query[place][value][cityId]=${args.cityID}`,
          {
            headers,
          }
        );
        const responseData = await response.json();

        return responseData.data
          .map((restaurant: any) => {
            return {
              id: restaurant.id,
              slug: restaurant.slug,
              name: restaurant.name,
              photo: restaurant.mainPhotoSrc,
              address: restaurant.address,
              averagePrice: {
                amount: restaurant.priceRange,
                currency: restaurant.currenciesAccepted,
              },
              aggregateRatings:
                restaurant.aggregateRatings.thefork.ratingValue &&
                restaurant.aggregateRatings.thefork.reviewCount
                  ? {
                      ratingValue:
                        restaurant.aggregateRatings.thefork.ratingValue,
                      reviewCount:
                        restaurant.aggregateRatings.thefork.reviewCount,
                    }
                  : null,
              offer: restaurant?.bestOffer?.label?.includes('%')
                ? restaurant.bestOffer.label
                : null,
            };
          })
          .slice(0, 9);
      } catch (error) {
        throw error;
      }
    },
  },
};
