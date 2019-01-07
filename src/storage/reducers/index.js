import { combineReducers } from 'redux';

import sessionReducer from './session_reducer';
import hotelsReducer from './hotels_reducer';
import hotelsStatsReducer from './hotels_stats_reducer';
import roomTypesReducer from './room_types_reducer';
import ratePlansReducer from './rate_plans_reducer';
import rateCategoriesReducer from './rate_plans_reducer';
import channelsReducer from './channels_reducer';
import emailTemplatesReducer from './email_templates_reducer';
import usersReducer from './users_reducer';
import whiteLabelPartnersReducer from './white_label_partners_reducer';
import whiteLabelDomainsReducer from './white_label_domains_reducer';
import whiteLabelEmailSettingsReducer from './white_label_email_settings_reducer';
import tasksReducer from './tasks_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  hotels: hotelsReducer,
  hotelsStats: hotelsStatsReducer,
  roomTypes: roomTypesReducer,
  ratePlans: ratePlansReducer,
  rateCategories: rateCategoriesReducer,
  channels: channelsReducer,
  emailTemplates: emailTemplatesReducer,
  users: usersReducer,
  whiteLabelPartners: whiteLabelPartnersReducer,
  whiteLabelDomains: whiteLabelDomainsReducer,
  whiteLabelEmailSettings: whiteLabelEmailSettingsReducer,
  tasks: tasksReducer
});

export default rootReducer;
