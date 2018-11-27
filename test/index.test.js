/* global test */
import { WebSocket } from 'mock-socket';

window.WebSocket = WebSocket;

import ChannexBL from '../src/index.js';

test('Should be defined and have all required components', () => {
  expect(ChannexBL).not.toBe(null);

  expect(ChannexBL.storage).toBeDefined();
  expect(ChannexBL.settings).toBeDefined();
  expect(ChannexBL.http).toBeDefined();
  expect(ChannexBL.ws).toBeDefined();
  expect(ChannexBL.transport).toBeDefined();
  expect(ChannexBL.Auth).toBeDefined();
  expect(ChannexBL.Hotels).toBeDefined();
  expect(ChannexBL.RoomTypes).toBeDefined();
  expect(ChannexBL.RatePlans).toBeDefined();
  expect(ChannexBL.Channels).toBeDefined();
  expect(ChannexBL.ARI).toBeDefined();
  expect(ChannexBL.CustomRates).toBeDefined();
  expect(ChannexBL.CustomMinStayArrivals).toBeDefined();
  expect(ChannexBL.CustomMinStayThroughs).toBeDefined();
  expect(ChannexBL.CustomMaxStays).toBeDefined();
  expect(ChannexBL.CustomClosedToArrivals).toBeDefined();
  expect(ChannexBL.CustomClosedToDepartures).toBeDefined();
  expect(ChannexBL.CustomStopSells).toBeDefined();
  expect(ChannexBL.CustomMaxSells).toBeDefined();
  expect(ChannexBL.CustomAvailabilityOffsets).toBeDefined();
  expect(ChannexBL.CustomMaxAvailabilities).toBeDefined();
  expect(ChannexBL.CustomDerivedOptions).toBeDefined();
  expect(ChannexBL.EmailTemplates).toBeDefined();
  expect(ChannexBL.Users).toBeDefined();
  expect(ChannexBL.WhiteLabelPartners).toBeDefined();
  expect(ChannexBL.WhiteLabelDomains).toBeDefined();
  expect(ChannexBL.WhiteLabelEmailSettings).toBeDefined();

  ChannexBL.ws.disconnect();
});
