/**
 * DO NOT EDIT
 */

import React from 'react';

type RestaurantLinkType = {
  restaurantID: string;
  restaurantSlug: string;
};

const RestaurantLink: React.FC<
  JSX.IntrinsicElements['a'] & RestaurantLinkType
> = ({ restaurantSlug, restaurantID, ...props }) => {
  return (
    <a
      href={`https://www.thefork.com/restaurant/${restaurantSlug}-r${restaurantID}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
      {...props}
    />
  );
};

export default RestaurantLink;
