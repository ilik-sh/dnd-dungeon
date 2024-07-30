import React from 'react';

import { MapGrid, useGetUserMapsQuery } from 'entities/map';

type Props = {};

export default function MapsTab({}: Props) {
  const { data } = useGetUserMapsQuery();
  return <MapGrid maps={data}></MapGrid>;
}
