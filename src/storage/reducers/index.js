import { combineReducers } from 'redux';

import sessionReducer from './session_reducer';
import propertiesReducer from './properties_reducer';
import propertiesHealthReducer from './properties_health_reducer';
import roomTypesReducer from './room_types_reducer';
import ratePlansReducer from './rate_plans_reducer';
import rateCategoriesReducer from './rate_categories_reducer';
import channelsReducer from './channels_reducer';
import channelsHealthReducer from './channels_health_reducer';
import channelEventsReducer from './channel_events_reducer';
import emailTemplatesReducer from './email_templates_reducer';
import userReducer from './user_reducer';
import usersReducer from './users_reducer';
import whiteLabelPartnersReducer from './white_label_partners_reducer';
import whiteLabelDomainsReducer from './white_label_domains_reducer';
import whiteLabelEmailSettingsReducer from './white_label_email_settings_reducer';
import tasksReducer from './tasks_reducer';
import taxSetsReducer from './tax_sets_reducer';
import groupsReducer from './groups_reducer';
import bookingsReducer from './bookings_reducer';
import issuesReducer from './issues_reducer';
import hotelPoliciesReducer from './hotel_policies_reducer';
import cancellationPoliciesReducer from './cancellation_policies_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  properties: propertiesReducer,
  propertiesHealth: propertiesHealthReducer,
  roomTypes: roomTypesReducer,
  ratePlans: ratePlansReducer,
  rateCategories: rateCategoriesReducer,
  channels: channelsReducer,
  channelsHealth: channelsHealthReducer,
  channelEvents: channelEventsReducer,
  emailTemplates: emailTemplatesReducer,
  user: userReducer,
  users: usersReducer,
  whiteLabelPartners: whiteLabelPartnersReducer,
  whiteLabelDomains: whiteLabelDomainsReducer,
  whiteLabelEmailSettings: whiteLabelEmailSettingsReducer,
  tasks: tasksReducer,
  taxSets: taxSetsReducer,
  groups: groupsReducer,
  bookings: bookingsReducer,
  issues: issuesReducer,
  hotelPolicies: hotelPoliciesReducer,
  cancellationPolicies: cancellationPoliciesReducer
});

export default rootReducer;
