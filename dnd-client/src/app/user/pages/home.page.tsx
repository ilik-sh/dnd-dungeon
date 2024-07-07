import React from 'react';

import { Box, styled } from '@mui/material';
import { ModalManager, ModalsProvider } from 'modules/modals-provider';
import { MapView } from 'types/map-view.dto';

import { ModalLookup } from '../constants/modal-lookup';
import Header from '../modules/header';
import MapList from '../modules/map-list';
import Sidebar from '../modules/sidebar';

type Props = {};

const maps: MapView[] = [
  {
    id: 'dsadas',
    name: 'Chilled prison',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/dndhub-fb81c.appspot.com/o/defaults%2FmapThumbnail.png?alt=media&token=0ca8fb5d-1468-4e3c-b0fa-dd004a28ef49',
    createdAt: '2024-03-11',
    creator: {
      id: 'dsaevasqw',
      name: 'Andrew Gheo',
    },
    tags: [],
  },
  {
    id: 'dsaddsaqs',
    name: 'Drowned Courtyard',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/dndhub-fb81c.appspot.com/o/defaults%2FmapThumbnail.png?alt=media&token=0ca8fb5d-1468-4e3c-b0fa-dd004a28ef49',
    createdAt: '2024-03-11',
    creator: {
      id: 'dsaedsqw',
      name: 'Boooba Boob',
    },
    tags: [],
  },
  {
    id: 'dsadsqaerdas',
    name: 'Hollow sanctuary',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/dndhub-fb81c.appspot.com/o/defaults%2FmapThumbnail.png?alt=media&token=0ca8fb5d-1468-4e3c-b0fa-dd004a28ef49',
    createdAt: '2024-03-11',
    creator: {
      id: 'dsavcxzeqw',
      name: 'Iliksh',
    },
    tags: [],
  },
  {
    id: 'dsadsqaerdas',
    name: 'Hollow sanctuary',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/dndhub-fb81c.appspot.com/o/defaults%2FmapThumbnail.png?alt=media&token=0ca8fb5d-1468-4e3c-b0fa-dd004a28ef49',
    createdAt: '2024-03-11',
    creator: {
      id: 'dsavcxzeqw',
      name: 'Iliksh',
    },
    tags: [],
  },
];

const HomeBox = styled(Box)({
  display: 'flex',
});

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 'var(--sidebar-width)',
  width: '100%',
  position: 'relative',
  [theme.breakpoints.down(600)]: {
    marginLeft: '0',
  },
}));

const StyledSidebar = styled(Sidebar)(({ theme }) => ({
  [theme.breakpoints.down(600)]: {
    left: 'calc(-1 * var(--sidebar-width))',
  },
}));

export default function HomePage({}: Props) {
  return (
    <HomeBox>
      <ModalsProvider>
        <ModalManager modalLookup={ModalLookup} />
        <StyledSidebar />
        <ContentBox>
          <Header></Header>
          <MapList maps={[]}></MapList>
        </ContentBox>
      </ModalsProvider>
    </HomeBox>
  );
}
