import {sessionAdd, chooseHotel} from './session_actions';
import {hotelsLoad, hotelsAdd} from './hotel_actions';
import {hotelsStatsLoad} from './hotel_stats_actions';
import {roomTypesLoad, roomTypesAdd, roomTypesDrop} from './room_type_actions';
import {ratePlansLoad, ratePlansAdd, ratePlansDrop} from './rate_plan_actions';
import {rateCategoriesLoad, rateCategoriesAdd, rateCategoriesDrop} from './rate_category_actions';
import {channelsLoad, channelsAdd, channelsDrop} from './channel_actions';
import {emailTemplatesLoad, emailTemplatesAdd, emailTemplatesDrop} from './email_template_actions';
import {usersLoad, usersAdd, usersDrop} from './user_actions';
import {whiteLabelPartnersLoad, whiteLabelPartnersAdd, whiteLabelPartnersDrop} from './white_label_partner_actions';
import {whiteLabelDomainsLoad, whiteLabelDomainsAdd, whiteLabelDomainsDrop} from './white_label_domain_actions';
import {
  whiteLabelEmailSettingsLoad,
  whiteLabelEmailSettingsAdd,
  whiteLabelEmailSettingsDrop
} from './white_label_email_settings_actions';
import { tasksLoad } from './tasks_actions';

export default {
  sessionAdd,
  chooseHotel,

  hotelsLoad,
  hotelsStatsLoad,
  hotelsAdd,

  roomTypesLoad,
  roomTypesAdd,
  roomTypesDrop,

  ratePlansLoad,
  ratePlansAdd,
  ratePlansDrop,

  rateCategoriesLoad,
  rateCategoriesAdd,
  rateCategoriesDrop,

  channelsLoad,
  channelsAdd,
  channelsDrop,

  emailTemplatesLoad,
  emailTemplatesAdd,
  emailTemplatesDrop,

  usersLoad,
  usersAdd,
  usersDrop,

  whiteLabelPartnersLoad,
  whiteLabelPartnersAdd,
  whiteLabelPartnersDrop,

  whiteLabelDomainsLoad,
  whiteLabelDomainsAdd,
  whiteLabelDomainsDrop,

  whiteLabelEmailSettingsLoad,
  whiteLabelEmailSettingsAdd,
  whiteLabelEmailSettingsDrop,

  tasksLoad
};
