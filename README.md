# Channex.io Business Logic library (ChannexBL)

This repo contains methods to communicate with Channex.io API, redux-based client side persistent storage and model validation methods.

## Installation

Add into your `package.json` file into `dependencies` section:
```
"channex-bl": "^0.1.0"
```

Be sure, you have access to client_bl repo and your cert is not require passphrase on ssh request.

## Usage

Import library:

```
import ChannexBL from 'channex-bl';
```

Then you can call any methods from library:

```
ChannexBL.Auth
  .signIn(username, password)
  .then(
    success_data => console.log(success_data),
    failure_data => console.log(failure_data)
  );
```

Yoy can import only required elements from ChannexBL library through desctruction import:

```
import { Auth } from 'channex-bl';
```

## Methods and Components

ChannexBL provide for you next components:

- `ChannexBL.storage` initiated Redux storage with loaded data
- `ChannexBL.transport` transport protocol to communicate with server
- `ChannexBL.http` HTTP transport protocol
- `ChannexBL.ws` WebSocket transport protocol based at Phoenix WebSocket library

Methods:

- `ChannexBL.Auth` Authentication methods
- `ChannexBL.Hotels` Hotels CRUD methods
- `ChannexBL.RoomTypes` RoomTypes CRUD methods
- `ChannexBL.RatePlans` RatePlans CRUD methods
- `ChannexBL.Channels` Channels CRUD methods
- `ChannexBL.ARI` Hotel restrictions Query method
- `ChannexBL.CustomRates` CustomRates CRUD methods
- `ChannexBL.CustomMinStayArrivals` CustomMinStayArrivals CRUD methods
- `ChannexBL.CustomMinStayThroughs` CustomMinStayThroughs CRUD methods
- `ChannexBL.CustomMaxStays` CustomMaxStays CRUD methods
- `ChannexBL.CustomClosedToArrivals` CustomClosedToArrivals CRUD methods
- `ChannexBL.CustomClosedToDepartures` CustomClosedToDepartures CRUD methods
- `ChannexBL.CustomStopSells` CustomStopSells CRUD methods
- `ChannexBL.CustomMaxSells` CustomMaxSells CRUD methods
- `ChannexBL.CustomAvailabilityOffsets` CustomAvailabilityOffsets CRUD methods
- `ChannexBL.CustomMaxAvailabilities` CustomMaxAvailabilities CRUD methods
- `ChannexBL.CustomDerivedOptions` CustomDerivedOptions CRUD methods
- `ChannexBL.EmailTemplates` EmailTemplates CRUD methods
- `ChannexBL.Users` Users CRUD methods
- `ChannexBL.WhiteLabelPartners` WhiteLabelPartners CRUD methods
- `ChannexBL.WhiteLabelDomains` WhiteLabelDomains CRUD methods
- `ChannexBL.WhiteLabelEmailSettings` WhiteLabelEmailSettings CRUD methods