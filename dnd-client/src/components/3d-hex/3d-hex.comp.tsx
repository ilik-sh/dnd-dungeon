import { Environment } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect } from 'react';

import { useGetMapQuery } from 'app/configuration/store/map.api';
import { selectMap } from 'app/configuration/store/map.selector';
import { setMap, setSelectedCell } from 'app/configuration/store/map.slice';
import { Vector2 } from 'three';

import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';

import CustomControls from './custom-controls.comp';
import ScreenshotRecorder from './screenshot-recorder.comp';
import { ThreeHexItem } from './three-hex-item.comp';

const mapS = {
  id: null,
  mapProfileId: null,
  mapLayout: [
    [
      {
        id: '8814aad8-fba7-433d-839b-613fab56020b',
        currentRoom: 'eff01145-04cb-4f74-9755-f08f45b23683',
        rooms: ['eff01145-04cb-4f74-9755-f08f45b23683'],
      },
      {
        id: 'af11e7d5-e1b5-49fb-8879-bdbcb0214b70',
        currentRoom: '93581d4c-bec4-4926-bfbe-c5c2950415d3',
        rooms: ['93581d4c-bec4-4926-bfbe-c5c2950415d3'],
      },
      {
        id: 'ba2f968b-fe53-49ee-9599-169935a1813e',
        currentRoom: 'c3f9c0cd-1f41-4e56-8168-def4e1bb40be',
        rooms: ['c3f9c0cd-1f41-4e56-8168-def4e1bb40be'],
      },
      {
        id: '5e8ce977-b496-4584-aa88-7585463dbc13',
        currentRoom: '802ceb80-bafd-43b5-a21a-e1812fded85f',
        rooms: ['802ceb80-bafd-43b5-a21a-e1812fded85f'],
      },
      {
        id: '1a6272d9-4d02-40a2-b096-867bf9441eae',
        currentRoom: 'a02a4366-cb5f-42bd-a051-7a4807555e40',
        rooms: ['a02a4366-cb5f-42bd-a051-7a4807555e40'],
      },
      {
        id: '4b04f6e4-8d8d-4965-b38b-53268c3c7b64',
        currentRoom: '58b01eb7-de7e-4e60-a36b-719ec7a7647b',
        rooms: ['58b01eb7-de7e-4e60-a36b-719ec7a7647b'],
      },
    ],
    [
      {
        id: '579769a4-820b-45a3-983c-2df9bdb6e60f',
        currentRoom: '7a84608e-fd5a-4092-9931-393a70ea6bd1',
        rooms: ['7a84608e-fd5a-4092-9931-393a70ea6bd1'],
      },
      {
        id: '4696604d-d137-4de2-9a62-2ed85be47d26',
        currentRoom: '20c89637-a75d-4b34-9eac-1ec643a3e8bc',
        rooms: ['20c89637-a75d-4b34-9eac-1ec643a3e8bc'],
      },
      {
        id: 'f9e4f015-11ea-47a5-b21d-c7372e12d745',
        currentRoom: '52d2526a-745c-4009-9d24-977b39275d3f',
        rooms: ['52d2526a-745c-4009-9d24-977b39275d3f'],
      },
      {
        id: '86d2205c-1b40-49b0-84fe-322db60a909f',
        currentRoom: 'bf9b7d6d-8884-4cdd-a5cd-38ef282845cf',
        rooms: ['bf9b7d6d-8884-4cdd-a5cd-38ef282845cf'],
      },
      {
        id: '6c1ac662-9e23-43e2-a2bb-ff9752f3a970',
        currentRoom: 'bb4a6302-05bc-4607-95a8-43a3521b9eae',
        rooms: ['bb4a6302-05bc-4607-95a8-43a3521b9eae'],
      },
      {
        id: '86983252-7f5f-4e9f-bf07-e0a563e1c12b',
        currentRoom: '954da21a-fad0-43c6-8a39-8c3c6a331ecb',
        rooms: ['954da21a-fad0-43c6-8a39-8c3c6a331ecb'],
      },
    ],
    [
      {
        id: 'eab4a1ce-2c1f-423f-92c9-b6177daedbb5',
        currentRoom: '4cd520ad-a582-4ac5-aa08-dd6856e8121c',
        rooms: ['4cd520ad-a582-4ac5-aa08-dd6856e8121c'],
      },
      {
        id: '799b2e64-ed0f-45ab-a546-fc340e559d65',
        currentRoom: '6423ca42-5aa9-4747-868b-bae9aebed55c',
        rooms: ['6423ca42-5aa9-4747-868b-bae9aebed55c'],
      },
      {
        id: '343bdd74-94c1-490e-9012-495d52490fb3',
        currentRoom: 'd4a4228f-9f98-4d0e-b675-6c02f5cfc41f',
        rooms: ['d4a4228f-9f98-4d0e-b675-6c02f5cfc41f'],
      },
      {
        id: '73093d68-6c9f-444c-be8c-c82dedbb744b',
        currentRoom: '62e7f856-3c35-4d36-8536-0667dd49fab9',
        rooms: ['62e7f856-3c35-4d36-8536-0667dd49fab9'],
      },
      {
        id: '9dec3a24-f0ed-4914-b68b-0e9f41b1a272',
        currentRoom: '33bfbc06-33ca-49f4-b972-294777cf0819',
        rooms: ['33bfbc06-33ca-49f4-b972-294777cf0819'],
      },
      {
        id: 'baf8e80c-aae4-4c2f-9aed-42b0ab7c2931',
        currentRoom: '4533e340-a158-4f63-8f4e-3139a65e39a7',
        rooms: ['4533e340-a158-4f63-8f4e-3139a65e39a7'],
      },
    ],
    [
      {
        id: '70a7c061-a6c7-4db8-95cf-f7c25dbe261c',
        currentRoom: 'fd0c7803-bc92-49c4-9699-859f1b7d2c53',
        rooms: ['fd0c7803-bc92-49c4-9699-859f1b7d2c53'],
      },
      {
        id: '908b1c9d-ead0-4028-8808-1ea2f86b96fb',
        currentRoom: 'e5def2f7-83dc-43d8-b608-b8b046428fac',
        rooms: ['e5def2f7-83dc-43d8-b608-b8b046428fac'],
      },
      {
        id: 'a5098052-2778-486c-b56e-63dfbe7854d7',
        currentRoom: '000d102a-84e9-48a5-83ca-fc521e04974f',
        rooms: ['000d102a-84e9-48a5-83ca-fc521e04974f'],
      },
      {
        id: 'f4ecd82e-72b3-4ee4-9fe7-9f257c3b80ce',
        currentRoom: '7fa268f6-df27-44c2-a8f8-df9f1065f594',
        rooms: ['7fa268f6-df27-44c2-a8f8-df9f1065f594'],
      },
      {
        id: '6f4120d5-83cf-40e4-b541-07de6fcebf89',
        currentRoom: '8125680d-6695-4086-9a16-2af44a29d602',
        rooms: ['8125680d-6695-4086-9a16-2af44a29d602'],
      },
      {
        id: 'ea02c102-861e-4e1d-8d17-eefdad7c4fca',
        currentRoom: '77fa6ee9-6eda-453f-8a50-94d47340f2fd',
        rooms: ['77fa6ee9-6eda-453f-8a50-94d47340f2fd'],
      },
    ],
    [
      {
        id: 'fbff4569-5ce8-4664-b4b7-9f049a9e00e3',
        currentRoom: 'd49c0885-5cd6-466c-99f0-ac87117a97e5',
        rooms: ['d49c0885-5cd6-466c-99f0-ac87117a97e5'],
      },
      {
        id: 'aa7a9d40-318e-4309-93f5-a97e7621230e',
        currentRoom: '7096bb0c-8230-486d-a1fd-8de852d24c2c',
        rooms: ['7096bb0c-8230-486d-a1fd-8de852d24c2c'],
      },
      {
        id: 'd66789cc-6e1e-4d7b-b5cc-88ee907c1b34',
        currentRoom: 'e05317d5-628d-42f9-a184-10491d06ba4c',
        rooms: ['e05317d5-628d-42f9-a184-10491d06ba4c'],
      },
      {
        id: 'eac91a9a-c283-40e5-b247-281185dd7156',
        currentRoom: '19690e0d-13c0-4bf0-af7b-bc8989c3c616',
        rooms: ['19690e0d-13c0-4bf0-af7b-bc8989c3c616'],
      },
      {
        id: 'fd7d56bd-b339-43a3-ac15-ec8d235c4a8b',
        currentRoom: '075ddf39-d1f7-4a21-8831-3f724007ad85',
        rooms: ['075ddf39-d1f7-4a21-8831-3f724007ad85'],
      },
      {
        id: '54aa35e4-fcec-42e5-bf04-96615b0e7de0',
        currentRoom: '95612246-97f7-485b-b38d-a3bfc4f7cc07',
        rooms: ['95612246-97f7-485b-b38d-a3bfc4f7cc07'],
      },
    ],
    [
      {
        id: 'b483d896-e462-4ebf-aef6-18d2b3a09b29',
        currentRoom: 'a473ea4a-96c2-4da6-ba91-6a6dafedf9b3',
        rooms: ['a473ea4a-96c2-4da6-ba91-6a6dafedf9b3'],
      },
      {
        id: '0ea5dccf-1212-47db-a826-b013881a2734',
        currentRoom: '07045d82-367a-40e0-a9b2-33d909dd2262',
        rooms: ['07045d82-367a-40e0-a9b2-33d909dd2262'],
      },
      {
        id: '0ebb49ba-dc2d-4f17-bbab-248b83152512',
        currentRoom: '4caf58a1-fd7a-4df7-98a1-55b12ec031c4',
        rooms: ['4caf58a1-fd7a-4df7-98a1-55b12ec031c4'],
      },
      {
        id: '1e01fe44-a15c-40f6-8eaf-72b262758cf9',
        currentRoom: 'a8734aa9-9f9b-451d-abc4-02b62b6a0b50',
        rooms: ['a8734aa9-9f9b-451d-abc4-02b62b6a0b50'],
      },
      {
        id: '464faf9a-b810-48ec-8d31-2de3554385dc',
        currentRoom: '7f83591f-836b-422a-a26c-c469fb019880',
        rooms: ['7f83591f-836b-422a-a26c-c469fb019880'],
      },
      {
        id: '99909e27-f21e-4665-a36a-b6b78607797d',
        currentRoom: '32c0cb6b-bbf9-4a59-a77b-c5d5729241bf',
        rooms: ['32c0cb6b-bbf9-4a59-a77b-c5d5729241bf'],
      },
    ],
  ],
  mapInfo: {
    'c3f9c0cd-1f41-4e56-8168-def4e1bb40be': {
      id: 'c3f9c0cd-1f41-4e56-8168-def4e1bb40be',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '7f83591f-836b-422a-a26c-c469fb019880': {
      id: '7f83591f-836b-422a-a26c-c469fb019880',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    'eff01145-04cb-4f74-9755-f08f45b23683': {
      id: 'eff01145-04cb-4f74-9755-f08f45b23683',
      level: 5,
      type: 'QUEST',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: true,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: true,
      },
      description: '',
      visited: false,
    },
    'a02a4366-cb5f-42bd-a051-7a4807555e40': {
      id: 'a02a4366-cb5f-42bd-a051-7a4807555e40',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '7a84608e-fd5a-4092-9931-393a70ea6bd1': {
      id: '7a84608e-fd5a-4092-9931-393a70ea6bd1',
      level: 4,
      type: 'EVIL',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: true,
        TOP: false,
        BOTTOM_RIGHT: true,
      },
      description: '',
      visited: false,
    },
    '52d2526a-745c-4009-9d24-977b39275d3f': {
      id: '52d2526a-745c-4009-9d24-977b39275d3f',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '954da21a-fad0-43c6-8a39-8c3c6a331ecb': {
      id: '954da21a-fad0-43c6-8a39-8c3c6a331ecb',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    'e05317d5-628d-42f9-a184-10491d06ba4c': {
      id: 'e05317d5-628d-42f9-a184-10491d06ba4c',
      level: 5,
      type: 'EVIL',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: true,
        TOP_RIGHT: false,
        TOP_LEFT: true,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    'fd0c7803-bc92-49c4-9699-859f1b7d2c53': {
      id: 'fd0c7803-bc92-49c4-9699-859f1b7d2c53',
      level: 2,
      type: 'EVIL',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: true,
        TOP_RIGHT: true,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '20c89637-a75d-4b34-9eac-1ec643a3e8bc': {
      id: '20c89637-a75d-4b34-9eac-1ec643a3e8bc',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '93581d4c-bec4-4926-bfbe-c5c2950415d3': {
      id: '93581d4c-bec4-4926-bfbe-c5c2950415d3',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    'a8734aa9-9f9b-451d-abc4-02b62b6a0b50': {
      id: 'a8734aa9-9f9b-451d-abc4-02b62b6a0b50',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '77fa6ee9-6eda-453f-8a50-94d47340f2fd': {
      id: '77fa6ee9-6eda-453f-8a50-94d47340f2fd',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '07045d82-367a-40e0-a9b2-33d909dd2262': {
      id: '07045d82-367a-40e0-a9b2-33d909dd2262',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '32c0cb6b-bbf9-4a59-a77b-c5d5729241bf': {
      id: '32c0cb6b-bbf9-4a59-a77b-c5d5729241bf',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '4cd520ad-a582-4ac5-aa08-dd6856e8121c': {
      id: '4cd520ad-a582-4ac5-aa08-dd6856e8121c',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '19690e0d-13c0-4bf0-af7b-bc8989c3c616': {
      id: '19690e0d-13c0-4bf0-af7b-bc8989c3c616',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '000d102a-84e9-48a5-83ca-fc521e04974f': {
      id: '000d102a-84e9-48a5-83ca-fc521e04974f',
      level: 2,
      type: 'EVIL',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: true,
        TOP_RIGHT: true,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    'a473ea4a-96c2-4da6-ba91-6a6dafedf9b3': {
      id: 'a473ea4a-96c2-4da6-ba91-6a6dafedf9b3',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '7096bb0c-8230-486d-a1fd-8de852d24c2c': {
      id: '7096bb0c-8230-486d-a1fd-8de852d24c2c',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    'bb4a6302-05bc-4607-95a8-43a3521b9eae': {
      id: 'bb4a6302-05bc-4607-95a8-43a3521b9eae',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    'bf9b7d6d-8884-4cdd-a5cd-38ef282845cf': {
      id: 'bf9b7d6d-8884-4cdd-a5cd-38ef282845cf',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    'e5def2f7-83dc-43d8-b608-b8b046428fac': {
      id: 'e5def2f7-83dc-43d8-b608-b8b046428fac',
      level: 2,
      type: 'PEACE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: true,
        TOP: false,
        BOTTOM_RIGHT: true,
      },
      description: '',
      visited: false,
    },
    '802ceb80-bafd-43b5-a21a-e1812fded85f': {
      id: '802ceb80-bafd-43b5-a21a-e1812fded85f',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    'd4a4228f-9f98-4d0e-b675-6c02f5cfc41f': {
      id: 'd4a4228f-9f98-4d0e-b675-6c02f5cfc41f',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '7fa268f6-df27-44c2-a8f8-df9f1065f594': {
      id: '7fa268f6-df27-44c2-a8f8-df9f1065f594',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '4caf58a1-fd7a-4df7-98a1-55b12ec031c4': {
      id: '4caf58a1-fd7a-4df7-98a1-55b12ec031c4',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '075ddf39-d1f7-4a21-8831-3f724007ad85': {
      id: '075ddf39-d1f7-4a21-8831-3f724007ad85',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    'd49c0885-5cd6-466c-99f0-ac87117a97e5': {
      id: 'd49c0885-5cd6-466c-99f0-ac87117a97e5',
      level: 3,
      type: 'LOOT',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: true,
        TOP_RIGHT: true,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '62e7f856-3c35-4d36-8536-0667dd49fab9': {
      id: '62e7f856-3c35-4d36-8536-0667dd49fab9',
      level: 4,
      type: 'LOOT',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: true,
        TOP_RIGHT: true,
        TOP_LEFT: true,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '95612246-97f7-485b-b38d-a3bfc4f7cc07': {
      id: '95612246-97f7-485b-b38d-a3bfc4f7cc07',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '58b01eb7-de7e-4e60-a36b-719ec7a7647b': {
      id: '58b01eb7-de7e-4e60-a36b-719ec7a7647b',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '8125680d-6695-4086-9a16-2af44a29d602': {
      id: '8125680d-6695-4086-9a16-2af44a29d602',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '6423ca42-5aa9-4747-868b-bae9aebed55c': {
      id: '6423ca42-5aa9-4747-868b-bae9aebed55c',
      level: 3,
      type: 'PEACE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: true,
        TOP_LEFT: true,
        TOP: false,
        BOTTOM_RIGHT: true,
      },
      description: '',
      visited: false,
    },
    '33bfbc06-33ca-49f4-b972-294777cf0819': {
      id: '33bfbc06-33ca-49f4-b972-294777cf0819',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
    '4533e340-a158-4f63-8f4e-3139a65e39a7': {
      id: '4533e340-a158-4f63-8f4e-3139a65e39a7',
      level: 1,
      type: 'ABSENCE',
      roomDirections: {
        BOTTOM: false,
        BOTTOM_LEFT: false,
        TOP_RIGHT: false,
        TOP_LEFT: false,
        TOP: false,
        BOTTOM_RIGHT: false,
      },
      description: '',
      visited: false,
    },
  },
};

const calculateTilePosition = (tileX: number, tileY: number, size: number) => {
  return new Vector2(
    (tileX * size * 1.01 * 3) / 2,
    tileY * Math.sqrt(3) * size * 1.01 + (((tileX % 2) * Math.sqrt(3)) / 2) * size,
  );
};

export default function ThreeHex() {
  const map = useAppSelector(selectMap());
  const dispatch = useAppDispatch();

  const handleCanvasClick = () => {
    dispatch(setSelectedCell(null));
  };

  useEffect(() => {
    dispatch(setMap({ map: mapS.mapLayout, name: 'dsaewq', rooms: mapS.mapInfo }));
    return () => {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      const urlData = canvas.toDataURL('image/png');
    };
  }, [dispatch]);

  return (
    <Canvas
      style={{ background: '#21212190' }}
      camera={{ position: [4, 15, 14] }}
      onClickCapture={handleCanvasClick}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Environment preset="forest" />
      <ScreenshotRecorder mapId="das231dcdsac" />
      <mesh>
        {map.map((item, column) =>
          item.map((cell, row) => (
            <ThreeHexItem cell={cell} position={calculateTilePosition(column, row, 1)} key={cell.id} />
          )),
        )}
      </mesh>

      <CustomControls />
    </Canvas>
  );
}
